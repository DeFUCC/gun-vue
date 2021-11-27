import { CryptoKey } from "../crypto_key";
import { ProviderCrypto } from "../provider";
import { KeyUsages } from "../types";
export declare abstract class HmacProvider extends ProviderCrypto {
    name: string;
    hashAlgorithms: string[];
    usages: KeyUsages;
    /**
     * Returns default size in bits by hash algorithm name
     * @param algName Name of the hash algorithm
     */
    getDefaultLength(algName: string): number;
    checkGenerateKeyParams(algorithm: HmacKeyGenParams): void;
    checkImportParams(algorithm: HmacImportParams): void;
    abstract onGenerateKey(algorithm: HmacKeyGenParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: HmacImportParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
}
