/**
 * Gun DB initialization and basic methods
 * @module useGun
 */

import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
// import "gun/lib/webrtc";
import "gun/nts";


// polyfiils for Gun 0.2020.1236
import { Buffer } from 'buffer'
window.Buffer = Buffer
window.setImmediate = setTimeout

import { useStorage } from "@vueuse/core";

export const defaultPeer = "https://etogun.glitch.me/gun";
export const peer = useStorage("peer", defaultPeer);

// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** The main Gun instance for database operations */
export let gun;

/** Secondary Gun instance for key management */
export let gun2;

/**
 * Instantiate a Gun instance for DB manipulations
 * @param {Object} options - options fot this gun instance, like { localstorage:true }
 * @returns {Gun}
 * @example
 * import { useGun } from '@gun-vue/composables'
 *
 * const gun = useGun()
 */

export function useGun(opts = { localStorage: false }) {
  if (!gun) {
    gun = Gun({ peers: [peer.value], ...opts });
  }
  return gun;
}

/**
 * get a secondary Gun instance to manages certificates
 * @param {Object} options - options fot this gun instance, like { localstorage:true }
 * @returns {Gun}
 */

export function useGun2(opts = { localStorage: false }) {
  if (!gun2) {
    gun2 = Gun({ peers: [peer.value], ...opts });
  }
  return gun2;
}

/**
 * SEA library
 * @constant SEA
 */
export { default as SEA } from "gun/sea.js";

/**
 * **Get a soul for any given node**
 * A wrapper for `Gun.node.soul`
 * @function soul
 */
export const soul = Gun?.node?.soul;

/**
 * **Generate a random UUID**
 * A wrapper for `Gun.text.random`
 * @function genUUID
 */
export const genUUID = Gun?.text?.random;

// A putPriv chain extension as noted by @amark
GUN.chain.putPriv = function (data, cb, opt) {
  var ref = this;
  (async function () {
    ref.put(await SEA.encrypt(data, ref.back(-1).user().pair()), cb, opt);
  })();
  return ref;
};
