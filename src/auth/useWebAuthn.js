/* useWebAuthn.js — minimal‑state, offline‑first WebAuthn composable
 * ---------------------------------------------------------------------------
 * SECURITY MODEL (v2)
 * ---------------------------------------------------------------------------
 * 1.  A *resident* (discoverable) credential is created with user‑verification
 *     required.  After success, we take the credential **rawId** (stable, but
 *     only available when the authenticator is unlocked) and derive a symmetric
 *     key:
 *        K = PBKDF2(rawIdBase64, rpId)
 *     via `Gun.SEA.work` (PBKDF2‑SHA‑256, 99 999 rounds, 256‑bit).
 * 2.  The user’s Gun/SEA keypair is AES‑256‑GCM encrypted with **K**.
 * 3.  We *persist* **only**:
 *       – `idHash`  = SHA‑256(rawId)  (acts as lookup key, not reversible)
 *       – `encKeypair` (ciphertext)
 *       – `username`  (for UI)
 *     No rawId, public key, signature, or derivation salt is stored.
 *     Stealing localStorage alone is therefore insufficient to decrypt the
 *     keypair: the attacker would still need the unlocked authenticator to
 *     obtain the rawId.
 * 4.  On login we call `navigator.credentials.get()` *without* an
 *     allowCredentials list (resident‑key flow). The authenticator returns the
 *     chosen credential’s rawId → derive K again → decrypt ciphertext.
 *
 * COMPROMISES / LIMITATIONS --------------------------------------------------
 * • **Resident credentials only** – roaming keys that cannot store resident
 *   keys won’t work in this flow (acceptable per project brief).
 * • We skip signature verification because we don’t store the public key. The
 *   WebAuthn client enforces RP‑ID origin, UV, and UP, which is sufficient for
 *   this secondary login path.
 * ---------------------------------------------------------------------------
 * Public API
 * ---------------------------------------------------------------------------
 *   const { users, storeUser, getUser, deleteUser } = useWebAuthn();
 *
 *   await storeUser('alice', keypair);      // registration
 *   const kp = await getUser('alice');      // unlock / login
 *   deleteUser('alice');                    // remove local record
 * ---------------------------------------------------------------------------
 */

import { ref, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { SEA } from '../composables';


export function useWebAuthn() {
  // idHash ↦ { username, encKeypair }
  const records = useStorage('webauthn-min', {});
  const users = ref(Object.values(records.value).map(r => r.username));

  watchEffect(() => {
    users.value = Object.values(records.value).map(r => r.username);
  });

  /* -------------------------------------------------------------------- */
  /* REGISTRATION                                                         */
  /* -------------------------------------------------------------------- */
  async function storeUser(username, keypair) {
    if (!username || !keypair) throw new Error('Username & keypair required');

    const challenge = randomBytes(32);
    const userId = new TextEncoder().encode(username).slice(0, 64); // <=64B

    const opts = {
      challenge,
      rp: { id: location.hostname, name: document.title || 'PWA' },
      user: { id: userId, name: username, displayName: username },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
      attestation: 'none'
    };

    const cred = await navigator.credentials.create({ publicKey: opts });
    if (!cred) throw new Error('Credential creation cancelled');

    const rawId = new Uint8Array(cred.rawId);
    const rawB64 = bytesToB64(rawId);
    const idHash = await sha256Hex(rawId);

    // Derive encryption key from rawId + RP ID (not stored).
    const encKey = await SEA.work(rawB64, location.hostname);
    const encKeypair = await SEA.encrypt(keypair, encKey);

    records.value[idHash] = { username, encKeypair };
  }

  /* -------------------------------------------------------------------- */
  /* AUTHENTICATION                                                       */
  /* -------------------------------------------------------------------- */
  async function getUser(username) {
    // Find record by username → idHash.
    const entry = Object.entries(records.value)
      .find(([, v]) => v.username === username);
    if (!entry) throw new Error('No stored credential');
    const [idHash, { encKeypair }] = entry;

    const challenge = randomBytes(32);
    const getOpts = { challenge, rpId: location.hostname, userVerification: 'required' };

    const assertion = await navigator.credentials.get({ publicKey: getOpts });
    if (!assertion) throw new Error('Authentication cancelled');

    const rawId = new Uint8Array(assertion.rawId);
    const hash = await sha256Hex(rawId);
    if (hash !== idHash) throw new Error('Credential does not match selected user');

    const encKey = await SEA.work(bytesToB64(rawId), location.hostname);
    const keypair = await SEA.decrypt(encKeypair, encKey);
    if (!keypair) throw new Error('Unable to decrypt – wrong authenticator');
    return keypair;
  }

  /* -------------------------------------------------------------------- */
  /* HOUSE‑KEEPING                                                        */
  /* -------------------------------------------------------------------- */
  function deleteUser(username) {
    for (const [k, v] of Object.entries(records.value)) {
      if (v.username === username) delete records.value[k];
    }
  }

  return { users, storeUser, getUser, deleteUser };
}

/* =========================== Helpers ============================ */
function randomBytes(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }
function bytesToB64(bytes) { return btoa(String.fromCharCode(...bytes)); }
async function sha256Hex(bytes) {
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return Array.from(hash, b => b.toString(16).padStart(2, '0')).join('');
}
