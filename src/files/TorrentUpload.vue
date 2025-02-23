<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { prettyBytes } from '../composables';
import FileInfo from './FileInfo.vue';

const { files, initialized, upload, deleteFile, init, clearFiles, clearOPFS } = useTorrent()
const showFiles = ref(false)
const activeFile = ref(null)
const dragover = ref(false)

const emit = defineEmits(['uploaded', 'url'])


onMounted(init)


const downloadUrl = computed(() => {
  if (!activeFile.value?.info?.infoHash) return ''
  let url = new URL(window?.location?.href)
  url.hash = ''
  return `${url.href}#/files/${activeFile.value.info.infoHash}`
})

const clip = useClipboard({ source: downloadUrl })
const { share, isSupported: shareSupported } = useShare()

const showQr = ref(false)
const showFile = ref(false)
</script>

<template lang='pug'>
.flex.gap-2
  button.button(@click="showFiles = true")
    .i-la-share
    .text-sm {{ files.size }}

  ui-layer(:open="showFiles" @close="showFiles = false")
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
      template(v-for="[name, data] in files" :key="name")
        .flex.gap-2.items-center.p-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer(
          @click="activeFile = data"
        )
          .text-md.max-w-55ch {{ name }}
          .flex-1
          .p-0 {{ prettyBytes(data.file.size) }}
          button.p-2(@click.stop="deleteFile(name)")
            .i-la-trash

</template>