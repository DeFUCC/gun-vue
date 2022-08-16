
import { ref } from 'vue'

// Sintel, a free, Creative Commons movie
const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

export function downloadTorrent(id = torrentId) {
  const file = ref()
  import('webtorrent/webtorrent.min').then((lib) => {
    const WebTorrent = lib.default
    const client = new WebTorrent()

    client.add(id, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      file.value = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })
    })
  })
  return { file }
}

export function uploadTorrent(files) {

  const file = ref()
  import('webtorrent/webtorrent.min').then((WebTorrent) => {
    const client = new WebTorrent()

    client.seed(files, function (torrent) {
      console.log('Client is seeding ' + torrent.magnetURI)
    })
  })
  return { file }
}