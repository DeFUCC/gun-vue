/**
 * ```
 * secp256r1 OBJECT IDENTIFIER ::= {
 *    iso(1) member-body(2) us(840) ansi-X9-62(10045) curves(3)
 *    prime(1) 7 }
 * ```
 */
export declare const idSecp256r1 = "1.2.840.10045.3.1.7";
/**
 * ```
 * ellipticCurve OBJECT IDENTIFIER ::= {
 *    iso(1) identified-organization(3) certicom(132) curve(0) }
 * ```
 */
export declare const idEllipticCurve = "1.3.132.0";
/**
 * ```
 * secp384r1 OBJECT IDENTIFIER ::= { ellipticCurve 34 }
 * ```
 */
export declare const idSecp384r1: string;
/**
 * ```
 * secp521r1 OBJECT IDENTIFIER ::= { ellipticCurve 35 }
 * ```
 */
export declare const idSecp521r1: string;
/**
 * ```
 * secp256k1 OBJECT IDENTIFIER ::= { ellipticCurve 10 }
 * ```
 */
export declare const idSecp256k1: string;
/**
 * ```
 * ecStdCurvesAndGeneration OBJECT IDENTIFIER ::= {
 *   iso(1) identified-organization(3) teletrust(36) algorithm(3)
 *   signature-algorithm(3) ecSign(2) ecStdCurvesAndGeneration(8)
 * }
 * ellipticCurve OBJECT IDENTIFIER ::= { ecStdCurvesAndGeneration 1 }
 * versionOne OBJECT IDENTIFIER ::= { ellipticCurve 1 }
 * ```
 */
export declare const idVersionOne = "1.3.36.3.3.2.8.1.1";
/**
 * ```
 * brainpoolP160r1 OBJECT IDENTIFIER ::= { versionOne 1 }
 * ```
 */
export declare const idBrainpoolP160r1: string;
/**
 * ```
 * brainpoolP160t1 OBJECT IDENTIFIER ::= { versionOne 2 }
 * ```
 */
export declare const idBrainpoolP160t1: string;
/**
 * ```
 * brainpoolP192r1 OBJECT IDENTIFIER ::= { versionOne 3 }
 * ```
 */
export declare const idBrainpoolP192r1: string;
/**
 * ```
 * brainpoolP192t1 OBJECT IDENTIFIER ::= { versionOne 4 }
 * ```
 */
export declare const idBrainpoolP192t1: string;
/**
 * ```
 * brainpoolP224r1 OBJECT IDENTIFIER ::= { versionOne 5 }
 * ```
 */
export declare const idBrainpoolP224r1: string;
/**
 * ```
 * brainpoolP224t1 OBJECT IDENTIFIER ::= { versionOne 6 }
 * ```
 */
export declare const idBrainpoolP224t1: string;
/**
 * ```
 * brainpoolP256r1 OBJECT IDENTIFIER ::= { versionOne 7 }
 * ```
 */
export declare const idBrainpoolP256r1: string;
/**
 * ```
 * brainpoolP256t1 OBJECT IDENTIFIER ::= { versionOne 8 }
 * ```
 */
export declare const idBrainpoolP256t1: string;
/**
 * ```
 * brainpoolP320r1 OBJECT IDENTIFIER ::= { versionOne 9 }
 * ```
 */
export declare const idBrainpoolP320r1: string;
/**
 * ```
 * brainpoolP320t1 OBJECT IDENTIFIER ::= { versionOne 10 }
 * ```
 */
export declare const idBrainpoolP320t1: string;
/**
 * ```
 * brainpoolP384r1 OBJECT IDENTIFIER ::= { versionOne 11 }
 * ```
 */
export declare const idBrainpoolP384r1: string;
/**
 * ```
 * brainpoolP384t1 OBJECT IDENTIFIER ::= { versionOne 12 }
 * ```
 */
export declare const idBrainpoolP384t1: string;
/**
 * ```
 * brainpoolP512r1 OBJECT IDENTIFIER ::= { versionOne 13 }
 * ```
 */
export declare const idBrainpoolP512r1: string;
/**
 * ```
 * brainpoolP512t1 OBJECT IDENTIFIER ::= { versionOne 14 }
 * ```
 */
export declare const idBrainpoolP512t1: string;
/**
 * ```
 * id-X25519 OBJECT IDENTIFIER ::= { 1 3 101 110 }
 * ```
 */
export declare const idX25519 = "1.3.101.110";
/**
 * ```
 * id-X448 OBJECT IDENTIFIER ::= { 1 3 101 111 }
 * ```
 */
export declare const idX448 = "1.3.101.111";
/**
 * ```
 * id-Ed25519 OBJECT IDENTIFIER ::= { 1 3 101 112 }
 * ```
 */
export declare const idEd25519 = "1.3.101.112";
/**
 * ```
 * id-Ed448 OBJECT IDENTIFIER ::= { 1 3 101 113 }
 * ```
 */
export declare const idEd448 = "1.3.101.113";
