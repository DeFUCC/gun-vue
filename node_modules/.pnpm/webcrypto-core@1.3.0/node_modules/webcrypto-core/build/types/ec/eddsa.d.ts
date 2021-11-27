import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";
export declare abstract class EdDsaProvider extends EllipticProvider {
    readonly name: string;
    usages: ProviderKeyUsages;
    namedCurves: string[];
    abstract onSign(algorithm: EcdsaParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onVerify(algorithm: EcdsaParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
}
