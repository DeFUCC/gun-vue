/**
 * Asymmetric key pair
 * @remark
 * It fixes https://github.com/microsoft/TypeScript/issues/46036
 */
export interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
}
