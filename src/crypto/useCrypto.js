
// https://github.com/amark/gun/wiki/Snippets

import { SEA } from "../gun/composables";

export function isHash(str) {
	return typeof str === "string" && str.length === 44 && str.charAt(43) === "=";
}

export async function encFor(data, sender, receiver) {
	const secret = await SEA.secret(receiver.epub, sender);
	const encryptedData = await SEA.encrypt(data, secret);
	return encryptedData;
}

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
	let hashed = typeof obj === "string" ? obj : JSON.stringify(obj);
	let hash = await hashText(hashed);
	return { hash, hashed };
}

export async function getShortHash(text, salt) {
	return await SEA.work(text, null, null, {
		name: "PBKDF2",
		encode: "hex",
		salt,
	});
}

export function safeHash(unsafe) {
	if (!unsafe) return;
	const encode_regex = /[+=/]/g;
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

export function unsafeHash(safe) {
	if (!safe) return;
	const decode_regex = /[._-]/g;
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


export function safeJSONParse(input, def = {}) {
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
