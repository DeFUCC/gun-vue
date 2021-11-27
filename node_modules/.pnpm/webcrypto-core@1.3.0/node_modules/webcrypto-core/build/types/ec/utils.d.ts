import { BufferSource } from "pvtsutils";
interface EcPoint {
    x: BufferSource;
    y: BufferSource;
}
interface EcSignaturePoint {
    r: BufferSource;
    s: BufferSource;
}
export declare class EcUtils {
    /**
     * Decodes ANSI X9.62 encoded point
     * @note Used by SunPKCS11 and SunJSSE
     * @param data ANSI X9.62 encoded point
     * @param pointSize Size of the point in bits
     * @returns Decoded point with x and y coordinates
     */
    static decodePoint(data: BufferSource, pointSize: number): EcPoint;
    /**
     * Encodes EC point to ANSI X9.62 encoded point
     * @param point EC point
     * @param pointSize Size of the point in bits
     * @returns ANSI X9.62 encoded point
     */
    static encodePoint(point: EcPoint, pointSize: number): Uint8Array;
    static getSize(pointSize: number): number;
    static encodeSignature(signature: EcSignaturePoint, pointSize: number): Uint8Array;
    static decodeSignature(data: BufferSource, pointSize: number): EcSignaturePoint;
    static trimStart(data: Uint8Array): Uint8Array;
    static padStart(data: Uint8Array, size: number): Uint8Array;
}
export {};
