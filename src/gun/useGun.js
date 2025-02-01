/**
 * Gun DB initialization and basic methods
 * @module Gun
 * @group Database
 */

import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/webrtc";

import GunWorker from "./useGunWorker";

GunWorker.post("Welcome to Gun-Vue");

import { relay } from "./useRelay";

// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** @type {import('gun').IGunInstance} The main Gun instance for database operations */
let gun;

/**
 * Instantiate a Gun instance for DB manipulations
 * @param {import('gun').GunOptions} [options={ localStorage: false }] - Gun options
 * @returns {import('gun').IGunInstance}
 * @example
 * import { useGun } from '@gun-vue/composables'
 * const gun = useGun()
 */
export function useGun(options = { localStorage: false }) {
	if (!gun) {
		const opts = { peers: [relay.peer] };
		if (typeof options === "object") {
			Object.assign(opts, options);
		}
		console.log(opts.peers);
		gun = Gun(opts);
	}
	return gun;
}

/**
 * @param {...string} args
 * @returns {import('gun').IGunInstance}
 */
export function useGunPath(...args) {
	const gun = useGun();
	let g;
	for (let arg of args) {
		g = gun.get(arg);
	}
	return g || gun;
}

/**
 * @param {...string} args
 */
export function useGunMap(...args) {
	// Implementation not provided in the original code
}

/**
 * get a secondary Gun instance for certificate management
 * @param {object} [options={ localStorage: false }]
 * @returns {import('gun').IGunInstance}
 */
export function useGunSecondary(options = { localStorage: false }) {
	const gun2 = Gun({ peers: [relay.peer], ...options });
	return gun2;
}

/**
 * SEA library
 * @constant SEA
 */
export { default as SEA } from "gun/sea.js";

/**
 * Get a soul for any given node
 * A wrapper for `Gun.node.soul`
 */
export const soul = Gun?.node?.soul;

/**
 * Generate a random UUID
 * A wrapper for `Gun.text.random`
 * @param {number} [num]
 * @returns {string}
 */
export const genUUID = Gun?.text?.random;
