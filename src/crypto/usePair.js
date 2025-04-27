import { p256 } from '@noble/curves/p256';

const TEXT_ENCODER = new TextEncoder();

export async function derivePair(pwd, extra) {
    const pwdBytes = pwd
        ? (typeof pwd === 'string' ? TEXT_ENCODER.encode(normalizeString(pwd)) : pwd)
        : crypto.getRandomValues(new Uint8Array(32));

    const extras = extra
        ? (Array.isArray(extra) ? extra : [extra]).map(e => normalizeString(e.toString()))
        : [];
    const extraBuf = TEXT_ENCODER.encode(extras.join('|'));

    const combinedInput = new Uint8Array(pwdBytes.length + extraBuf.length);
    combinedInput.set(pwdBytes);
    combinedInput.set(extraBuf, pwdBytes.length);

    if (combinedInput.length < 16) {
        throw new Error(`Insufficient input entropy (${combinedInput.length})`);
    }

    const version = 'v1';
    const salts = [
        { label: 'signing', type: 'pub/priv' },
        { label: 'encryption', type: 'epub/epriv' }
    ];

    const [signingKeys, encryptionKeys] = await Promise.all(salts.map(async ({ label }) => {
        const salt = TEXT_ENCODER.encode(`${label}-${version}`);
        const privateKey = await stretchKey(combinedInput, salt);

        if (!p256.utils.isValidPrivateKey(privateKey)) {
            throw new Error(`Invalid private key for ${label}`);
        }

        const publicKey = p256.getPublicKey(privateKey, false);
        return {
            pub: keyBufferToJwk(publicKey),
            priv: arrayBufToBase64UrlEncode(privateKey)
        };
    }));

    return {
        pub: signingKeys.pub,
        priv: signingKeys.priv,
        epub: encryptionKeys.pub,
        epriv: encryptionKeys.priv
    };
}

function arrayBufToBase64UrlEncode(buf) {
    return btoa(String.fromCharCode(...buf))
        .replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-');
}

function keyBufferToJwk(publicKeyBuffer) {
    if (publicKeyBuffer[0] !== 4) throw new Error('Invalid uncompressed public key format');
    return [
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(1, 33)), // x
        arrayBufToBase64UrlEncode(publicKeyBuffer.slice(33, 65)) // y
    ].join('.');
}

function normalizeString(str) {
    return str.normalize('NFC').trim();
}

async function stretchKey(input, salt, iterations = 300_000) {
    const baseKey = await crypto.subtle.importKey('raw', input, { name: 'PBKDF2' }, false, ['deriveBits']);
    const keyBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, baseKey, 256);
    return new Uint8Array(keyBits);
}
