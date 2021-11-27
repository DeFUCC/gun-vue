import { BufferSource } from "pvtsutils";
export declare class EcDsaSignature {
    /**
     * Create EcDsaSignature from X9.62 signature
     * @param value X9.62 signature
     * @returns EcDsaSignature
     */
    static fromWebCryptoSignature(value: BufferSource): EcDsaSignature;
    r: ArrayBuffer;
    s: ArrayBuffer;
    /**
     * Converts ECDSA signature into X9.62 signature format
     * @param pointSize EC point size in bits
     * @returns ECDSA signature in X9.62 signature format
     */
    toWebCryptoSignature(pointSize?: number): ArrayBuffer;
}
