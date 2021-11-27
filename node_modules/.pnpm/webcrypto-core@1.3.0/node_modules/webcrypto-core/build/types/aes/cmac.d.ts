import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export interface AesCmacParams extends Algorithm {
    length: number;
}
export declare abstract class AesCmacProvider extends AesProvider {
    readonly name = "AES-CMAC";
    usages: KeyUsages;
    checkAlgorithmParams(algorithm: AesCmacParams): void;
    abstract onSign(algorithm: AesCmacParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onVerify(algorithm: AesCmacParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
}
