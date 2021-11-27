import { BufferSource } from "./buffer_source_converter";
export declare type BufferEncoding = "utf8" | "binary" | "base64" | "base64url" | "hex" | string;
export declare type TextEncoding = "ascii" | "utf8" | "utf16" | "utf16be" | "utf16le" | "usc2";
export declare class Convert {
    static isHex(data: any): data is string;
    static isBase64(data: any): data is string;
    static isBase64Url(data: any): data is string;
    static ToString(buffer: BufferSource, enc?: BufferEncoding): string;
    static FromString(str: string, enc?: BufferEncoding): ArrayBuffer;
    static ToBase64(buffer: BufferSource): string;
    static FromBase64(base64: string): ArrayBuffer;
    static FromBase64Url(base64url: string): ArrayBuffer;
    static ToBase64Url(data: BufferSource): string;
    protected static DEFAULT_UTF8_ENCODING: TextEncoding;
    static FromUtf8String(text: string, encoding?: TextEncoding): ArrayBuffer;
    static ToUtf8String(buffer: BufferSource, encoding?: TextEncoding): string;
    static FromBinary(text: string): ArrayBuffer;
    static ToBinary(buffer: BufferSource): string;
    /**
     * Converts buffer to HEX string
     * @param  {BufferSource} buffer Incoming buffer
     * @returns string
     */
    static ToHex(buffer: BufferSource): string;
    /**
     * Converts HEX string to buffer
     *
     * @static
     * @param {string} formatted
     * @returns {Uint8Array}
     *
     * @memberOf Convert
     */
    static FromHex(hexString: string): ArrayBuffer;
    /**
     * Converts UTF-16 encoded buffer to UTF-8 string
     * @param buffer UTF-16 encoded buffer
     * @param littleEndian Indicates whether the char code is stored in little- or big-endian format
     * @returns UTF-8 string
     */
    static ToUtf16String(buffer: BufferSource, littleEndian?: boolean): string;
    /**
     * Converts UTF-8 string to UTF-16 encoded buffer
     * @param text UTF-8 string
     * @param littleEndian Indicates whether the char code is stored in little- or big-endian format
     * @returns UTF-16 encoded buffer
     */
    static FromUtf16String(text: string, littleEndian?: boolean): ArrayBuffer;
    protected static Base64Padding(base64: string): string;
    /**
     * Removes odd chars from string data
     * @param data String data
     */
    static formatString(data: string): string;
}
