import { KeyUsages } from "../types";
import { AesProvider } from "./base";
export declare abstract class AesKwProvider extends AesProvider {
    readonly name = "AES-KW";
    usages: KeyUsages;
}
