import urlRegex from "url-regex";
import { reactive } from "vue";
import { relay } from "./useRelay";

const relays = reactive({});
const errors = reactive({});

export function useRelays() {
	return { relays, errors, loadRelays };
}

export async function loadRelays({
	source = "https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md",
} = {}) {
	let res = await fetch(source);
	let data = await res.text();
	const urls = data.match(urlRegex());
	urls.push(relay.peer);
	const urlList = Array.from(urls);
	urlList.forEach((u) => {
		let testUrl = new URL(u);
		if (testUrl.pathname === "/gun" && testUrl.pathname.indexOf("~~") === -1) {
			let startMoment = performance.now();
			fetch(testUrl.href, {
				method: "HEAD",
				mode: "cors",
				// mode: 'no-cors',
				redirect: "follow",
				referrerPolicy: "no-referrer",
			})
				.then((response) => {
					let endMoment = performance.now();
					if (response.ok) {
						const rel = {
							host: testUrl.hostname,
							ping: (endMoment - startMoment).toFixed(),
							url: testUrl.href,
						};
						relays[testUrl.hostname] = rel;
					} else {
						errors[testUrl.hostname] = response;
					}
				})
				.catch((e) => {
					errors[testUrl.hostname] = e;
				});
		}
	});
	return relays;
}


