import { ProviderKeyUsages } from "../types";
import { RsaProvider } from "./base";
export declare abstract class RsaPssProvider extends RsaProvider {
    readonly name = "RSA-PSS";
    usages: ProviderKeyUsages;
    checkAlgorithmParams(algorithm: RsaPssParams): void;
    abstract onSign(algorithm: RsaPssParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onVerify(algorithm: RsaPssParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
}
