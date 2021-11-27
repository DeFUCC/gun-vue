import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export declare abstract class AesGcmProvider extends AesProvider {
    readonly name = "AES-GCM";
    usages: KeyUsages;
    checkAlgorithmParams(algorithm: AesGcmParams): void;
    abstract onEncrypt(algorithm: AesGcmParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: AesGcmParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
