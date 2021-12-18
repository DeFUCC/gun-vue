/**
 * Working with hashes
 * @module Hash
 */

import { gun, SEA } from "./gun";

/**
 * Calculate a hash for any string data
 * @async
 * @param {String} text
 * @param {String} seed
 * @returns {String} The hex encoded SHA-1 hash
 */
export async function getShortHash(text, seed) {
  return await SEA.work(text, seed, null, { name: "SHA-1", encode: "hex" });
}

export async function hashObj(obj) {
  let text = JSON.stringify(obj);
  let hash = await SEA.work(text, null, null, { name: "SHA-256" });
  return { text, hash };
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
