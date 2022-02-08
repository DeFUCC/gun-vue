/**
 * SEA cryptography abstraction
 * @module useCrypto
 */

// https://github.com/amark/gun/wiki/Snippets

import { SEA } from "../gun/";

/**
 * @typedef {Object} Entity
 * @property {String} pub - the public key
 * @property {String} epub - the elliplic encryption epub
 */

/**
 * Encrypt data for one receiver entity
 * 1. Generates encryption secret using bob's epub and current user pair
 * 2. Enctypts data with this secret
 * @param {String} data - Stringified data to be encrypted
 * @param {Entity} sender - An object with `pub` and `epub` strings - the user.is object of the reciever's account
 * @param {SEAPair} receiver - SEA Pair of the sender – `epriv` key will be used to encrypt the data
 * @returns {String} Encrypted data string to be sent
 */
export async function encFor(data, receiver, sender) {
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
 * @param {SEAPair} receiver - SEA Pair of the receiver – `epriv` key will be used to encrypt the data
 * @returns {String} Decrypted data
 */
export async function decFrom(data, sender, receiver) {
  const secret = await SEA.secret(sender.epub, receiver);
  const decryptedData = await SEA.decrypt(data, secret);
  return decryptedData;
}

export async function hashText(text) {
  let hash = await SEA.work(text, null, null, { name: "SHA-256" });
  return hash;
}

export async function hashObj(obj) {
  let hashed = typeof obj == "string" ? obj : JSON.stringify(obj);
  let hash = await hashText(hashed);
  return { hashed, hash };
}

/**
 * Calculate a hex hash for any string data
 * @async
 * @param {String} text
 * @param {String} seed
 * @returns {String} The hex encoded SHA-1 hash
 */
export async function getShortHash(text, seed) {
  return await SEA.work(text, seed, null, { name: "SHA-1", encode: "hex" });
}

// Buffer -> Base64 String -> Url Safe Base64 String
export function safeHash(unsafe) {
  if (!unsafe) return;
  const encode_regex = /[\+=\/]/g;
  return unsafe.replace(encode_regex, encodeChar);
}

function encodeChar(c) {
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
export function unsafeHash(safe) {
  if (!safe) return;
  const decode_regex = /[\._\-]/g;
  return safe.replace(decode_regex, decodeChar);
}

function decodeChar(c) {
  switch (c) {
    case "-":
      return "+";
    case ".":
      return "=";
    case "_":
      return "/";
  }
}

export function safeJSONParse(input, def) {
  // Convert null to empty object
  if (!input) {
    return def || {};
  } else if (Object.prototype.toString.call(input) === "[object Object]") {
    return input;
  }
  try {
    return JSON.parse(input);
  } catch (e) {
    return def || {};
  }
}
