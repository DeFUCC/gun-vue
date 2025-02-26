/**
 * @module Certificates
 * @group Crypto
 */

import { SEA } from "../composables";

/**
 * @typedef {Object} CertOptions
 * @property {Object} [pair] - The SEA pair object with private and public keys.
 * @property {string} [tag="word"] - The tag for the certificate.
 * @property {string} [dot=""] - The dot property for the certificate.
 * @property {string|string[]} [users="*"] - The users for whom the certificate is issued.
 * @property {boolean} [personal=false] - Indicates if the certificate is personal.
 */

/**
 * @typedef {Object} Policy
 * @property {string} * - The wildcard for the policy.
 * @property {string} [.] - The dot property for the policy.
 * @property {string} [+] - The plus property for the policy.
 */

/**
 * Issues a certificate based on the provided options.
 *
 * @param {CertOptions} options - The options for the certificate.
 * @returns {Promise<string>} - The issued certificate.
 */
export async function issueCert({
	pair,
	tag = "word",
	dot = "",
	users = "*",
	personal = false,
	expires = false
}) {
	/** @type {Policy} */
	let policy = { "*": `${tag}` };
	if (dot) {
		policy["."] = dot;
	}
	if (personal) {
		policy["+"] = "*";
	}
	const options = null
	if (expires) {
		options = { expiry: expires }
	}
	try {
		let cert = await SEA.certify(users, policy, pair, null, options);
		return cert;
	} catch (e) {
		console.log("cert error: ", e);
		return "";
	}
}

/**
 * Generates multiple certificates based on the provided options list.
 *
 * @param {Object} params - The parameters for generating certificates.
 * @param {Object} params.pair - The SEA pair object with private and public keys.
 * @param {CertOptions[]} [params.list=[]] - The list of options for each certificate.
 * @returns {Promise<Object.<string, string>>} - An object containing the generated certificates.
 */
export async function generateCerts({ pair, list = [] }) {
	const all = {};
	for (let opt of list) {
		all[opt.tag] = await issueCert({ ...opt, pair });
	}
	return all;
}
