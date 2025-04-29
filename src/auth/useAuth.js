import { computed, reactive, watchEffect } from "vue";
import { useGun, SEA, auth, isPair, user, uploadText, useQR } from "../composables";
import { extractFromFile } from "gun-avatar"

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

function genLink(text = "", auth_url = "#/auth/") {
	let base = encodeURIComponent(text);
	return window.location.origin + window.location.pathname + auth_url + base;
}

export function parseLink(link, auth_url = "#/auth/") {
	let index = link.indexOf(auth_url);
	let base = link.substring(index + auth_url.length);
	return decodeURIComponent(base);
}

let initiated = false;


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


export async function hasPass(pub) {
	const gun = useGun();
	return await gun.get(`~${pub}`).get("safe").get("enc").then();
}


async function authWithPass(pub, passphrase) {
	const gun = useGun();
	let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}

async function setPass(text) {
	const gun = useGun();
	let encPair = await SEA.encrypt(user.pair(), text);
	let encPass = await user.encrypt(text);
	gun.user().get("safe").get("enc").put(encPair);
	gun.user().get("safe").get("pass").put(encPass);
}

export function useAuthLink(data, passPhrase) {
	if (!data) return;
	const decoded = decodeURIComponent(data);
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

async function authEncPass(encPair, passphrase) {
	let pair = await SEA.decrypt(encPair, passphrase);
	auth(pair);
}


export async function handleAuthFiles(files, pair) {
	const file = files[0]
	if (!file) return
	const type = file.type.toLowerCase()
	try {
		if (type === 'application/json' || file.name.endsWith('.webkey')) {
			return await uploadText([file])
		} else if (type === 'image/png' || type === 'image/svg+xml') {
			const data = await extractFromFile(file)
			if (data?.content) return data.content
		} else if (type.startsWith('image/')) {
			const { processFile: processQr } = useQR()
			return await processQr(file)
		}
	} catch (e) {
		console.error('Failed to extract auth data from file:', e)
	}
}