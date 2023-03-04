<script setup lang="ts">

import { asyncComputed, useObjectUrl } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { uploadTorrent, downloadTorrent } from './useTorrent';

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})



const download = ref()

watch(() => props.id, id => {
  const { files } = downloadTorrent(`magnet:?xt=urn:btih:${id}&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`)
  watch(files, f => {
    download.value = f
    console.log(f)
  })
}, { immediate: true })

const image = asyncComputed(async () => await download.value?.[0]?.blob())

const img = useObjectUrl(image)
</script>

<template lang='pug'>
p
  img(:src="img")
</template>