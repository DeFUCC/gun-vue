/**
 * ASN.1
 * ```
 * CurvePrivateKey ::= OCTET STRING
 * ```
 *
 * JSON
 * ```json
 * {
 *   "d": "base64url"
 * }
 * ```
 */
export declare class CurvePrivateKey {
    d: ArrayBuffer;
}
