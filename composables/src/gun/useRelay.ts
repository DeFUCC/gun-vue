/**
 * Relay connection management
 * @module useRelay
 */

import { useGun } from '.'
import { computed, reactive, watch } from 'vue'
import type { Ref } from 'vue'
import { useStorage } from "@vueuse/core";
import ms from 'ms'

const defaultPeer = "https://gun.defucc.me/gun";

export const peer: Ref = useStorage("peer", defaultPeer);

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

export interface Relay {
  peer: string
  host: string
  status: string
  pulse: number
  lag: number
  started: number
  diff: number
  age: string
  blink: boolean
}

export const relay: Relay = reactive({
  list: [],
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
})

watch(
  () => relay.pulse,
  (next, prev) => {
    relay.blink = !relay.blink
    relay.lag = next - prev - 500
  },
)

function setPeer(url: string) {
  peer.value = url
  window.location.reload()
}

function resetPeer() {
  peer.value = defaultPeer
  window.location.reload()
}


/**
 * Peer server status monitor
 * @returns {useRelay}
 *
 * @example
 * import { useRelay } from '@gun-vue/composables';
 *
 * const { relay, setPeer, resetPeer } = useRelay()
 */
export function useRelay(): { relay: Relay, setPeer: (url: string) => void, resetPeer: () => void } {
  const gun = useGun()
  if (relay.pulse == 0) {
    gun
      .get(relay.host)
      .map()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .on((d: string, k: string) => {
        relay[k] = d
      })
  }

  return { relay, setPeer, resetPeer }
}
