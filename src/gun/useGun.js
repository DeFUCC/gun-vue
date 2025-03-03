import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/webrtc";

// import GunWorker from "./useGunWorker";
// GunWorker.post("Welcome to Gun-Vue");

import { relay } from "./useRelay";

// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** @type {import('gun').IGunInstance} The main Gun instance for database operations */
let gun;


export function useGun(options = { localStorage: false }) {
	if (!gun) {
		const opts = { peers: [relay.peer] };
		if (typeof options === "object") {
			Object.assign(opts, options);
		}
		gun = Gun(opts);
	}
	return gun;
}


export function useGunSecondary(options = { localStorage: false }) {
	const gun2 = Gun({ peers: [relay.peer], ...options });
	return gun2;
}

export { default as SEA } from "gun/sea.js";

export const soul = Gun?.node?.soul;

export const genUUID = Gun?.text?.random;
