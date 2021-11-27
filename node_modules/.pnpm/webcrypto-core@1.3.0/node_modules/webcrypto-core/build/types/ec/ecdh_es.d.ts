import { EcdhProvider } from "./ecdh";
export declare abstract class EcdhEsProvider extends EcdhProvider {
    readonly name: string;
    namedCurves: string[];
}
