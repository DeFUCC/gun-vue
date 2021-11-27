/**
 * PEM converter
 */
export declare class PemConverter {
    /**
     * Converts PEM to Array buffer
     * @param pem PEM string
     */
    static toArrayBuffer(pem: string): ArrayBuffer;
    /**
     * Converts PEM to Uint8Array
     * @param pem PEM string
     */
    static toUint8Array(pem: string): Uint8Array;
    /**
     * Converts buffer source to PEM
     * @param buffer Buffer source
     * @param tag PEM tag name
     */
    static fromBufferSource(buffer: BufferSource, tag: string): string;
    /**
     * Returns `true` if incoming data is PEM string, otherwise `false`
     * @param data Data
     */
    static isPEM(data: string): boolean;
    /**
     * Returns tag name from PEM string
     * @param pem PEM string
     */
    static getTagName(pem: string): string;
    /**
     * Returns `true` if tag name from PEM matches to tagName parameter
     * @param pem PEM string
     * @param tagName Tag name for comparison
     */
    static hasTagName(pem: string, tagName: string): boolean;
    static isCertificate(pem: string): boolean;
    static isCertificateRequest(pem: string): boolean;
    static isCRL(pem: string): boolean;
    static isPublicKey(pem: string): boolean;
}
