import { computed, reactive, watchEffect } from "vue";
import { useGun, SEA, isPair, user, uploadText, useQR } from "../composables";
import { extractFromFile } from "gun-avatar"

function genLink(text = "", auth_url = "#/auth/") {
	let base = encodeURIComponent(text);
	return window.location.origin + window.location.pathname + auth_url + base;
}

export function parseLink(link, auth_url = "#/auth/") {
	let index = link.indexOf(auth_url);
	let base = link.substring(index + auth_url.length);
	return decodeURIComponent(base);
}

export async function hasPass(pub) {
	const gun = useGun();
	return await gun.get(`~${pub}`).get("safe").get("enc").then();
}

async function authWithPass(pub, passphrase) {
	const gun = useGun();
	let encPair = await gun.get(`~${pub}`).get("safe").get("enc").then();
	let pair = await SEA.decrypt(encPair, passphrase);
	gun.user().auth(pair);
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
	const gun = useGun();
	const decoded = decodeURIComponent(data);
	if (decoded.substring(0, 3) == "SEA") {
		if (passPhrase) {
			SEA.decrypt(decoded, passPhrase).then(pair => {
				gun.user().auth(pair);
			})
		}
		return "encrypted";
	} else {
		try {
			let d = JSON.parse(decoded);
			if (isPair(d)) {
				gun.user().auth(d);
			}
			return "success";
		} catch (e) {
			return "incorrect link";
		}
	}
}

export async function handleAuthFiles(files, pair) {
	const file = files[0]
	if (!file) return
	const type = file.type.toLowerCase()
	let result
	try {
		if (type === 'application/json' || file.name.endsWith('.webkey')) {
			result = await uploadText([file])
		} else if (type === 'image/png' || type === 'image/svg+xml') {
			const data = await extractFromFile(file)
			if (data?.content) result = data.content
		} else if (type.startsWith('image/')) {
			const { processFile } = useQR()
			result = await processFile(file)
		}
		return result
	} catch (e) {
		console.error('Failed to extract auth data from file:', e)
	}
}