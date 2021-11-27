export interface EcCurveParams {
    /**
     * The name of the curve
     */
    name: string;
    /**
     * The object identifier of the curve
     */
    id: string;
    /**
     * Curve point size in bits
     */
    size: number;
}
export interface EcCurve extends EcCurveParams {
    raw: ArrayBuffer;
}
export declare class EcCurves {
    protected static items: EcCurve[];
    static readonly names: string[];
    private constructor();
    static register(item: EcCurveParams): void;
    static find(nameOrId: string): EcCurve | null;
    static get(nameOrId: string): EcCurve;
}
