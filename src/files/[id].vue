<script setup lang="ts">
import { TorrentDownload } from '../components'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})


</script>

<template lang='pug'>
torrent-download(:id="id" :key="id")
</template>