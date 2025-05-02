const toBase64url = (buf) =>
  btoa(String.fromCharCode(...buf))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');


export async function createPassKey(name) {
  const displayName = name || `User ${new Date().toISOString().replace('T', ' ').slice(0, 16)}`;

  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: 'Gun-Vue' },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
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
    }
  });
  const id = toBase64url(new Uint8Array(credential.rawId));

  return { id };
}


export async function getPassKey() {

  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      userVerification: 'preferred',
      timeout: 60000
    }
  });
  const id = toBase64url(new Uint8Array(credential.rawId));

  return { id };
}
