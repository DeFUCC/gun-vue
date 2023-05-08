/**
 * Manage user's password and credentials
 * @module Auth
 * @group Users
 */

import { computed, reactive, watchEffect } from "vue";
import type { ComputedRef, } from 'vue'
import { useGun, SEA, auth, isPair, user } from "../composables";
import { ISEAPair } from "gun";

/**
 * @typedef {reactive} Auth
 */

export interface Auth {
	input: string
	show: boolean
	safePair: boolean
	minLength: number
	safe: {
		saved: boolean
		password: string
		enc: string
		pass: string
		rooms: object
	}
	dec: {
		pass?: string
		pair?: ISEAPair
		[key: string]: string | undefined | ISEAPair
	};
	links: {
		pass: string;
		pair: string;
	};
	set(): void;
}

export const pass: Auth = reactive({
	input: "",
	show: false,
	safePair: false,
	minLength: 5,
	safe: {
		saved: false,
		password: '',
		enc: '',
		pass: '',
		rooms: {}
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

function genLink(text = "", auth_url = "#/auth/"): string {
	let base = encodeURIComponent(text);
	return window.location.origin + window.location.pathname + auth_url + base;
}

export function parseLink(link: string, auth_url = "#/auth/"): string {
	let index = link.indexOf(auth_url);
	let base = link.substring(index + auth_url.length);
	return decodeURIComponent(base)
}

let initiated = false;

/**
 * Manage password of a user
 * @returns {useAuth}
 */

export interface useAuth {
	pass: Auth
	setPass: (text: string) => Promise<void>
	authWithPass: (pub: string, passphrase: string) => Promise<void>
}

export function useAuth(): useAuth {
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
				pass.dec.pass = await user.decrypt(pass.safe.pass);
				pass.input = pass.dec.pass || '';
			}
			if (pass?.safe?.enc) {
				//@ts-ignore wrong types
				pass.dec.pair = await SEA.decrypt(pass.safe.enc, pass.dec.pass);
			}
		});
	}
	initiated = true;

	return { pass, setPass, authWithPass };
}

export async function hasPass(pub: string) {
	const gun = useGun();
	return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

async function authWithPass(pub: string, passphrase: string) {
	const gun = useGun();
	let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}

async function setPass(text: string) {
	const gun = useGun();
	let encPair = await SEA.encrypt(user.pair(), text);
	let encPass = await user.encrypt(text);
	gun.user().get("safe").get("enc").put(encPair);
	gun.user().get("safe").get("pass").put(encPass);
}

export function useAuthLink(data: string, passPhrase: string) {
	if (!data) return;
	const decoded = decodeURIComponent(data)
	console.log('dec', decoded)
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

async function authEncPass(encPair: string, passphrase: string) {
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}
