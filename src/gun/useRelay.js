/**
 * Relay connection management
 * @module Relay
 * @group Database
 */

import { useGun } from "./composables";
import { computed, reactive, watch } from "vue";
import { useStorage } from "@vueuse/core";
import ms from "ms";

import config from "../../gun.config.json";

const defaultPeer = config.relay;

/**
 * Peer server status reactive object
 * @typedef {Object} Relay
 * @property {string} peer
 * @property {string} hostname
 * @property {string} status
 * @property {number} pulse
 * @property {number} lag
 * @property {number} started
 * @property {number} diff
 * @property {string} age
 * @property {boolean} blink
 * @example
 * {
 * "peer": "https://peer.era.eco/gun",
 * "hostname": "6db1edbb5aae",
 * "status": "running",
 * "started": 1642666725795,
 * "pulse": 1642677007483,
 * "lag": 8,
 * "diff": 10281688,
 * "age": "3h",
 * "delay": 22,
 * "blink": true
 * }
 */

/** @type {Relay} */
export const relay = reactive({
	list: [],
	peer: useStorage("peer", defaultPeer),
	hostname: computed(() => new URL(relay.peer)?.hostname || ""),
	status: "offline",
	started: 0,
	pulse: 0,
	lag: 0,
	diff: computed(() => relay.pulse - relay.started),
	age: computed(() => ms(relay.diff)),
	delay: computed(() => Date.now() - relay.pulse),
	blink: false,
});

watch(
	() => relay.pulse,
	(next, prev) => {
		relay.blink = !relay.blink;
		relay.lag = next - prev - 500;
	}
);

/**
 * @param {string} url
 */
export function setPeer(url) {
	relay.peer = url;
	setTimeout(() => {
		window.location.reload(), 700;
	});
}

export function resetPeer() {
	relay.peer = defaultPeer;
	setTimeout(() => {
		window.location.reload(), 700;
	});
}

/**
 * Peer server status monitor
 * @returns {{relay: Relay, setPeer: (url: string) => void, resetPeer: () => void}}
 *
 * @example
 * import { useRelay } from '@gun-vue/composables';
 *
 * const { relay, setPeer, resetPeer } = useRelay()
 */
export function useRelay() {
	const gun = useGun();
	if (relay.pulse == 0 && relay?.hostname) {
		gun
			.get(relay?.hostname)
			.map()
			.on((d, k) => {
				try {
					relay[k] = d;
				} catch (e) {
					console.log(e);
				}
			});
	}

	return { relay, setPeer, resetPeer };
}
