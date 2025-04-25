import { ec as EC } from 'elliptic';

// --- Utilities ---
const TEXT_ENCODER = new TextEncoder();
const ec_p256 = new EC('p256');

// Base64url encode ArrayBuffer
function arrayBufToBase64UrlEncode(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)))
        .replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-');
}

// Convert EC public key to base64url
function keyBufferToJwk(type, publicKeyBuffer) {
    if (publicKeyBuffer[0] !== 4) return false; // Uncompressed point check
    return [
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(1, 33)), // x
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(33, 65))  // y
    ].join('.');
}

// Normalize input consistently
function normalizeString(str) {
    return str.normalize('NFC').trim();
}

// --- PBKDF2 Key Stretching (Async Utility) ---
async function stretchKey(input, salt, iterations = 300_000) {
    const baseKey = await crypto.subtle.importKey(
        'raw',
        input,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const keyBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt,
            iterations,
            hash: 'SHA-256'
        },
        baseKey,
        256 // Bits, not bytes (256 bits = 32 bytes)
    );
    return new Uint8Array(keyBits);
}

// --- Final: Production-Ready Key Derivation ---
export async function derivePair(pwd, extra) {
    // --- Normalize & Encode Inputs ---
    let pwdBytes = pwd ? (typeof pwd === 'string' ? TEXT_ENCODER.encode(normalizeString(pwd)) : pwd) :
        crypto.getRandomValues(new Uint8Array(32)); // Default to random if no pwd

    const extras = extra ? (Array.isArray(extra) ? extra : [extra]).map(e => normalizeString(e.toString())) : [];
    const extraBuf = TEXT_ENCODER.encode(extras.join('|'));

    // --- Combine Inputs & Enforce Min Entropy ---
    const combinedInput = new Uint8Array(pwdBytes.length + extraBuf.length);
    combinedInput.set(pwdBytes, 0);
    combinedInput.set(extraBuf, pwdBytes.length);
    if (combinedInput.length < 16) throw new Error(`Insufficient input entropy (${combinedInput.length})`);

    // --- Versioned Salts ---
    const version = 'v1';
    const salts = {
        signing: TEXT_ENCODER.encode(`signing-${version}`),
        encryption: TEXT_ENCODER.encode(`encryption-${version}`)
    };

    // --- Derive Keys in Parallel Using Promise.all() ---
    const [privateKey_s, privateKey_d] = await Promise.all([
        stretchKey(combinedInput, salts.signing),
        stretchKey(combinedInput, salts.encryption)
    ]);

    // --- Generate & Validate EC Key Pairs ---
    const generateKeyPair = async (privateKey, type) => {
        const key = ec_p256.keyFromPrivate(privateKey, "hex");
        if (!key.validate().result) throw new Error(`Validation failed for ${type}: ${key.validate().reason}`);
        return {
            pub: keyBufferToJwk(type, new Uint8Array(key.getPublic(false, "array"))),
            priv: arrayBufToBase64UrlEncode(privateKey)
        };
    };

    const [keyA_s, keyA_d] = await Promise.all([
        generateKeyPair(privateKey_s, "ECDSA"),
        generateKeyPair(privateKey_d, "ECDH")
    ]);

    return { ...keyA_s, ...keyA_d, epub: keyA_d.pub, epriv: keyA_d.priv };
}
