/**
 * @module Relay
 */

import { gun, peers } from "./gun";
import { reactive, watch } from "vue";
import ms from "ms";

/**
 * @typedef {Reactive} Relay - Peer server status reactive object
 * @property {String} host - the current peer server URL
 * @property {String} status -
 * @property {Number} started - the timestamp of server started current session
 * @property {Number} pulse – last received timestamp
 * @property {Number} lag - drift of the timestamp in ms
 * @property {Number} diff - age of the session in ms
 * @property {String} age - age of the session in human readable format
 * @property {Boolean} blink - a Boolean toggled every time the new pulse comes to drive animations
 */

const relay = reactive({
  host,
  status: "offline",
  started: 0,
  pulse: 0,
  lag: 0,
  diff: computed(() => relay.pulse - relay.started),
  age: computed(() => ms(relay.diff)),
  blink: false,
});

/**
 * Peer server status monitor
 * @param {URL} host
 * @returns {Relay}
 */
export function useRelay(host = new URL(peers[0]).hostname) {
  watch(
    () => relay.pulse,
    (next, prev) => {
      relay.blink = !relay.blink;
      relay.lag = next - prev - 500;
    }
  );

  gun
    .get(host)
    .map()
    .on((d, k) => {
      relay[k] = d;
    });

  return relay;
}
