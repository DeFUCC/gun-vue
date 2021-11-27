import { CryptoKey } from "./crypto_key";
import { CryptoKeyPair } from "./crypto_key_pair";
import { KeyUsages, ProviderKeyUsages } from "./types";
export interface IProviderCheckOptions {
    keyUsage?: boolean;
}
export declare abstract class ProviderCrypto {
    /**
     * Name of the algorithm
     */
    abstract readonly name: string;
    /**
     * Key usages for secret key or key pair
     */
    abstract readonly usages: ProviderKeyUsages;
    digest(algorithm: Algorithm, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    checkDigest(algorithm: Algorithm, data: ArrayBuffer): void;
    onDigest(algorithm: Algorithm, data: ArrayBuffer): Promise<ArrayBuffer>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    generateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKeyPair | CryptoKey>;
    checkGenerateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): void;
    checkGenerateKeyParams(algorithm: Algorithm): void;
    onGenerateKey(algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKeyPair | CryptoKey>;
    sign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    checkSign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): void;
    onSign(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    verify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
    checkVerify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): void;
    onVerify(algorithm: Algorithm, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;
    encrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions, ...args: any[]): Promise<ArrayBuffer>;
    checkEncrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions, ...args: any[]): void;
    onEncrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    decrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions, ...args: any[]): Promise<ArrayBuffer>;
    checkDecrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, options?: IProviderCheckOptions, ...args: any[]): void;
    onDecrypt(algorithm: Algorithm, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
    deriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number, options?: IProviderCheckOptions, ...args: any[]): Promise<ArrayBuffer>;
    checkDeriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number, options?: IProviderCheckOptions, ...args: any[]): void;
    onDeriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number, ...args: any[]): Promise<ArrayBuffer>;
    exportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    checkExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): void;
    onExportKey(format: KeyFormat, key: CryptoKey, ...args: any[]): Promise<JsonWebKey | ArrayBuffer>;
    importKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    checkImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): void;
    onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[], ...args: any[]): Promise<CryptoKey>;
    checkAlgorithmName(algorithm: Algorithm): void;
    checkAlgorithmParams(algorithm: Algorithm): void;
    checkDerivedKeyParams(algorithm: Algorithm): void;
    checkKeyUsages(usages: KeyUsages, allowed: KeyUsages): void;
    checkCryptoKey(key: CryptoKey, keyUsage?: KeyUsage): void;
    checkRequiredProperty(data: object, propName: string): void;
    checkHashAlgorithm(algorithm: Algorithm, hashAlgorithms: string[]): void;
    checkImportParams(algorithm: Algorithm): void;
    checkKeyFormat(format: any): void;
    checkKeyData(format: KeyFormat, keyData: any): void;
    protected prepareData(data: any): ArrayBuffer;
}
