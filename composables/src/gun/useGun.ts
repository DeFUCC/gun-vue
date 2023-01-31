/**
 * Gun DB initialization and basic methods
 * @module Gun
 * @group Database
 */
import type { GunOptions, IGunInstance } from 'gun'

import Gun from "gun/gun";
import "gun/lib/then";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/webrtc";


// // // polyfiils for Gun 0.2020.1236
// import { Buffer } from 'buffer'
// window.Buffer = Buffer
// window.setImmediate = setTimeout
// window.global = {}

import { peer } from './useRelay'
import { shallowReactive } from 'vue';


// https://github.com/amark/gun/wiki/volunteer.dht
// https://github.com/draeder/gun-relays

/** The main Gun instance for database operations */
export let gun: IGunInstance;

/** Secondary Gun instance for key management */
export let gun2: IGunInstance;

export const gunInstances = shallowReactive([])

/**
 * Instantiate a Gun instance for DB manipulations
 * @example
 * import { useGun } from '@gun-vue/composables'
 * const gun = useGun()
 */

export function useGun(options: GunOptions = { localStorage: false }): IGunInstance {
  if (!gun) {
    const opts = { peers: [peer.value] }
    if (typeof options === 'object') {
      Object.assign(opts, options)
    }
    gun = Gun(opts);
    gunInstances.push(gun)
  }
  return gun;
}

/**
 * get a secondary Gun instance for certificate management
 */

export function useGun2(options: object = { localStorage: false }): IGunInstance {
  if (!gun2) {
    gun2 = Gun({ peers: [peer.value], ...options });
    gunInstances.push(gun2)
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

// @ts-ignore: Incorrect GUN types
export const soul = Gun?.node?.soul;

/**
 * **Generate a random UUID**
 * A wrapper for `Gun.text.random`
 * @function genUUID
 */

// @ts-ignore: Incorrect Gun types
export const genUUID: (num?: number) => string = Gun?.text?.random;


