import { ProviderCrypto } from "../provider";
import { CryptoKey } from "../crypto_key";
export declare abstract class AesProvider extends ProviderCrypto {
    checkGenerateKeyParams(algorithm: AesKeyGenParams): void;
    checkDerivedKeyParams(algorithm: AesKeyGenParams): void;
    abstract onGenerateKey(algorithm: AesKeyGenParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
}
