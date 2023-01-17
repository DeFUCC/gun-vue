/**
 * SEA cryptography abstraction
 * @module useCrypto
 */

// https://github.com/amark/gun/wiki/Snippets

import { ISEAPair } from "gun";
import { SEA } from "../gun";

export function isHash(str: string): boolean {
  return typeof str == 'string' && str.length == 44 && str.charAt(43) == '='
}

/**
 * @typedef {Object} Entity
 * @property {String} pub - the public key
 * @property {String} epub - the elliplic encryption epub
 */

export interface Entity {
  pub: string
  epub: string
}

/**
 * Encrypt data for one receiver entity
 * 1. Generates encryption secret using bob's epub and current user pair
 * 2. Enctypts data with this secret
 * @param {String} data - Stringified data to be encrypted
 * @param {SEAPair} sender - SEA Pair of the sender – `epriv` key will be used to encrypt the data
 * @param {Entity} receiver - An object with `pub` and `epub` strings - the user.is object of the reciever's account
 * @returns {Promise<string>} Encrypted data string to be sent
 */
export async function encFor(data: string, sender: ISEAPair, receiver: Entity): Promise<string> {
  const secret = await SEA.secret(receiver.epub, sender);
  const encryptedData = await SEA.encrypt(data, secret);
  return encryptedData;
}

/**
 * Decrypt a private message from an entity
 * 1. Generates secret using senders `epub` and current user pair
 * 2. Decrypts the data with this secret
 * @param {String} data - Encrypted private data
 * @param {Entity} sender - An object with `pub` and `epub` strings - the user.is object of the sender's account
 * @param {ISEAPair} receiver - SEA Pair of the receiver – `epriv` key will be used to encrypt the data
 * @returns {Promise<string>} Decrypted data
 */
export async function decFrom(data: string, sender: Entity, receiver: ISEAPair): Promise<string> {
  const secret = await SEA.secret(sender.epub, receiver);
  const decryptedData = await SEA.decrypt(data, secret);
  return decryptedData;
}

export async function hashText(text: string): Promise<string> {
  let hash = await SEA.work(text, null, null, { name: "SHA-256" });
  return hash;
}

export async function hashObj(obj: object): Promise<{ hash: string; hashed: string; }> {
  let hashed = typeof obj == "string" ? obj : JSON.stringify(obj);
  let hash = await hashText(hashed);
  return { hash, hashed };
}

/**
 * Calculate a hex hash for any string data
 * @async
 * @param {String} text
 * @param {String} seed
 * @returns {String} The hex encoded SHA-1 hash
 */
export async function getShortHash(text: string, salt: string): Promise<string> {
  return await SEA.work(text, null, null, { name: "PBKDF2", encode: "hex", salt });
}

// Buffer -> Base64 String -> Url Safe Base64 String
export function safeHash(unsafe: string): string {
  if (!unsafe) return;
  const encode_regex = /[+=/]/g;
  return unsafe.replace(encode_regex, encodeChar);
}

function encodeChar(c: string): string {
  switch (c) {
    case "+":
      return "-";
    case "=":
      return ".";
    case "/":
      return "_";
  }
}

// Url Safe Base64 String -> Base64 String -> Buffer
export function unsafeHash(safe: string): string {
  if (!safe) return;
  const decode_regex = /[._-]/g;
  return safe.replace(decode_regex, decodeChar);
}

function decodeChar(c: string): string {
  switch (c) {
    case "-":
      return "+";
    case ".":
      return "=";
    case "_":
      return "/";
  }
}

export function safeJSONParse(input: string | object, def: object): object {
  // Convert null to empty object
  if (!input) {
    return def || {};
  } else if (typeof input == 'object') { //Object.prototype.toString.call(input) === "[object Object]"
    return input;
  }
  try {
    return JSON.parse(input);
  } catch (e) {
    return def || {};
  }
}
