import { AlgorithmIdentifier } from "./algorithm_identifier";
export declare class PrivateKeyInfo {
    version: number;
    privateKeyAlgorithm: AlgorithmIdentifier;
    privateKey: ArrayBuffer;
    attributes?: ArrayBuffer;
}
