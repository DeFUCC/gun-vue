<script setup>
import { useClipboard, useObjectUrl, useShare } from '@vueuse/core';
import { ref, watch, computed, onMounted } from 'vue';
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

const storageInitialized = ref(false)
let opfsRoot = null

async function initStorage() {
  try {
    opfsRoot = await navigator.storage.getDirectory()
    storageInitialized.value = true
  } catch (e) {
    console.error('OPFS not available:', e)
  }
}

async function saveToOPFS(file) {
  if (!opfsRoot) return null
  try {
    const fileHandle = await opfsRoot.getFileHandle(file.name, { create: true })
    const writable = await fileHandle.createWritable()
    await writable.write(file)
    await writable.close()
    return file.name
  } catch (e) {
    console.error('Error saving to OPFS:', e)
    return null
  }
}

async function loadFromOPFS(filename) {
  if (!opfsRoot) return null
  try {
    const fileHandle = await opfsRoot.getFileHandle(filename)
    const file = await fileHandle.getFile()
    return file
  } catch (e) {
    console.error('Error loading from OPFS:', e)
    return null
  }
}

async function handleFileUpload(e) {
  const files = e.target?.files || e?.dataTransfer?.files;
  if (!files || files.length === 0) return;

  for (const file of files) {
    const savedName = await saveToOPFS(file)
    if (savedName) {
      const loadedFile = await loadFromOPFS(savedName)
      if (loadedFile) {
        const { torrent } = uploadTorrent([loadedFile])
        const gun = useGun()
        const { user } = useUser()

        watch(torrent, async t => {
          upload.value = t
          open.value = true
          const data = {
            infoHash: t.infoHash,
            length: t.length,
            name: t.name,
            author: user.pub,
            storedName: savedName
          }
          emit('uploaded', data)
          emit('url', downloadUrl.value)
        })
      }
    }
  }
}

onMounted(async () => {
  await initStorage()
  if (opfsRoot) {
    for await (const [name, handle] of opfsRoot.entries()) {
      const file = await loadFromOPFS(name)
      if (file) {
        const { torrent } = uploadTorrent([file])
        watch(torrent, t => {
          upload.value = t
        })
      }
    }
  }
})

function handleDragOver(e) {
  e.preventDefault()
  dragover.value = true
}

function handleDragLeave(e) {
  e.preventDefault()
  dragover.value = false
}

function handleDrop(e) {
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
  label.border-2.shadow-lg.p-4.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded-lg.cursor-pointer.items-center(
    v-if="!upload && storageInitialized" 
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ 'bg-light-800': dragover }"
    )
    .i-la-paperclip.text-xl
    slot  
      .font-bold Drop your files here
    input#file(type="file" accept="*" @change="handleFileUpload($event)" style="display:none;")
  .text-sm.text-red-500(v-if="!storageInitialized") Storage initialization failed
  .animate-pulse.p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer.items-center.break-all.border-2.rounded-lg.shadow-lg(v-else @click="open = !open")
    .font-bold Sharing a file:
    .text-md.max-w-55ch {{ upload?.name }}
    .flex-1
    .p-0 {{ prettyBytes(upload?.length || 0) }}
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