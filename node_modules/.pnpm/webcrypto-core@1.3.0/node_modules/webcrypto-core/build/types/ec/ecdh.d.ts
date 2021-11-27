import { CryptoKey } from "../crypto_key";
import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";
export declare abstract class EcdhProvider extends EllipticProvider {
    readonly name: string;
    usages: ProviderKeyUsages;
    namedCurves: string[];
    checkAlgorithmParams(algorithm: EcdhKeyDeriveParams): void;
    abstract onDeriveBits(algorithm: EcdhKeyDeriveParams, baseKey: CryptoKey, length: number, ...args: any[]): Promise<ArrayBuffer>;
}
