<script setup>

import FileHash from './FileHash.vue';
import TorrentUpload from './TorrentUpload.vue';
</script>

<template lang="pug">
.flex.flex-col

  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")

  torrent-upload
  file-hash
</template>