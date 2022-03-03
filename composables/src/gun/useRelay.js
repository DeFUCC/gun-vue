/**
 * Relay connection management
 * @module useRelay
 */

import { useGun, peer, defaultPeer } from '.'
import { computed, reactive, watch } from 'vue'
import ms from 'ms'

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
 * @example
 * {
 * "peer": "https://etogun.glitch.me/gun",
 * "host": "6db1edbb5aae",
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

const relay = reactive({
  peer: peer.value,
  host: new URL(peer.value).hostname,
  status: 'offline',
  started: 0,
  pulse: 0,
  lag: 0,
  diff: computed(() => relay.pulse - relay.started),
  age: computed(() => ms(relay.diff)),
  delay: computed(() => Date.now() - relay.pulse),
  blink: false,
  setPeer(url) {
    peer.value = url
    window.location.reload()
  },
  resetPeer() {
    peer.value = defaultPeer
    window.location.reload()
  },
})

watch(
  () => relay.pulse,
  (next, prev) => {
    relay.blink = !relay.blink
    relay.lag = next - prev - 500
  },
)

/**
 * Peer server status monitor
 * @returns {Relay}
 *
 * @example
 * import { useRelay } from '@gun-vue/composables';
 *
 * const relay = useRelay()
 */
export function useRelay() {
  const gun = useGun()
  if (relay.pulse == 0) {
    gun
      .get(relay.host)
      .map()
      .on((d, k) => {
        relay[k] = d
      })
  }

  return relay
}
