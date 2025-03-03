<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { niceBytes } from '../composables';
import FileInfo from './FileInfo.vue';

const { files, initialized, upload, deleteFile, init, clearFiles, clearOPFS } = useTorrent()

const emit = defineEmits(['file'])

</script>

<template lang='pug'>
.flex.flex-col.gap-2
  .flex.items-center.gap-2.sticky.top-0.bg-light-300.bg-op-90.dark-bg-dark-300.dark-bg-op-90.backdrop-blur-md.rounded-lg.z-100
    slot
    .text-xl.font-bold Shared files
    .flex-1
    button.button.p-2.gap-2(@dblclick="clearFiles")
      .i-la-folder-minus
    button.button.p-2.gap-2(@dblclick="clearOPFS")
      .i-la-trash

  .flex.flex-col.gap-2    
    .flex.gap-2.items-center.p-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer(
      @click="emit('file', data)"
      v-for="[name, data] in files" :key="name"
      )
      .text-md.max-w-55ch.break-all {{ name }}
      .flex-1
      .p-0 {{ niceBytes(data.file.size) }}
      button.p-2(@click.stop="deleteFile(name)")
        .i-la-trash


</template>