import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export declare abstract class AesEcbProvider extends AesProvider {
    readonly name = "AES-ECB";
    usages: KeyUsages;
    abstract onEncrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
