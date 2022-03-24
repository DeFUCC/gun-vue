/**
 * Loads the [list of active volunteer DHT gun nodes](https://github.com/amark/gun/wiki/volunteer.dht)  and benchmarks ping for them
 * @module useRelays
 */

/**
 * @typedef {Object} useRelays
 * @property {Object} Relays
 * @property {Object} Errors
 * @property {Function} loadRelays
 */

/**
 * @typedef {Object} loadRelaysOptions
 * @property {String} source
 */

/**
 * @typedef {Object[]} Relays 
 * @property {String} hostname
 * @property {String} url
 * @property {Number} ping
 */


import urlRegex from 'url-regex'
import { reactive } from 'vue'
import { relay } from './useRelay'

const relays = reactive({})
const errors = reactive({})

/**
 * Load the list of the relays
 * @param {Object} loadRelaysOptions
 * @returns {relays} 
 */

export async function loadRelays({
  source = 'https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md'
} = {}) {
  let res = await fetch(source)
  let data = await res.text()
  let urls = data.match(urlRegex())
  urls.push(relay.peer)
  urls = Array.from(urls)
  urls.forEach((u) => {
    let testUrl = new URL(u)
    if (testUrl.pathname === '/gun' && testUrl.pathname.indexOf('~~') === -1) {
      let startMoment = performance.now()
      fetch(testUrl.href, {
        method: 'HEAD',
        mode: 'cors',
        // mode: 'no-cors',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }).then(response => {
        let endMoment = performance.now()
        if (response.ok) {
          relays[testUrl.hostname] = {
            host: testUrl.hostname,
            ping: (endMoment - startMoment).toFixed(),
            url: testUrl.href
          }
        } else {
          errors[testUrl.hostname] = response
        }
      }).catch(e => {
        errors[testUrl.hostname] = e
      })
    }
  })
  return relays
}

/**
 * Gets the list of actual gun relays and tool to update the list
 * @returns {useRelays}
 * @example
 * import { useRelays } from '@gun-vue/composables'
 * const { relays, errors, loadRelays } = useRelays()
 */

export function useRelays() {
  return { relays, errors, loadRelays }
}

