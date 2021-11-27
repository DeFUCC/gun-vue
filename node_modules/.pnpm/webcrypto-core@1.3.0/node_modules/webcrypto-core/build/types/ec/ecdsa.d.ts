import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";
export declare abstract class EcdsaProvider extends EllipticProvider {
    readonly name: string;
    readonly hashAlgorithms: string[];
    usages: ProviderKeyUsages;
    namedCurves: string[];
    checkAlgorithmParams(algorithm: EcdsaParams): void;
    abstract onSign(algorithm: EcdsaParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onVerify(algorithm: EcdsaParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
}
