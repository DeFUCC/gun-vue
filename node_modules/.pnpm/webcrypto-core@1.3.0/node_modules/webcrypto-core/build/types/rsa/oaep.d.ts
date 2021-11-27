import { ProviderKeyUsages } from "../types";
import { RsaProvider } from "./base";
export declare abstract class RsaOaepProvider extends RsaProvider {
    readonly name = "RSA-OAEP";
    usages: ProviderKeyUsages;
    checkAlgorithmParams(algorithm: RsaOaepParams): void;
    abstract onEncrypt(algorithm: RsaOaepParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: RsaOaepParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
