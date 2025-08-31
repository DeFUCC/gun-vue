import express from "express";
import Gun from "gun";
import qr from "qr";
import ip from "ip";
import 'dotenv/config'
import setSelfAdjustingInterval from 'self-adjusting-interval';
import { Server as SocketIOServer } from 'socket.io';
import SEA from 'gun/sea.js';
import crypto from 'crypto';
import Turn from 'node-turn';

/* global process */

const testPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = express().listen(port, () => {
      server.close(() => resolve(true));
    }).on('error', () => resolve(false));
  });
};

export default {
  initiated: false,
  async init(config = {}) {
    if (this.initiated) return;
    this.initiated = true;

    let {
      host = process.env.RELAY_HOST || ip.address(),
      store = process.env.RELAY_STORE || true,
      port = process.env.RELAY_PORT || 8765,
      path = process.env.RELAY_PATH || "public",
      showQr = process.env.RELAY_QR || true
    } = config;

    console.clear();
    console.log('=== GUN-VUE RELAY SERVER ===\n');

    // Disable Gun UDP multicast by default to avoid port conflict with TURN
    if (typeof process !== 'undefined' && process && process.env) {
      if (!('MULTICAST' in process.env)) process.env.MULTICAST = 'false';
    }

    var app = express();

    // Explicit root route handling
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: path });
    });

    app.use(express.static(path));

    // Build ICE servers from env
    function buildIceServers() {
      const iceServers = [];
      const enableLocalTurn = (process.env.TURN_ENABLE !== 'false' && process.env.STUN_TURN_ENABLE !== 'false');
      const preferLocal = (process.env.PREFER_LOCAL_TURN !== 'false'); // default: true

      // Prepare local embedded entries
      const localEntries = [];
      const turnUsername = process.env.TURN_USERNAME || process.env.TURN_USER || '';
      const turnCredential = process.env.TURN_CREDENTIAL || process.env.TURN_PASS || '';
      const hostForUrls = process.env.TURN_PUBLIC_IP || host;
      const udpPort = Number(process.env.TURN_PORT || process.env.TURN_UDP_PORT || 8765);
      const tcpPort = Number(process.env.TURN_TCP_PORT || 0);
      if (enableLocalTurn) {
        localEntries.push({ urls: [`stun:${hostForUrls}:${udpPort}`] });
        if (turnUsername && turnCredential) {
          const urls = [`turn:${hostForUrls}:${udpPort}?transport=udp`];
          if (tcpPort) urls.push(`turn:${hostForUrls}:${tcpPort}?transport=tcp`);
          localEntries.push({ urls, username: turnUsername, credential: turnCredential });
        }
      }

      // Priority 1: ICE_SERVERS as JSON
      try {
        if (process.env.ICE_SERVERS) {
          const parsed = JSON.parse(process.env.ICE_SERVERS);
          const parsedList = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.iceServers) ? parsed.iceServers : []);
          if (parsedList.length) {
            return preferLocal ? [...localEntries, ...parsedList] : [...parsedList, ...localEntries];
          }
        }
      } catch(e) { /* ignore parse error */ }

      // Priority 2: STUN_URLS and TURN_URLS (comma separated)
      const envEntries = [];
      const stunUrls = (process.env.STUN_URLS || '').split(',').map(s=>s.trim()).filter(Boolean);
      if (stunUrls.length) envEntries.push({ urls: stunUrls });

      const turnUrls = (process.env.TURN_URLS || '').split(',').map(s=>s.trim()).filter(Boolean);
      if (turnUrls.length) {
        const turnEntry = { urls: turnUrls };
        if (turnUsername) turnEntry.username = turnUsername;
        if (turnCredential) turnEntry.credential = turnCredential;
        envEntries.push(turnEntry);
      }

      const merged = preferLocal ? [...localEntries, ...envEntries] : [...envEntries, ...localEntries];
      if (merged.length) return merged;

      // Final fallback: Google STUN
      return [{ urls: ['stun:stun.l.google.com:19302'] }];
    }

    // Expose /ice endpoint for clients to fetch dynamic ICE config
    app.get('/ice', (req, res) => {
      const iceServers = buildIceServers();
      // Provide signaling origins to ease local development
      const localOrigin = `http://localhost:${port}`;
      const currentOrigin = (() => {
        const hostHdr = req.headers.host || `${host}${port ? ':'+port : ''}`;
        const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toString();
        return `${proto}://${hostHdr}`;
      })();
      res.json({ iceServers, signaling: { currentOrigin, localOrigin } });
    });

    let currentPort = parseInt(port);
    while (!(await testPort(currentPort))) {
      console.log(`Port ${currentPort} in use, trying next...`);
      currentPort++;
    }

    var server = app.listen(currentPort);
    port = currentPort; // Update port for later use

    // Initialize GUN peer
    const gun = Gun({
      super: false,
      file: "store",
      radisk: store,
      web: server,
      axe: false,
      multicast: false,
    });

    // Initialize embedded STUN/TURN (UDP on same numeric port by default 3478)
    const enableLocalTurn = (process.env.TURN_ENABLE !== 'false' && process.env.STUN_TURN_ENABLE !== 'false');
    if (enableLocalTurn) {
      const turnUdpPort = Number(process.env.TURN_PORT || process.env.TURN_UDP_PORT || 8765);
      if (turnUdpPort === Number(port)) {
        console.warn('[TURN] WARNING: TURN UDP port equals HTTP/Gun port. Attempting to disable Gun AXE/multicast to avoid UDP bind conflict.');
      }
      const listeningIps = (process.env.TURN_LISTEN_IPS || '').split(',').map(s=>s.trim()).filter(Boolean);
      const realm = process.env.TURN_REALM || host;
      const minPort = Number(process.env.TURN_MIN_PORT || 49160);
      const maxPort = Number(process.env.TURN_MAX_PORT || 49200);
      const username = process.env.TURN_USERNAME || process.env.TURN_USER;
      const password = process.env.TURN_CREDENTIAL || process.env.TURN_PASS;
      const credentials = (username && password) ? { [username]: password } : {};

      try {
        const turnServer = new Turn({
          listeningPort: turnUdpPort,
          listeningIps: listeningIps.length ? listeningIps : ['0.0.0.0'],
          minPort,
          maxPort,
          realm,
          authMech: Object.keys(credentials).length ? 'long-term' : undefined,
          credentials
        });
        turnServer.start();
        console.log(`[TURN] Embedded STUN/TURN started on udp://${host}:${turnUdpPort} (realm: ${realm})`);
        if (Object.keys(credentials).length === 0) {
          console.log('[TURN] No TURN credentials configured; providing STUN only via /ice by default');
        }
      } catch (e) {
        console.warn('[TURN] Failed to start embedded STUN/TURN:', e?.message || e);
      }
    } else {
      console.log('[TURN] Embedded STUN/TURN disabled by env (TURN_ENABLE/STUN_TURN_ENABLE=false)');
    }

    // Initialize Socket.IO for signaling relay
    const io = new SocketIOServer(server, {
      cors: { origin: '*' },
      path: '/socket.io'
    });

    const link = "http://" + host + (port ? ":" + port : "");
    // Make external link protocol configurable; default to http for local/LAN testing
    const extProto = (process.env.RELAY_HTTPS === 'true' || process.env.FORCE_HTTPS === 'true') ? 'https://' : 'http://';
    const extLink = extProto + host + (port ? ":" + port : "");
    let totalConnections = 0;
    let activeWires = 0;

    const db = gun.get('relays').get(host);

    setSelfAdjustingInterval(() => {
      db.get("pulse").put(Date.now());
    }, 500);

    gun.on("hi", () => {
      totalConnections += 1;
      db.get("totalConnections").put(totalConnections);
      activeWires += 1;
      db.get("activeWires").put(activeWires);
      console.log(`Connection opened (active: ${activeWires})`);
    });

    gun.on("bye", () => {
      activeWires -= 1;
      db.get("activeWires").put(activeWires);
      console.log(`Connection closed (active: ${activeWires})`);
    });

    // Basic relay status
    db.get("host").put(host);
    db.get("port").put(port);
    db.get("link").put(link);
    // Fix extLink field name
    db.get("extLink").put(extLink);
    db.get("store").put(store);
    db.get("status").put("running");
    db.get("started").put(Date.now());

    console.log(`Internal URL: ${link}/`);
    console.log(`External URL: ${extLink}/`);
    // Explicitly print a localhost URL to avoid HTTPS upgrade issues on LAN IPs
    console.log(`Localhost URL: http://localhost:${port}/`);
    console.log(`ICE endpoint: http://localhost:${port}/ice`);
    console.log(`Socket.IO path: http://localhost:${port}/socket.io`);
    console.log(`Gun peer: ${link}/gun`);
    console.log(`Storage: ${store ? 'enabled' : 'disabled'}`);

    if (showQr != false) {
      console.log('\n=== QR CODE ===');
      console.log(qr(link, 'ascii', { border: 1 }))
      console.log('===============\n');
    }

    // ==============================
    // Signaling relay with room isolation by publicKey
    // ==============================
    const rooms = new Map(); // roomPubKey => Set(socketId)
    const socketMeta = new Map(); // socketId => { authed:boolean, roomPub?:string }
    const challenges = new Map(); // socketId => { id, text }

    function getOrCreateRoom(roomPub) {
      if (!rooms.has(roomPub)) rooms.set(roomPub, new Set());
      return rooms.get(roomPub);
    }

    io.of('/').on('connection', (socket) => {
      let authed = false;
      let roomPub = null;

      function safeRoom(r){ rooms[r] = rooms[r] || new Set(); return rooms[r]; }

      socket.on('get_challenge', () => {
        const id = crypto.randomUUID();
        const text = `Sign to join room at ${Date.now()}`;
        challenges.set(id, text);
        socket.emit('challenge', { id, text });
      });

      socket.on('auth', ({ roomPub: rp, signature, challengeId }) => {
        const text = challenges.get(challengeId);
        if (!text) return socket.emit('auth_error', { message: 'no challenge' });
        challenges.delete(challengeId);
        SEA.verify(signature, { pub: rp }).then((res) => {
          if (res !== text) return socket.emit('auth_error', { message: 'verify failed' });
          authed = true; roomPub = rp;
          socket.join(roomPub);
          const s = getOrCreateRoom(roomPub); s.add(socket.id);
          const others = Array.from(s).filter(id => id !== socket.id);
          db.get('rooms').get(roomPub).put({ size: s.size, updated: Date.now() });
          console.log('[auth_ok]', socket.id, 'room', roomPub, 'others', others.length);
          socket.emit('auth_ok', { roomPub, peers: s.size, self: socket.id, others });
          socket.to(roomPub).emit('peer-joined', { id: socket.id });
        });
      });

      socket.on('signal', ({ type, data, to }) => {
        if (!authed) return;
        console.log('[signal]', type, 'from', socket.id, 'to', to);
        socket.to(to).emit('signal', { from: socket.id, type, data });
      });

      socket.on('disconnect', () => {
        if (authed && roomPub) {
          const s = rooms.get(roomPub);
          if (s) {
            s.delete(socket.id);
            db.get('rooms').get(roomPub).put({ size: s.size, updated: Date.now() });
            socket.to(roomPub).emit('peer-left', { id: socket.id });
            if (s.size === 0) { rooms.delete(roomPub); }
          }
        }
      });
    });

    return { app, db };
  },
};
