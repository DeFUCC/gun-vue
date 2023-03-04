<script setup lang="ts">
import { asyncComputed, useObjectUrl } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { uploadTorrent, downloadTorrent } from './useTorrent';

const upload = ref()
const link = ref()
const download = ref()

function uploadEvent(event) {
  const { torrent } = uploadTorrent(event?.target?.files)
  watch(torrent, t => {
    upload.value = t
    console.log(t)
  })
}

watch(link, l => {
  const { files } = downloadTorrent(l)
  watch(files, f => {
    download.value = f
    console.log(f)
  })
})

const image = asyncComputed(async () => URL.createObjectURL(await download.value?.[0]?.blob()))

const img = useObjectUrl(computed(() => download.value?.[0]))

const downloadUrl = computed(() => {
  if (!upload.value?.infoHash) return ''
  let url = new URL(window?.location?.href)
  return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}#/file/${upload.value?.infoHash}`
})
</script>

<template lang='pug'>
p TORRENT
  input(
    type="file"
    @change="uploadEvent($event)"
    )
  p {{ upload?.name }} 
  p {{ upload?.infoHash }} 
  a(:href="downloadUrl" target="_blank") {{ downloadUrl }} 
  qr-show(v-if="downloadUrl" :data="downloadUrl")
  textarea(v-model="link" @change="link = $event")
  img(:src="image" v-if="image")
  img(:src="img")
</template>