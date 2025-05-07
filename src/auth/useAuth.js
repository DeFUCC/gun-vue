export async function createPassKey(name) {
  if (!name) return;

  const challenge = generateChallenge();
  const challengeBase64url = encodeChallenge(challenge);

  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: "Gun-Vue" },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          name,
          displayName: name,
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          residentKey: "required",
          userVerification: "preferred",
        },
        attestation: "none",
        timeout: 60000,
      },
    });

    if (!verifyChallenge(credential, challengeBase64url)) return false;

    return generatePassKeyIdentifier(credential.rawId);
  } catch (error) {
    console.error("Error creating passkey:", error);
    return false;
  }
}

export async function passKeyLogin() {
  const challenge = generateChallenge();
  const challengeBase64url = encodeChallenge(challenge);

  try {
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge,
        userVerification: "preferred",
        timeout: 60000,
      },
    });

    if (!verifyChallenge(credential, challengeBase64url)) return false;

    return generatePassKeyIdentifier(credential.rawId);
  } catch (error) {
    console.error("Error during passkey login:", error);
    return false;
  }
}

function generateChallenge() {
  return crypto.getRandomValues(new Uint8Array(32));
}

function encodeChallenge(challenge) {
  return btoa(String.fromCharCode(...challenge))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function verifyChallenge(credential, expectedChallenge) {
  const clientDataJSON = JSON.parse(
    new TextDecoder().decode(credential.response.clientDataJSON)
  );

  if (clientDataJSON.challenge !== expectedChallenge) {
    console.error(
      "Wrong challenge received! Check your authentication provider security.",
      clientDataJSON.challenge,
      expectedChallenge
    );
    return false;
  }

  return true;
}

async function generatePassKeyIdentifier(rawId) {
  const hash = await crypto.subtle.digest("SHA-256", rawId);
  const bits = new Uint8Array(hash).slice(0, 20);
  return btoa(String.fromCharCode(...bits));
}
