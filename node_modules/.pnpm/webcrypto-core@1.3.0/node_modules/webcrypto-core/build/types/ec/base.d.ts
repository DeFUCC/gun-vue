import { CryptoKey } from "../crypto_key";
import { CryptoKeyPair } from "../crypto_key_pair";
import { ProviderCrypto } from "../provider";
export declare abstract class EllipticProvider extends ProviderCrypto {
    abstract namedCurves: string[];
    checkGenerateKeyParams(algorithm: EcKeyGenParams): void;
    checkNamedCurve(namedCurve: string): void;
    abstract onGenerateKey(algorithm: EcKeyGenParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKeyPair>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: EcKeyImportParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
}
