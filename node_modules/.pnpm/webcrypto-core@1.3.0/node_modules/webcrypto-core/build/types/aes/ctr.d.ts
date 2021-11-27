import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export declare abstract class AesCtrProvider extends AesProvider {
    readonly name = "AES-CTR";
    usages: KeyUsages;
    checkAlgorithmParams(algorithm: AesCtrParams): void;
    abstract onEncrypt(algorithm: AesCtrParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: AesCtrParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
