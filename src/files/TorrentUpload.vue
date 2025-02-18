<script setup lang="ts">
import { useClipboard, useObjectUrl, useShare } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { uploadTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { prettyBytes, currentRoom, useGun, useUser } from '../composables';

const emit = defineEmits(['uploaded', 'url'])

const upload = ref()
const uploaded = ref()
const open = ref(false)
const showQr = ref(false)
const showFile = ref(false)
const dragover = ref(false)

function handleFileUpload(e: Event) {
  const files = (e.target as HTMLInputElement)?.files || (e as DragEvent)?.dataTransfer?.files;
  if (!files || files.length === 0) return;
  const { torrent } = uploadTorrent(files)

  const gun = useGun()
  const { user } = useUser()

  watch(torrent, async t => {
    upload.value = t
    open.value = true
    const data = {
      infoHash: t.infoHash,
      length: t.length,
      name: t.name,
      author: user.pub
    }
    emit('uploaded', data)
    emit('url', downloadUrl.value)
  })
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  dragover.value = true
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  dragover.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  dragover.value = false
  handleFileUpload(e)
}

const downloadUrl = computed(() => {
  if (!upload.value?.infoHash) return ''
  let url = new URL(window?.location?.href)
  url.hash = ''
  return `${url.href}#/files/${upload.value?.infoHash}`
})

const clip = useClipboard({ source: downloadUrl })

const { share, isSupported: shareSupported } = useShare()

</script>

<template lang='pug'>
.flex
  label.border-2.shadow-lg.p-4.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded-lg.cursor-pointer.items-center(v-if="!upload" for="file"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ 'bg-light-800': dragover }"
    )
    .i-la-paperclip.text-xl
    slot  
      .font-bold Drop your files here
    input#file(type="file" accept="*" @change="handleFileUpload($event)" style="display:none;")
  .animate-pulse.p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer.items-center.break-all.border-2.rounded-lg.shadow-lg(v-else @click="open = !open")
    .font-bold Sharing a file:
    .text-md.max-w-55ch {{ upload?.name }}
    .flex-1
    .p-0 {{ prettyBytes(upload?.length) }}
    .i-la-times(@click.prevent.stop="upload = null")
  ui-layer(:open="open" @close="open = false")
    .flex.flex-wrap.gap-2.p-4.items-start
      .flex.flex-col.gap-2(v-if="upload")
        .text-xl Sharing the torrent
        .font-mono.text-sm {{ upload?.infoHash }} 
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
          @click="share({ title: upload?.name, url: downloadUrl })"
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
        file-card.flex-auto(v-for="file in upload?.files" :key="file?.name" :file="file")
</template>