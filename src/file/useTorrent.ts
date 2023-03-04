/**
 * File handling functions
 * @module Torrent
 * @group Files
 * */

import { ref } from 'vue'

export function downloadTorrent(id: string) {
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