import { ProviderKeyUsages } from "../types";
import { RsaProvider } from "./base";
export interface RsaSsaParams extends Algorithm {
}
export declare abstract class RsaSsaProvider extends RsaProvider {
    readonly name = "RSASSA-PKCS1-v1_5";
    usages: ProviderKeyUsages;
    abstract onSign(algorithm: RsaSsaParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onVerify(algorithm: RsaSsaParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
}
