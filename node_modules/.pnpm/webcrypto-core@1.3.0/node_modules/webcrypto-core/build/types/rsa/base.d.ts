import { CryptoKey } from "../crypto_key";
import { CryptoKeyPair } from "../crypto_key_pair";
import { ProviderCrypto } from "../provider";
export declare abstract class RsaProvider extends ProviderCrypto {
    hashAlgorithms: string[];
    checkGenerateKeyParams(algorithm: RsaHashedKeyGenParams): void;
    checkImportParams(algorithm: RsaHashedImportParams): void;
    abstract onGenerateKey(algorithm: RsaHashedKeyGenParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKeyPair>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: RsaHashedImportParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
}
