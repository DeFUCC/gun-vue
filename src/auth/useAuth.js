/**
 * Manage user's password and credentials
 * @module Auth
 * @group Users
 */

import { computed, reactive, watchEffect } from "vue";
import { useGun, SEA, auth, isPair, user } from "../composables";

/**
 * @typedef {Object} Safe
 * @property {boolean} saved - Whether data is saved
 * @property {string} password - Stored password
 * @property {string} enc - Encrypted data
 * @property {string} pass - Stored pass
 * @property {Object} rooms - Room information
 */

/**
 * @typedef {Object} Auth
 * @property {string} input - User input for password
 * @property {boolean} show - Whether to show password
 * @property {boolean} safePair - Indicates if the pair is safe
 * @property {number} minLength - Minimum length for password
 * @property {Safe} safe - Safe storage object
 * @property {Object} dec - Decrypted data object
 * @property {string} [dec.pass] - Decrypted password
 * @property {Object} [dec.pair] - Decrypted key pair
 * @property {Object} links - Link generation object
 * @property {string} links.pass - Generated pass link
 * @property {string} links.pair - Generated pair link
 * @property {function(): void} set - Function to set password
 */

/**
 * @type {Auth}
 */
export const pass = reactive({
	input: "",
	show: false,
	safePair: false,
	minLength: 5,
	safe: {
		saved: false,
		password: "",
		enc: "",
		pass: "",
	},
	dec: {},
	links: reactive({
		pass: computed(() => {
			return genLink(pass.safe?.enc);
		}),
		pair: computed(() => {
			return genLink(JSON.stringify(user.pair()));
		}),
	}),
	set() {
		setPass(pass.input);
		pass.input = "";
		pass.show = false;
	},
});

/**
 * Generate a link with encoded text
 * @param {string} text
 * @param {string} auth_url
 * @returns {string}
 */
function genLink(text = "", auth_url = "#/auth/") {
	let base = encodeURIComponent(text);
	return window.location.origin + window.location.pathname + auth_url + base;
}

/**
 * Parse a link and extract the encoded part
 * @param {string} link
 * @param {string} auth_url
 * @returns {string}
 */
export function parseLink(link, auth_url = "#/auth/") {
	let index = link.indexOf(auth_url);
	let base = link.substring(index + auth_url.length);
	return decodeURIComponent(base);
}

let initiated = false;

/**
 * Manage password of a user
 * @returns {Object}
 * @property {Auth} pass
 * @property {Function} setPass
 * @property {Function} authWithPass
 */
export function useAuth() {

	const gun = useGun();
	gun
		.user()
		.get("safe")
		.map()
		.on((d, k) => {
			pass.safe[k] = d;
		});

	watchEffect(async () => {
		if (!pass.show) {
			pass.dec = {};
			return;
		}
		if (pass?.safe?.pass) {
			pass.dec.pass = await user.decrypt(pass.safe.pass);
			pass.input = pass.dec.pass || "";
		}
		if (pass?.safe?.enc) {
			pass.dec.pair = await SEA.decrypt(pass.safe.enc, pass.dec.pass);
		}
	});

	return { pass, setPass, authWithPass };
}

/**
 * Check if a user has a password
 * @param {string} pub
 * @returns {Promise<boolean>}
 */
export async function hasPass(pub) {
	const gun = useGun();
	return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

/**
 * Authenticate with a password
 * @param {string} pub
 * @param {string} passphrase
 * @returns {Promise<void>}
 */
async function authWithPass(pub, passphrase) {
	const gun = useGun();
	let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}

/**
 * Set a new password
 * @param {string} text
 * @returns {Promise<void>}
 */
async function setPass(text) {
	const gun = useGun();
	let encPair = await SEA.encrypt(user.pair(), text);
	let encPass = await user.encrypt(text);
	gun.user().get("safe").get("enc").put(encPair);
	gun.user().get("safe").get("pass").put(encPass);
}

/**
 * Use an auth link
 * @param {string} data
 * @param {string} passPhrase
 * @returns {string}
 */
export function useAuthLink(data, passPhrase) {
	if (!data) return;
	const decoded = decodeURIComponent(data);
	console.log("dec", decoded);
	if (decoded.substring(0, 3) == "SEA") {
		if (passPhrase) {
			authEncPass(decoded, passPhrase);
		}
		return "encrypted";
	} else {
		try {
			let d = JSON.parse(decoded);
			if (isPair(d)) {
				auth(d);
			}
			return "success";
		} catch (e) {
			return "incorrect link";
		}
	}
}

/**
 * Authenticate with an encrypted password
 * @param {string} encPair
 * @param {string} passphrase
 * @returns {Promise<void>}
 */
async function authEncPass(encPair, passphrase) {
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}
