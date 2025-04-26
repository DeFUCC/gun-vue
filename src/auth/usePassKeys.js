// usePassKeys.js

/**
 * Base64url encode a Uint8Array
 */
const toBase64url = (buf) =>
  btoa(String.fromCharCode(...buf))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

/**
 * Generate a random 32-byte challenge
 */
const randomChallenge = () => crypto.getRandomValues(new Uint8Array(32));

/**
 * Create a new passkey (resident credential).
 * Optionally accepts a displayName.
 * Returns { id }
 */
export async function createPassKey(name) {
  const displayName = name || `User ${new Date().toISOString().replace('T', ' ').slice(0, 16)}`;

  const options = {
    challenge: randomChallenge(),
    rp: { name: 'App' },
    user: {
      id: new Uint8Array(1), // minimal placeholder ID
      name: displayName,
      displayName: displayName
    },
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred'
    },
    attestation: 'none',
    timeout: 60000
  };

  const credential = await navigator.credentials.create({ publicKey: options });
  const id = toBase64url(new Uint8Array(credential.rawId));

  return { id };
}

/**
 * Get an existing passkey (resident credential).
 * Returns { id }
 */
export async function getPassKey() {
  const options = {
    challenge: randomChallenge(),
    userVerification: 'preferred',
    timeout: 60000
  };

  const credential = await navigator.credentials.get({ publicKey: options });
  const id = toBase64url(new Uint8Array(credential.rawId));

  return { id };
}
