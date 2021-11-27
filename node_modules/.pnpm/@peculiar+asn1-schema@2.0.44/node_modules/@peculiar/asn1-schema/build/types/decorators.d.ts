import { AsnPropTypes, AsnTypeTypes } from "./enums";
import { IAsnConverter, IEmptyConstructor } from "./types";
interface IAsn1TypeOptions {
    type: AsnTypeTypes;
    itemType?: AsnPropTypes | IEmptyConstructor<any>;
}
export declare type AsnRepeatTypeString = "sequence" | "set";
export declare type AsnRepeatType = AsnRepeatTypeString;
interface IAsn1PropOptions {
    type: AsnPropTypes | IEmptyConstructor<any>;
    optional?: boolean;
    defaultValue?: any;
    context?: number;
    implicit?: boolean;
    converter?: IAsnConverter;
    repeated?: AsnRepeatType;
}
export declare const AsnType: (options: IAsn1TypeOptions) => (target: object) => void;
export declare const AsnProp: (options: IAsn1PropOptions) => (target: object, propertyKey: string) => void;
export {};
