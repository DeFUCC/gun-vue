import { KeyUsages, NativeCryptoKey } from "./types";
export interface KeyAlgorithm extends Algorithm {
}
export declare class CryptoKey implements NativeCryptoKey {
    static create<T extends CryptoKey>(this: new () => T, algorithm: KeyAlgorithm, type: KeyType, extractable: boolean, usages: KeyUsages): T;
    static isKeyType(data: any): data is KeyType;
    algorithm: KeyAlgorithm;
    type: KeyType;
    usages: KeyUsages;
    extractable: boolean;
}
