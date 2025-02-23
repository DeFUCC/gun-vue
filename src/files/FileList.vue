<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { prettyBytes } from '../composables';
import FileInfo from './FileInfo.vue';

const { files, initialized, upload, deleteFile, init, clearFiles, clearOPFS } = useTorrent()

const emit = defineEmits(['file'])

</script>

<template lang='pug'>

.flex.flex-col.gap-2.p-4
  .flex.flex-col.gap-2
    .flex.items-center.gap-2
      .text-xl.font-bold Shared files
      .flex-1
      button.button.p-2.gap-2(@click="clearFiles")
        .i-la-folder-minus
        .p-0 Clear files
      button.button.p-2.gap-2(@click="clearOPFS")
        .i-la-trash
        .p-0 Clear OPFS

  .flex.flex-col.gap-2    
    .flex.gap-2.items-center.p-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer(
      @click="emit('file', data)"
      v-for="[name, data] in files" :key="name"
      )
      .text-md.max-w-55ch {{ name }}
      .flex-1
      .p-0 {{ prettyBytes(data.file.size) }}
      button.p-2(@click.stop="deleteFile(name)")
        .i-la-trash


</template>