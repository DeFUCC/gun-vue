<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { prettyBytes } from '../composables';

const { files, initialized, upload, deleteFile, init, clearFiles, clearOPFS } = useTorrent()
const showFiles = ref(false)
const activeFile = ref(null)
const dragover = ref(false)

const emit = defineEmits(['uploaded', 'url'])


onMounted(init)

async function handleFiles(e) {
  const inputFiles = e.target?.files || e?.dataTransfer?.files
  if (!inputFiles?.length) return
  const results = await upload(inputFiles)
  if (results.length) {
    activeFile.value = results[0]
    emit('uploaded', results[0])
    // showFiles.value = true
    emit('url', downloadUrl.value)
  }
}

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
  label.button(
    :class="{ 'bg-light-800': dragover }"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="handleFiles($event); dragover = false"
  )
    .i-la-file
    input(type="file" accept="*" multiple @change="handleFiles" style="display:none")

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

  ui-layer(:open="!!activeFile" @close="activeFile = null")
    .flex.max-w-80vw.flex-wrap.gap-2.p-4.items-start(v-if="activeFile")
      .flex.flex-col.gap-2
        .text-xl {{ activeFile.info.name }}
        .font-mono.text-sm {{ activeFile.info.infoHash }}


        a.gap-2.button.underline.font-bold.-all(:href="downloadUrl" target="_blank") 
          .i-la-link
          .p-0 Download URL
        button.p-2.button.gap-2(
          v-if="clip.isSupported.value"
          @click="clip.copy()"
          )
          .i-la-copy
          .p-0  {{ clip?.copied.value ? 'Copied!' : 'Copy' }}
        button.p-2.button.gap-2(
          v-if="shareSupported"
          @click="share({ title: activeFile.info?.name, url: downloadUrl })"
          )
          .i-la-share
          .p-0  Share
        button.button.p-2.gap-2(
          @click="showQr = !showQr"
          ) 
          .i-la-qrcode 
          .p-0 {{ showQr ? 'Hide' : 'Show' }} QR 
        button.button.p-2.gap-2(
          @click="showFile = !showFile"
          ) 
          .i-la-file
          .p-0 {{ showFile ? 'Hide' : 'Show' }} file
      transition(name="fade")
        qr-show(v-if="downloadUrl && showQr" :data="downloadUrl")
      template(v-if="showFile")
        .flex.gap-2.mt-2
          file-card.flex-auto.max-w-70.break-all(
            v-for="file in activeFile.torrent.files" 
            :key="file.name" 
            :file="file"
          )
</template>