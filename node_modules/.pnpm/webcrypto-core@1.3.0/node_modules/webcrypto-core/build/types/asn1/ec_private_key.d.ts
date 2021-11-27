import { IJsonConvertible } from "@peculiar/json-schema";
export declare class EcPrivateKey implements IJsonConvertible {
    version: number;
    privateKey: ArrayBuffer;
    parameters?: ArrayBuffer;
    publicKey?: ArrayBuffer;
    fromJSON(json: any): this;
    toJSON(): JsonWebKey;
}
