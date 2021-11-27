import { CryptoError } from "./crypto";
export declare class UnsupportedOperationError extends CryptoError {
    constructor(methodName?: string);
}
