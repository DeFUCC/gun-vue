/**
 * File handling functions
 * @module Torrent
 * @group Files
 * */

import { ref } from 'vue'

// Sintel, a free, Creative Commons movie
const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

export function downloadTorrent(id = torrentId) {
  const files = ref()
  import('webtorrent/dist/webtorrent.min.js').then((lib) => {
    const WebTorrent = lib.default
    const client = new WebTorrent()

    client.add(id, function (torrent) {
      files.value = torrent.files
    })
  })
  return { files }
}

export function uploadTorrent(files) {

  const torrent = ref()
  import('webtorrent/dist/webtorrent.min.js').then((WebTorrent) => {
    const client = new WebTorrent.default()

    client.seed(files, function (tor) {
      console.log('Client is seeding ' + tor.magnetURI)
      torrent.value = tor
    })
  })
  return { torrent }
}