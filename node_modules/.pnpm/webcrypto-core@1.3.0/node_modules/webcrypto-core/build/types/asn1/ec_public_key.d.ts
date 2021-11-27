import { IJsonConvertible } from "@peculiar/json-schema";
export declare class EcPublicKey implements IJsonConvertible {
    value: ArrayBuffer;
    constructor(value?: ArrayBuffer);
    toJSON(): {
        x: string;
        y: string;
    };
    fromJSON(json: any): this;
}
