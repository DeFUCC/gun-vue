<script setup lang="ts">
import { useClipboard, useObjectUrl, useShare } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { uploadTorrent, downloadTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { prettyBytes, currentRoom, useGun, useUser } from '../composables';

const emit = defineEmits(['uploaded'])

const upload = ref()
const uploaded = ref()
const open = ref(false)
const showQr = ref(false)
const showFile = ref(false)

function uploadEvent(event) {
  const { torrent } = uploadTorrent(event?.target?.files)

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

  })
}

const downloadUrl = computed(() => {
  if (!upload.value?.infoHash) return ''
  let url = new URL(window?.location?.href)
  return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}/#/files/${upload.value?.infoHash}`
})

const clip = useClipboard({ source: downloadUrl })

const { share, isSupported: shareSupported } = useShare()

</script>

<template lang='pug'>
.flex.flex-col.gap-4.p-4.break-all
  label.p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer.items-center(v-if="!upload")
    .font-bold Share a file
    input.max-w-30(
      type="file"
      accept="image/*"
      @change="uploadEvent($event)"
      )
  .p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer.items-center.break-all(v-else @click="open = !open")
    .font-bold Sharing a file:
    .text-md.max-w-55ch {{ upload?.name }}
    .flex-1.font-mono.text-xs.min-w-10 {{ upload?.infoHash }}
    .p-0 {{ prettyBytes(upload?.length) }}
    .i-la-times(@click.prevent.stop="upload = null")
  ui-layer(:open="open" @close="open = false")
    .flex.flex-wrap.gap-2.p-4.items-start
      .flex.flex-col.gap-2(v-if="upload")
        .text-xl Sharing the torrent
        .font-mono.text-sm {{ upload?.infoHash }} 
        a.gap-2.button.underline.font-bold.break-all(:href="downloadUrl" target="_blank") 
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