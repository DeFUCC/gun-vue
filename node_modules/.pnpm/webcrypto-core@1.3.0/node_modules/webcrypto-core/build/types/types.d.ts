export declare type NativeCrypto = Crypto;
export declare type NativeSubtleCrypto = SubtleCrypto;
export declare type NativeCryptoKey = CryptoKey;
export declare type HexString = string;
export declare type KeyUsages = KeyUsage[];
export declare type ProviderKeyUsage = KeyUsages;
export interface ProviderKeyPairUsage {
    privateKey: KeyUsages;
    publicKey: KeyUsages;
}
export declare type ProviderKeyUsages = ProviderKeyUsage | ProviderKeyPairUsage;
export interface HashedAlgorithm extends Algorithm {
    hash: AlgorithmIdentifier;
}
export declare type ImportAlgorithms = Algorithm | RsaHashedImportParams | EcKeyImportParams;
/**
 * Base generic class for crypto storages
 */
export interface CryptoStorage<T> {
    /**
     * Returns list of indexes from storage
     */
    keys(): Promise<string[]>;
    /**
     * Returns index of item in storage
     * @param item Crypto item
     * @returns Index of item in storage otherwise null
     */
    indexOf(item: T): Promise<string | null>;
    /**
     * Add crypto item to storage and returns it's index
     */
    setItem(item: T): Promise<string>;
    /**
     * Returns crypto item from storage by index
     * @param index index of crypto item
     * @returns Crypto item
     * @throws Throws Error when cannot find crypto item in storage
     */
    getItem(index: string): Promise<T>;
    /**
     * Returns `true` if item is in storage otherwise `false`
     * @param item Crypto item
     */
    hasItem(item: T): Promise<boolean>;
    /**
     * Removes all items from storage
     */
    clear(): Promise<void>;
    /**
     * Removes crypto item from storage by index
     * @param index Index of crypto storage
     */
    removeItem(index: string): Promise<void>;
}
export interface CryptoKeyStorage extends CryptoStorage<CryptoKey> {
    getItem(index: string): Promise<CryptoKey>;
    getItem(index: string, algorithm: ImportAlgorithms, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
}
export declare type CryptoCertificateFormat = "raw" | "pem";
export declare type CryptoCertificateType = "x509" | "request";
export interface CryptoCertificate {
    type: CryptoCertificateType;
    publicKey: CryptoKey;
}
export interface CryptoX509Certificate extends CryptoCertificate {
    type: "x509";
    notBefore: Date;
    notAfter: Date;
    serialNumber: HexString;
    issuerName: string;
    subjectName: string;
}
export interface CryptoX509CertificateRequest extends CryptoCertificate {
    type: "request";
    subjectName: string;
}
export interface CryptoCertificateStorage extends CryptoStorage<CryptoCertificate> {
    getItem(index: string): Promise<CryptoCertificate>;
    getItem(index: string, algorithm: ImportAlgorithms, keyUsages: KeyUsage[]): Promise<CryptoCertificate>;
    exportCert(format: CryptoCertificateFormat, item: CryptoCertificate): Promise<ArrayBuffer | string>;
    exportCert(format: "raw", item: CryptoCertificate): Promise<ArrayBuffer>;
    exportCert(format: "pem", item: CryptoCertificate): Promise<string>;
    importCert(format: CryptoCertificateFormat, data: BufferSource | string, algorithm: ImportAlgorithms, keyUsages: KeyUsage[]): Promise<CryptoCertificate>;
    importCert(format: "raw", data: BufferSource, algorithm: ImportAlgorithms, keyUsages: KeyUsage[]): Promise<CryptoCertificate>;
    importCert(format: "pem", data: string, algorithm: ImportAlgorithms, keyUsages: KeyUsage[]): Promise<CryptoCertificate>;
}
export interface CryptoStorages {
    keyStorage: CryptoKeyStorage;
    certStorage: CryptoCertificateStorage;
}
