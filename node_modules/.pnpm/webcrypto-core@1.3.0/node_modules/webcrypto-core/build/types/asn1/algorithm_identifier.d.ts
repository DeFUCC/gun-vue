export declare type ParametersType = ArrayBuffer | null;
export declare class AlgorithmIdentifier {
    algorithm: string;
    parameters?: ParametersType;
    constructor(params?: Partial<AlgorithmIdentifier>);
}
