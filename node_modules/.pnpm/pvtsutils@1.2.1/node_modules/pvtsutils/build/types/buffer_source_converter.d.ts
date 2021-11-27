export declare type BufferSource = ArrayBuffer | ArrayBufferView;
export interface ArrayBufferViewConstructor<T extends ArrayBufferView> {
    readonly prototype: T;
    new (length: number): T;
    new (array: ArrayLike<number> | ArrayBufferLike): T;
    new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): T;
}
export declare class BufferSourceConverter {
    static isArrayBuffer(data: any): data is ArrayBuffer;
    static toArrayBuffer(data: BufferSource): ArrayBuffer;
    static toUint8Array(data: BufferSource): Uint8Array;
    /**
     * Converts BufferSource to ArrayBufferView specified view
     * @param data Buffer source
     * @param type Type of ArrayBufferView
     * @returns Specified ArrayBufferView
     */
    static toView<T extends ArrayBufferView>(data: BufferSource, type: ArrayBufferViewConstructor<T>): T;
    static isBufferSource(data: any): data is BufferSource;
    static isArrayBufferView(data: any): data is ArrayBufferView;
    static isEqual(a: BufferSource, b: BufferSource): boolean;
}
