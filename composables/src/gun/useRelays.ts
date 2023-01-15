/**
 * Loads the [list of active volunteer DHT gun nodes](https://github.com/amark/gun/wiki/volunteer.dht)  and benchmarks ping for them
 * @module useRelays
 */


interface Relay {
  host: string
  url: string
  ping: string
}

type Relays = Relay[]


import * as urlRegex from 'url-regex'
import { reactive } from 'vue'
import { relay } from './useRelay'

const relays = reactive({})
const errors = reactive({})

/**
 * Load the list of the relays
 */

export async function loadRelays({
  source = 'https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md'
} = {}): Promise<{}> {
  let res = await fetch(source)
  let data = await res.text()
  const urls = data.match(urlRegex())
  urls.push(relay.peer)
  const urlList = Array.from(urls)
  urlList.forEach((u) => {
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
          const rel: Relay = {
            host: testUrl.hostname,
            ping: (endMoment - startMoment).toFixed(),
            url: testUrl.href
          }
          relays[testUrl.hostname] = rel
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

export function useRelays(): { relays: {}, errors: {}, loadRelays: () => void } {
  return { relays, errors, loadRelays }
}

