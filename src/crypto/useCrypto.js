/**
 * SEA cryptography abstraction
 * @module Crypto
 * @group Crypto
 */

// https://github.com/amark/gun/wiki/Snippets

import { SEA } from "../gun/composables";

/**
 * Checks if a given string is a valid hash.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns true if the string is a valid hash, otherwise false.
 */
export function isHash(str) {
	return typeof str === "string" && str.length === 44 && str.charAt(43) === "=";
}

/**
 * @typedef {Object} Entity
 * @property {string} pub - The public key.
 * @property {string} epub - The elliptic encryption epub.
 */

/**
 * Encrypts data for one receiver entity.
 * 1. Generates encryption secret using receiver's epub and sender's pair.
 * 2. Encrypts data with this secret.
 *
 * @param {string} data - Stringified data to be encrypted.
 * @param {Object} sender - SEA Pair of the sender – `epriv` key will be used to encrypt the data.
 * @param {Entity} receiver - An object with `pub` and `epub` strings - the user.is object of the receiver's account.
 * @returns {Promise<string>} - Encrypted data string to be sent.
 */
export async function encFor(data, sender, receiver) {
	const secret = await SEA.secret(receiver.epub, sender);
	const encryptedData = await SEA.encrypt(data, secret);
	return encryptedData;
}

/**
 * Decrypts a private message from an entity.
 * 1. Generates secret using sender's `epub` and receiver's pair.
 * 2. Decrypts the data with this secret.
 *
 * @param {string} data - Encrypted private data.
 * @param {Entity} sender - An object with `pub` and `epub` strings - the user.is object of the sender's account.
 * @param {Object} receiver - SEA Pair of the receiver – `epriv` key will be used to decrypt the data.
 * @returns {Promise<string>} - Decrypted data.
 */
export async function decFrom(data, sender, receiver) {
	const secret = await SEA.secret(sender.epub, receiver);
	const decryptedData = await SEA.decrypt(data, secret);
	return decryptedData;
}

/**
 * Generates a SHA-256 hash for the given text.
 *
 * @param {string} text - The text to hash.
 * @returns {Promise<string>} - The generated hash.
 */
export async function hashText(text) {
	let hash = await SEA.work(text, null, null, { name: "SHA-256" });
	return hash;
}

/**
 * Generates a SHA-256 hash for the given object.
 *
 * @param {object} obj - The object to hash.
 * @returns {Promise<{hash: string, hashed: string}>} - The generated hash and stringified object.
 */
export async function hashObj(obj) {
	let hashed = typeof obj === "string" ? obj : JSON.stringify(obj);
	let hash = await hashText(hashed);
	return { hash, hashed };
}

/**
 * Calculates a hex hash for any string data.
 *
 * @param {string} text - The text to hash.
 * @param {string} salt - The salt to use in the hash.
 * @returns {Promise<string>} - The hex encoded SHA-1 hash.
 */
export async function getShortHash(text, salt) {
	return await SEA.work(text, null, null, {
		name: "PBKDF2",
		encode: "hex",
		salt,
	});
}

/**
 * Converts an unsafe base64 string to a URL-safe base64 string.
 *
 * @param {string} unsafe - The unsafe base64 string.
 * @returns {string} - The URL-safe base64 string.
 */
export function safeHash(unsafe) {
	if (!unsafe) return;
	const encode_regex = /[+=/]/g;
	return unsafe.replace(encode_regex, encodeChar);
}

/**
 * Encodes a character for URL-safe base64.
 *
 * @param {string} c - The character to encode.
 * @returns {string} - The encoded character.
 */
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

/**
 * Converts a URL-safe base64 string to an unsafe base64 string.
 *
 * @param {string} safe - The URL-safe base64 string.
 * @returns {string} - The unsafe base64 string.
 */
export function unsafeHash(safe) {
	if (!safe) return;
	const decode_regex = /[._-]/g;
	return safe.replace(decode_regex, decodeChar);
}

/**
 * Decodes a URL-safe base64 character.
 *
 * @param {string} c - The character to decode.
 * @returns {string} - The decoded character.
 */
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

/**
 * Safely parses a JSON string, returning a default object if parsing fails.
 *
 * @param {string|object} input - The JSON string or object to parse.
 * @param {object} [def={}] - The default object to return if parsing fails.
 * @returns {object} - The parsed object or the default object.
 */
export function safeJSONParse(input, def = {}) {
	// Convert null to empty object
	if (!input) {
		return def;
	} else if (typeof input === "object") {
		return input;
	}
	try {
		return JSON.parse(input);
	} catch (e) {
		return def;
	}
}
