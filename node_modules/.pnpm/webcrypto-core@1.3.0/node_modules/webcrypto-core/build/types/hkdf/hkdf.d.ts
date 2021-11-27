import { CryptoKey } from "../crypto_key";
import { ProviderCrypto } from "../provider";
import { KeyUsages } from "../types";
export declare abstract class HkdfProvider extends ProviderCrypto {
    name: string;
    hashAlgorithms: string[];
    usages: KeyUsages;
    checkAlgorithmParams(algorithm: HkdfParams): void;
    checkImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): void;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    abstract onDeriveBits(algorithm: HkdfParams, baseKey: CryptoKey, length: number, ...args: any[]): Promise<ArrayBuffer>;
}
