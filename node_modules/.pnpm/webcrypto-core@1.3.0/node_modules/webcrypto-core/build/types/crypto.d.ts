import { SubtleCrypto } from "./subtle";
export declare abstract class Crypto {
    /**
     * Returns a SubtleCrypto object providing access to common cryptographic primitives,
     * like hashing, signing, encryption or decryption
     */
    abstract readonly subtle: SubtleCrypto;
    /**
     * Generates cryptographically random values
     * @param array Is an integer-based BufferSource.
     * All elements in the array are going to be overridden with random numbers.
     */
    abstract getRandomValues<T extends ArrayBufferView | null>(array: T): T;
}
