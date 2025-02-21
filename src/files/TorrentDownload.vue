<script setup lang="ts">
import { ref } from 'vue';
import { prettyBytes } from '../composables';
import { FileCard } from '../components'
import { useTorrent } from './useTorrent'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const { download, downloadStatus } = useTorrent()
const torrentFiles = ref([])

download(props.id).then(files => {
  torrentFiles.value = files
})
</script>

<template lang='pug'>
.flex.flex-col.gap-2.max-w-55ch.relative
  .bg-dark-100.op-20.absolute.top-0.bottom-0.left-0(inert :style="{ width: `${downloadStatus.progress * 100}%` }" v-if="downloadStatus.progress > 0 && !downloadStatus.done")
  .p-2.animate-pulse.text-xs(v-if="downloadStatus.progress == 0 && !downloadStatus.done")
    .p-1 Requesting the torrent... 
  .p-2.text-sm.flex.flex-wrap.gap-2(v-else-if="!downloadStatus.done")
    .p-1 Torrent: 
    .p-1 {{ !downloadStatus.done ? downloadStatus.progress : 'done' }}
    .p-1 Total {{ prettyBytes(downloadStatus.downloaded || 0) }} at {{ prettyBytes(downloadStatus.downloadSpeed || 0) }}/s

  file-card(v-for="file in torrentFiles" :key="file?.name" :file="file")
</template>