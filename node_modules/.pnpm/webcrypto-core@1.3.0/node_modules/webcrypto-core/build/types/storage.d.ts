import { ProviderCrypto } from "./provider";
export declare class ProviderStorage {
    private items;
    get(algorithmName: string): ProviderCrypto | null;
    set(provider: ProviderCrypto): void;
    removeAt(algorithmName: string): ProviderCrypto | null;
    has(name: string): boolean;
    get length(): number;
    get algorithms(): string[];
}
