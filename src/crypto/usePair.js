import { ec as EC } from 'elliptic';

const TEXT_ENCODER = new TextEncoder();
const ec_p256 = new EC('p256');

function arrayBufToBase64UrlEncode(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)))
        .replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-');
}

function keyBufferToJwk(type, publicKeyBuffer) {
    if (publicKeyBuffer[0] !== 4) return false;
    return [
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(1, 33)),
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(33, 65))
    ].join('.');
}

async function stretchKey(input, salt, iterations = 300_000) {
    const baseKey = await crypto.subtle.importKey('raw', input, { name: 'PBKDF2' }, false, ['deriveBits']);
    const keyBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, baseKey, 256);
    return new Uint8Array(keyBits);
}

export async function derivePair(pwd) {
    let pwdBytes = pwd ? (typeof pwd === 'string' ? TEXT_ENCODER.encode(pwd.normalize('NFC').trim()) : pwd) : crypto.getRandomValues(new Uint8Array(32));

    const combinedInput = new Uint8Array(pwdBytes.length);
    combinedInput.set(pwdBytes, 0);
    if (combinedInput.length < 16) throw new Error(`Insufficient input entropy (${combinedInput.length})`);

    const version = 'v1';
    const salts = {
        signing: TEXT_ENCODER.encode(`signing-${version}`),
        encryption: TEXT_ENCODER.encode(`encryption-${version}`)
    };

    const [privateKey_s, privateKey_d] = await Promise.all([
        stretchKey(combinedInput, salts.signing),
        stretchKey(combinedInput, salts.encryption)
    ]);

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
