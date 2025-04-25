/* useWebAuthn.js — v4.3  (robust COSE parsing; duplicate code removed)
 * ------------------------------------------------------------------
 *  • Passkey‑first login flow (navigator.credentials.get → rawId lookup)
 *  • Security: PBKDF2‑wrap, HMAC tag, sig + signCount verification
 *  • Minimal CBOR decoder; COSE parser unwraps byte‑string/array and accepts
 *    either Map **or plain object** to avoid “COSE key parse failed”.
 * ------------------------------------------------------------------ */

import { ref, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { SEA } from '../composables';

/* ------------------------------------------------------------------ */
const ITERATIONS = 100_000;
const STORE_KEY = 'webauthn-v3';

const enc = new TextEncoder();
const dec = new TextDecoder();

const b64u = {
  enc: bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  dec: str => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
};

const ctEqual = (a, b) => {
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; ++i) d |= a[i] ^ b[i];
  return d === 0;
};

const concatUint8 = (...arrs) => {
  const len = arrs.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(len);
  let o = 0; for (const a of arrs) { out.set(a, o); o += a.length; }
  return out;
};

async function pbkdf2(rawIdB64, salt) {
  const key = await crypto.subtle.importKey('raw', enc.encode(rawIdB64), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS }, key, 256));
}

async function hmac(keyBytes, dataBytes) {
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, dataBytes));
}

function canonicalRpId(host) {
  if (host === 'localhost' || host.endsWith('.localhost')) return host;
  const p = host.split('.');
  return p.length >= 2 ? p.slice(-2).join('.') : host;
}

export function useWebAuthn({ rpId: rpIdParam } = {}) {
  const RP_ID = rpIdParam || canonicalRpId(location.hostname);

  const records = useStorage(STORE_KEY, {});
  const users = ref([]);
  watchEffect(() => { users.value = Object.values(records.value).map(r => r.username).sort(); });

  /* --------------------------- REGISTRATION ----------------------- */
  async function storeUser(username, keypair) {
    if (!username || !keypair) throw new Error('Username & keypair required');
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userId = enc.encode(username).slice(0, 64);

    const cred = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { id: RP_ID, name: document.title || 'PWA' },
        user: { id: userId, name: username, displayName: username },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -8 }],
        authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
        attestation: 'none'
      }
    });
    if (!cred) throw new Error('Credential creation cancelled');

    const rawId = new Uint8Array(cred.rawId);
    const rawB64 = b64u.enc(rawId);
    const idHash = b64u.enc(new Uint8Array(await crypto.subtle.digest('SHA-256', rawId)));

    const pubKeyBytes = 'getPublicKey' in cred.response
      ? new Uint8Array(cred.response.getPublicKey())
      : extractPublicKeyFromAttestation(new Uint8Array(cred.response.attestationObject));

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const derivedKey = await pbkdf2(rawB64, salt);
    const encKey = await SEA.work(b64u.enc(derivedKey), RP_ID);
    const encKeypair = await SEA.encrypt(keypair, encKey);
    const tag = await hmac(derivedKey, enc.encode(encKeypair));

    records.value[idHash] = {
      v: 4,
      username,
      encKeypair,
      salt: b64u.enc(salt),
      tag: b64u.enc(tag),
      pubKey: b64u.enc(pubKeyBytes),
      signCount: 0
    };
  }

  /* --------------------------- LOGIN ------------------------------ */
  async function login() {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const assertion = await navigator.credentials.get({ publicKey: { challenge, rpId: RP_ID, userVerification: 'required' } });
    if (!assertion) throw new Error('Authentication cancelled');

    const rawId = new Uint8Array(assertion.rawId);
    const idHash = b64u.enc(new Uint8Array(await crypto.subtle.digest('SHA-256', rawId)));
    const rec = records.value[idHash];
    if (!rec) throw new Error('Unknown credential – maybe registered on another device');

    const derivedKey = await pbkdf2(b64u.enc(rawId), b64u.dec(rec.salt));
    const tagCheck = await hmac(derivedKey, enc.encode(rec.encKeypair));
    if (!ctEqual(tagCheck, b64u.dec(rec.tag))) throw new Error('Integrity check failed');

    const { response } = assertion;
    const clientJSON = new Uint8Array(response.clientDataJSON);
    const authData = new Uint8Array(response.authenticatorData);
    const signature = new Uint8Array(response.signature);

    const clientHash = new Uint8Array(await crypto.subtle.digest('SHA-256', clientJSON));
    const dataToVerify = concatUint8(authData, clientHash);
    const publicKey = await importCosePublicKey(b64u.dec(rec.pubKey));
    const ok = await crypto.subtle.verify(publicKey.algorithm, publicKey, signature, dataToVerify);
    if (!ok) throw new Error('Signature mismatch');

    const sc = getSignCount(authData);
    if (sc > rec.signCount) rec.signCount = sc; else if (rec.signCount !== 0) throw new Error('Possible cloned credential');

    const encKey = await SEA.work(b64u.enc(derivedKey), RP_ID);
    const keypair = await SEA.decrypt(rec.encKeypair, encKey);
    if (!keypair) throw new Error('Unable to decrypt – wrong authenticator');

    return { username: rec.username, keypair };
  }

  function deleteUser(username) {
    for (const [k, v] of Object.entries(records.value)) if (v.username === username) delete records.value[k];
  }

  return { users, storeUser, login, deleteUser };
}

/* -------------------------- Helpers ------------------------------ */
function getSignCount(authData) {
  return new DataView(authData.buffer, authData.byteOffset + 33, 4).getUint32(0);
}

/* ---- COSE → CryptoKey parser ----------------------------------- */
async function importCosePublicKey(coseBytes) {
  // 1. First decode once
  let cose = decodeCbor(coseBytes);
  // 2. If still byte‑string, decode again
  if (cose instanceof Uint8Array) cose = decodeCbor(cose);
  // 3. If wrapped in array, pick first Map entry
  if (Array.isArray(cose)) cose = cose.find(v => v instanceof Map) || cose[0];
  // 4. If plain object, convert to Map
  if (!(cose instanceof Map) && typeof cose === 'object') cose = new Map(Object.entries(cose).map(([k, v]) => [isFinite(k) ? Number(k) : k, v]));
  if (!(cose instanceof Map)) throw new Error('COSE key parse failed');

  const kty = cose.get(1);
  if (kty === 2) { // EC2 P‑256
    const x = cose.get(-2), y = cose.get(-3);
    const jwk = { kty: 'EC', crv: 'P-256', x: btoa(String.fromCharCode(...x)), y: btoa(String.fromCharCode(...y)), ext: true };
    return crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  }
  if (kty === 1) { // OKP Ed25519
    const x = cose.get(-2);
    const jwk = { kty: 'OKP', crv: 'Ed25519', x: btoa(String.fromCharCode(...x)), ext: true };
    return crypto.subtle.importKey('jwk', jwk, { name: 'EdDSA', namedCurve: 'Ed25519' }, false, ['verify']);
  }
  throw new Error('Unsupported key type');
}

/* ---- Minimal CBOR decoder (first item only) -------------------- */
function decodeCbor(buf) {
  let pos = 0;
  const readUint8 = () => buf[pos++];
  const read = n => buf.slice(pos, pos += n);

  function readLen(addl) {
    if (addl < 24) return addl;
    if (addl === 24) return readUint8();
    if (addl === 25) return (readUint8() << 8) | readUint8();
    if (addl === 26) return (readUint8() << 24) | (readUint8() << 16) | (readUint8() << 8) | readUint8();
    throw new Error('CBOR length encoding not supported');
  }

  function item() {
    if (pos >= buf.length) throw new Error('CBOR EOF');
    const head = readUint8();
    const maj = head >> 5, addl = head & 0x1f;
    if (maj === 0) return readLen(addl);                  // unsigned int
    if (maj === 1) return -1 - readLen(addl);            // negative int
    if (maj === 2) return read(readLen(addl));           // byte string
    if (maj === 3) return dec.decode(read(readLen(addl))); // text string
    if (maj === 4) { const len = readLen(addl); const a = []; for (let i = 0; i < len; ++i) a.push(item()); return a; }
    if (maj === 5) { const len = readLen(addl); const m = new Map(); for (let i = 0; i < len; ++i) m.set(item(), item()); return m; }
    throw new Error('CBOR major type not supported');
  }

  return item();
}

/* ---- Extract credentialPublicKey from attestationObject -------- */
function extractPublicKeyFromAttestation(att) {
  const attMap = decodeCbor(att);
  const auth = new Uint8Array(attMap.get('authData') || attMap.get(3));
  const FIXED = 37;
  const cred = auth.slice(FIXED);
  const idLen = (cred[16] << 8) | cred[17];
  return cred.slice(18 + idLen);
}
