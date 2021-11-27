import { KeyAlgorithm, CryptoKey } from "../crypto_key";
import { ProviderCrypto } from "../provider";
import { KeyUsages } from "../types";
export interface DesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}
export interface DesParams extends Algorithm {
    iv: BufferSource;
}
export interface DesKeyGenParams extends Algorithm {
    length: number;
}
export interface DesDerivedKeyParams extends Algorithm {
    length: number;
}
export interface DesImportParams extends Algorithm {
}
export declare abstract class DesProvider extends ProviderCrypto {
    usages: KeyUsages;
    abstract keySizeBits: number;
    abstract ivSize: number;
    checkAlgorithmParams(algorithm: AesCbcParams): void;
    checkGenerateKeyParams(algorithm: DesKeyGenParams): void;
    checkDerivedKeyParams(algorithm: DesDerivedKeyParams): void;
    abstract onGenerateKey(algorithm: DesKeyGenParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    abstract onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: DesImportParams, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    abstract onEncrypt(algorithm: DesParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    abstract onDecrypt(algorithm: DesParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
}
