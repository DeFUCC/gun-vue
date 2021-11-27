import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export declare abstract class AesCbcProvider extends AesProvider {
    readonly name = "AES-CBC";
    usages: KeyUsages;
    checkAlgorithmParams(algorithm: AesCbcParams): void;
    abstract onEncrypt(algorithm: AesCbcParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: AesCbcParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
