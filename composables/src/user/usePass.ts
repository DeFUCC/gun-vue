/**
 * Manage user's password and credentials
 * @module Pass
 * @group Users
 */

import { computed, reactive, watchEffect } from "vue";
import type { ComputedRef, } from 'vue'
import { gun, useGun, SEA, auth, isPair, user } from "..";
//@ts-ignore no types
import base32 from "base32";
import { ISEAPair } from "gun";

/**
 * @typedef {reactive} Pass
 * @property {Object} safe
 * @property {Object} dec
 */

export interface Pass {
	input: string
	show: boolean
	safePair: boolean
	minLength: number
	safe: {
		enc?: string
		pass?: string
		[key: string]: string | undefined
	};
	dec: {
		pass?: string
		pair?: ISEAPair
		[key: string]: string | undefined | ISEAPair
	};
	links: {
		pass: ComputedRef<string> | string;
		pair: ComputedRef<string> | string;
	};
	set(): void;
}

export const pass: Pass = reactive({
	input: "",
	show: false,
	safePair: false,
	minLength: 5,
	safe: {},
	dec: {},
	links: {
		pass: computed(() => {
			return genLink(pass.safe?.enc);
		}),
		pair: computed(() => {
			return genLink(JSON.stringify(user.pair()));
		}),
	},

	set() {
		setPass(pass.input);
		pass.input = "";
		pass.show = false;
	},
});

function genLink(text = ""): string {
	let base = base32.encode(text);
	return window.location.origin + window.location.pathname + "#/auth/" + base;
}

export function parseLink(link: string): string {
	let index = link.indexOf("#/auth/");
	let base = link.substring(index + 7);
	return base32.decode(base);
}

let initiated = false;

/**
 * Manage password of a user
 * @returns {usePass}
 */

export interface UsePass {
	pass: Pass
	setPass: (text: string) => Promise<void>
	logWithPass: (pub: string, passphrase: string) => Promise<void>
}

export function usePass(): UsePass {
	if (!initiated) {
		const gun = useGun();
		gun
			.user()
			.get("safe")
			.map()
			.on((d: string, k: string) => {
				pass.safe[k] = d;
			});

		watchEffect(async () => {
			if (!pass.show) {
				pass.dec = {};
				return;
			}
			if (pass?.safe?.pass) {
				pass.dec.pass = await SEA.decrypt(pass.safe.pass, user.pair());
				pass.input = pass.dec.pass || '';
			}
			if (pass?.safe?.enc) {
				//@ts-ignore wrong types
				pass.dec.pair = await SEA.decrypt(pass.safe.enc, pass.dec.pass);
			}
		});
	}
	initiated = true;

	return { pass, setPass, logWithPass };
}

export async function hasPass(pub: string) {
	return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

async function logWithPass(pub: string, passphrase: string) {
	let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}

async function setPass(text: string) {
	let encPair = await SEA.encrypt(user.pair(), text);
	let encPass = await SEA.encrypt(text, user.pair());
	gun.user().get("safe").get("enc").put(encPair);
	gun.user().get("safe").get("pass").put(encPass);
}

export function usePassLink(data: string, passPhrase: string) {
	if (!data) return;
	const decoded = base32.decode(data);
	if (decoded.substring(0, 3) == "SEA") {
		if (passPhrase) {
			logEncPass(decoded, passPhrase);
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

async function logEncPass(encPair: string, passphrase: string) {
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}
