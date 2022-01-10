/**
 * @module Relay
 */

import { gun, peers } from "./gun";
import { computed, reactive, watch } from "vue";
import ms from "ms";

/**
 * @typedef {reactive} Relay Peer server status reactive object
 * @property {String} host the current peer server URL
 * @property {String} status current connection status
 * @property {Number} started the timestamp of server started current session
 * @property {Number} pulse last received timestamp
 * @property {Number} lag drift of the timestamp in ms
 * @property {Number} diff age of the session in ms
 * @property {String} age age of the session in human readable format
 * @property {Boolean} blink a Boolean toggled every time the new pulse comes to drive animations
 */

const relay = reactive({
  peer: peers[0],
  host: new URL(peers[0]).hostname,
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
 * Peer server status monitor
 * @param {URL} host
 * @returns {Relay}
 *
 * @example const relay = useRelay()
 */
export function useRelay() {
  if (relay.pulse == 0) {
    gun
      .get(relay.host)
      .map()
      .on((d, k) => {
        relay[k] = d;
      });
  }

  return relay;
}
