import { CryptoError } from "./crypto";
export declare class RequiredPropertyError extends CryptoError {
    constructor(propName: string);
}
