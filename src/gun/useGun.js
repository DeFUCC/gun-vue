import { Gun, SEA } from "@gun-vue/gun-es"

import { relay } from "./useRelay";

// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** @type {import('gun').IGunInstance} The main Gun instance for database operations */
let gun;


export function useGun({ localStorage = false, peers = [relay.peer] } = {}) {
	if (!gun) { gun = Gun({ localStorage, peers }); }
	return gun;
}


export function useGunSecondary({ localStorage = false, peers = [relay.peer] } = {}) {
	const gun2 = Gun({ peers, localStorage });
	return gun2;
}

export { Gun, SEA }

export const soul = Gun?.node?.soul;

export const genUUID = Gun?.text?.random;
