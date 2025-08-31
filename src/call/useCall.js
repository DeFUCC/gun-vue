import { reactive, nextTick } from 'vue'
import { SEA } from '../gun/useGun'
import { io } from 'socket.io-client'

export function useCall(){
  const state = reactive({
    lang: 'en',
    // keys
    pairText: localStorage.getItem('room_pair') || "",
    pair: null,
    roomPub: "",
    hasPrivate: false,

    // devices
    devices: { audioIn: [], videoIn: [] },
    selectedAudioIn: "",
    selectedVideoIn: "",
    enableMic: true,
    enableCam: true,
    enableE2EE: true,

    // connection
    connected: false,
    socket: null,
    peers: {},
    remoteStreams: {},
    remotePeers: [],
    localStream: null,
    others: [],
    selfId: "",
    log: [],
    iceServers: [],
    signalingOrigin: localStorage.getItem('signaling_origin') || "",
    iceInfo: null,

    e2eeKey: null,
    e2eeSalt: null,

    addLog(m){ state.log.unshift({ t: new Date().toLocaleTimeString(), m }); if(state.log.length>50) state.log.pop(); },

    async generatePair(){
      const pair = await SEA.pair();
      state.pair = pair;
      state.pairText = JSON.stringify(pair, null, 2);
      state.roomPub = pair.pub;
      state.hasPrivate = !!pair.priv;
      localStorage.setItem('room_pair', state.pairText);
    },
    loadPair(){
      try{
        const json = JSON.parse(state.pairText);
        state.pair = json; state.roomPub = json.pub; state.hasPrivate = !!json.priv;
        localStorage.setItem('room_pair', JSON.stringify(json));
      }catch(e){}
    },

    async enumerate(){
      const devices = await navigator.mediaDevices.enumerateDevices();
      state.devices.audioIn = devices.filter(d=>d.kind==='audioinput');
      state.devices.videoIn = devices.filter(d=>d.kind==='videoinput');
      if (!state.selectedAudioIn && state.devices.audioIn[0]) state.selectedAudioIn = state.devices.audioIn[0].deviceId;
      if (!state.selectedVideoIn && state.devices.videoIn[0]) state.selectedVideoIn = state.devices.videoIn[0].deviceId;
    },
    async getLocalStream(){
      const constraints = { audio: state.enableMic ? { deviceId: state.selectedAudioIn ? { exact: state.selectedAudioIn } : undefined } : false,
                            video: state.enableCam ? { deviceId: state.selectedVideoIn ? { exact: state.selectedVideoIn } : undefined } : false };
      state.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      await nextTick();
      // also attach to element if exists
      try {
        const el = document.getElementById('localVideo');
        if (el) { el.srcObject = state.localStream; await el.play?.().catch(()=>{}); }
      } catch(_){}
    },

    async deriveRoomKey(){
      const enc = new TextEncoder();
      const hash = await crypto.subtle.digest('SHA-256', enc.encode(state.roomPub));
      const full = new Uint8Array(hash);
      const salt = full.slice(0, 12);
      const raw = await crypto.subtle.importKey('raw', enc.encode(state.roomPub), 'HKDF', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name:'HKDF', hash:'SHA-256', salt, info: enc.encode('room-e2ee') }, raw, { name:'AES-GCM', length:256 }, false, ['encrypt','decrypt']);
      return { key, salt };
    },
    ivFrom(ts, salt){
      const iv = new Uint8Array(12);
      const view = new DataView(iv.buffer);
      view.setBigUint64(0, BigInt(ts ?? 0));
      iv.set(salt.slice(0, 4), 8);
      return iv;
    },

    saveSignalingOrigin(){
      localStorage.setItem('signaling_origin', state.signalingOrigin || "");
      state.addLog(`Saved signaling origin: ${state.signalingOrigin || '(empty)'}`);
    },
    setSignalingOrigin(url){
      state.signalingOrigin = url || "";
      state.saveSignalingOrigin();
    },
    async fetchIce(){
      try{
        const base = (state.signalingOrigin || '').replace(/\/$/, '');
        if(!base){ state.addLog('No signaling origin set'); return null }
        const res = await fetch(`${base}/ice`);
        const data = await res.json();
        if(Array.isArray(data?.iceServers)) state.iceServers = data.iceServers;
        state.iceInfo = data;
        state.addLog(`Loaded ICE from ${base}`);
        return data;
      }catch(e){
        state.addLog(`ICE fetch failed: ${e?.message || e}`);
        return null;
      }
    },

    async applySenderE2EE(sender, key, salt){
      try{
        if (!state.enableE2EE) return;
        if (sender.createEncodedStreams) {
          const { readable, writable } = sender.createEncodedStreams();
          const transform = new TransformStream({
            async transform(chunk, controller){
              try{ const iv = state.ivFrom(chunk.timestamp, salt); chunk.data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, chunk.data)); }catch(e){}
              controller.enqueue(chunk);
            }
          });
          readable.pipeThrough(transform).pipeTo(writable);
        } else if ('transform' in RTCRtpSender.prototype) {
          sender.transform = new TransformStream({
            async transform(chunk, controller){
              try{ const iv = state.ivFrom(chunk.timestamp, salt); const buf = new Uint8Array(chunk.data); const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, buf); chunk.data = new Uint8Array(ct); }catch(e){}
              controller.enqueue(chunk);
            }
          });
        }
      }catch(e){ state.addLog('Sender E2EE not applied: '+e.message); }
    },

    async applyReceiverE2EE(receiver, key, salt){
      try{
        if (!state.enableE2EE) return;
        if (receiver?.createEncodedStreams) {
          const { readable, writable } = receiver.createEncodedStreams();
          const transform = new TransformStream({
            async transform(chunk, controller){
              try{ const iv = state.ivFrom(chunk.timestamp, salt); const data = new Uint8Array(chunk.data); const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data); chunk.data = new Uint8Array(pt); controller.enqueue(chunk); }catch(e){ controller.enqueue(chunk); }
            }
          });
          readable.pipeThrough(transform).pipeTo(writable);
        } else if (receiver && 'transform' in RTCRtpReceiver.prototype) {
          receiver.transform = new TransformStream({
            async transform(chunk, controller){
              try{ const iv = state.ivFrom(chunk.timestamp, salt); const data = new Uint8Array(chunk.data); const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data); chunk.data = new Uint8Array(pt); }catch(e){}
              controller.enqueue(chunk);
            }
          });
        }
      }catch(e){ state.addLog('Receiver E2EE not applied: '+e.message); }
    },

    newPC(id){
      const cfg = { iceServers: state.iceServers && state.iceServers.length ? state.iceServers : [ { urls: 'stun:stun.l.google.com:19302' } ] };
      const pc = new RTCPeerConnection(cfg);
      state.peers[id] = pc;
      pc.onicecandidate = ev => { if (ev.candidate) { state.addLog(`ICE => candidate to ${id}`); state.socket?.emit('signal', { type:'candidate', data: ev.candidate, to: id }); } };
      pc.oniceconnectionstatechange = ()=> state.addLog(`Peer ${id} ice ${pc.iceConnectionState}`);
      pc.onconnectionstatechange = ()=> state.addLog(`Peer ${id} ${pc.connectionState}`);
      pc.ontrack = async (ev)=>{
        try {
          const receiver = ev.receiver || (ev.transceiver && ev.transceiver.receiver);
          if (receiver && state.e2eeKey && state.e2eeSalt) { await state.applyReceiverE2EE(receiver, state.e2eeKey, state.e2eeSalt); }
        } catch (e) { state.addLog('Receiver E2EE (ontrack) error: '+e.message); }
        const stream = ev.streams?.[0] || new MediaStream([ev.track]);
        state.remoteStreams[id] = stream;
        if (!state.remotePeers.includes(id)) state.remotePeers.push(id);
        await nextTick();
        const elId = `remote-${id}`;
        const el = document.getElementById(elId);
        if (el) { el.srcObject = stream; el.play?.().catch(()=>{}); }
      };
      return pc;
    },

    async start(){
      try{
        state.loadPair();
        if (!state.hasPrivate) { alert('A full key pair is required to join the room.'); return; }

        await state.enumerate();
        await state.getLocalStream();

        // Load ICE configuration
        let origin = (state.signalingOrigin || '').replace(/\/$/, '');
        if (origin) {
          await state.fetchIce();
        } else {
          try {
            const res = await fetch('/ice');
            const data = await res.json();
            if (Array.isArray(data.iceServers)) state.iceServers = data.iceServers;
            origin = (data?.signaling?.localOrigin || data?.signaling?.currentOrigin || window.location.origin);
            state.addLog('ICE loaded: '+JSON.stringify(state.iceServers));
          } catch(e) {
            state.addLog('ICE load failed, using fallback: '+(e?.message||e));
            origin = window.location.origin;
          }
          state.signalingOrigin = origin;
        }

        // Derive E2EE materials
        const { key, salt } = await state.deriveRoomKey();
        state.e2eeKey = key; state.e2eeSalt = salt;

        // Connect signaling
        state.socket = io(origin, { path: '/socket.io' });
        state.socket.on('connect', ()=> state.addLog('Socket connected'));
        state.socket.on('connect_error', (err)=>{ state.addLog('Socket connect_error: '+(err?.message||err)); });
        state.socket.on('error', (err)=>{ state.addLog('Socket error: '+(err?.message||err)); });
        state.socket.on('disconnect', (reason)=> state.addLog('Socket disconnected: '+reason));
        state.socket.on('auth_error', (e)=>{ state.addLog('Auth error: '+(e?.message||'')); alert('Authentication failed'); state.connected=false; });

        state.socket.on('challenge', async ({ id, text })=>{
          const signature = await SEA.sign(text, state.pair);
          state.socket.emit('auth', { roomPub: state.roomPub, signature, challengeId: id });
        });

        state.socket.on('auth_ok', async ({ roomPub, peers, self, others })=>{
          state.addLog(`Authenticated as ${self}, room ${roomPub} peers ${peers}`);
          state.connected = true; state.selfId = self; state.others = others || [];
          for(const pid of state.others){ await state.call(pid, state.e2eeKey, state.e2eeSalt); }
        });

        state.socket.on('peer-joined', async ({ id })=>{
          if (id === state.selfId) return;
          state.addLog(`Peer joined: ${id}`);
          if (!state.others.includes(id)) state.others.push(id);
        });

        state.socket.on('peer-left', ({ id })=>{
          state.addLog(`Peer left: ${id}`);
          try{ state.peers[id]?.close?.(); }catch(_){}
          delete state.peers[id];
          delete state.remoteStreams[id];
          state.remotePeers = state.remotePeers.filter(p=>p!==id);
          state.others = state.others.filter(p=>p!==id);
        });

        state.socket.on('signal', async ({ from, type, data })=>{
          let pc = state.peers[from];
          if (!pc) pc = state.newPC(from);

          if (type === 'offer'){
            await pc.setRemoteDescription(new RTCSessionDescription(data));
            state.localStream.getTracks().forEach(t=> pc.addTrack(t, state.localStream));
            if (state.enableE2EE) {
              for(const sender of pc.getSenders()){
                if (sender.track) await state.applySenderE2EE(sender, state.e2eeKey, state.e2eeSalt);
              }
            }
            const ans = await pc.createAnswer();
            await pc.setLocalDescription(ans);
            state.socket.emit('signal', { type:'answer', data: pc.localDescription, to: from });
          } else if (type === 'answer'){
            await pc.setRemoteDescription(new RTCSessionDescription(data));
          } else if (type === 'candidate'){
            try { await pc.addIceCandidate(data); } catch(e) { state.addLog('addIceCandidate error: '+e.message); }
          }
        });

        // request auth to join room
        state.socket.emit('get_challenge');
        state.addLog('Requested auth challenge');

      }catch(e){
        console.error(e); state.addLog('Start error: '+e.message);
      }
    },

    async call(id, key, salt){
      let pc = state.peers[id];
      if (!pc) pc = state.newPC(id);
      state.localStream.getTracks().forEach(t=> pc.addTrack(t, state.localStream));
      if (state.enableE2EE) {
        for(const sender of pc.getSenders()){
          if (sender.track) await state.applySenderE2EE(sender, key, salt);
        }
      }
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      state.socket.emit('signal', { type:'offer', data: pc.localDescription, to: id });
    },

    stop(){
      try{
        Object.values(state.peers).forEach(pc=>{ try{ pc.close(); }catch(e){} });
        state.peers = {};
        state.remoteStreams = {};
        state.remotePeers = [];
        if (state.localStream){ state.localStream.getTracks().forEach(t=> t.stop()); }
        state.localStream = null;
        try { const lv = document.getElementById('localVideo'); if (lv) lv.srcObject = null; } catch(_){ }
        if (state.socket){ try{ state.socket.disconnect(); }catch(e){} }
        state.connected = false; state.selfId = ""; state.others = [];
        state.addLog('Stopped');
      }catch(e){ state.addLog('Stop error: '+e.message); }
    }
  })

  return state
}