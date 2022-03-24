import urlRegex from 'url-regex'
import { reactive } from 'vue'
import { relay } from './useRelay'

const relays = reactive({})
const errors = reactive({})

export async function loadRelays() {
  let res = await fetch('https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md')
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


export function useRelays() {
  loadRelays()

  return { relays, errors, loadRelays }
}