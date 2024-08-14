/**
 * Loads the [list of active volunteer DHT gun nodes](https://github.com/amark/gun/wiki/volunteer.dht)  and benchmarks ping for them
 * @module Relays
 * @group Database
 */

/**
 * @typedef {Object} Relay
 * @property {string} host
 * @property {string} url
 * @property {string} ping
 */

/** @typedef {Relay[]} Relays */

import urlRegex from "url-regex";
import { reactive } from "vue";
import { relay } from "./useRelay";

const relays = reactive({});
const errors = reactive({});

/**
 * Load the list of the relays
 * @param {Object} [options]
 * @param {string} [options.source='https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md']
 * @returns {Promise<{}>}
 */
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
						/** @type {Relay} */
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

/**
 * Gets the list of actual gun relays and tool to update the list
 * @returns {{relays: {}, errors: {}, loadRelays: () => Promise<{}>}}
 * @example
 * import { useRelays } from '@gun-vue/composables'
 * const { relays, errors, loadRelays } = useRelays()
 */
export function useRelays() {
	return { relays, errors, loadRelays };
}
