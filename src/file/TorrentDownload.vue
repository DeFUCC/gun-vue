<script setup lang="ts">

import { asyncComputed, useObjectUrl, useRafFn } from '@vueuse/core';
import { ref, watch, shallowReactive, computed, reactive, shallowRef } from 'vue';
import { prettyBytes } from '../composables';
import { uploadTorrent } from './useTorrent';


const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

function downloadTorrent(id: string) {
  const torrent = reactive({
    files: [],
    task: null,
    status: {
      done: false,
      progress: 0,
      downloadSpeed: 0,
      downloaded: 0,
    }
  })
  import('webtorrent/dist/webtorrent.min.js').then((lib) => {
    const WebTorrent = lib.default
    const client = new WebTorrent()
    torrent.task = client.add(id, (tor) => {
      torrent.files = tor.files
    })
    client.on('download', () => {
      const { progress, downloaded, done, downloadSpeed } = torrent.task
      torrent.status = { done, progress, downloaded, downloadSpeed }
    });

  })
  return torrent
}

const tor = downloadTorrent(`magnet:?xt=urn:btih:${props.id}&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`)

</script>

<template lang='pug'>
.flex.flex-col.gap-2 
  .p-2.text-sm.flex.flex-wrap.gap-2
    .p-1 Torrent: 
    .p-1 {{ tor?.status?.done ? tor?.status?.progress : 'done' }}
    .p-1 Total {{ prettyBytes(tor?.status?.downloaded) }} at {{ prettyBytes(tor?.status?.downloadSpeed) }}/s
  file-card(v-for="file in tor?.files" :key="file?.name" :file="file")
</template>