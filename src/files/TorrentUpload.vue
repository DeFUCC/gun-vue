<script setup lang="ts">
import { useClipboard, useObjectUrl, useShare } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { uploadTorrent, downloadTorrent } from './useTorrent';
import { QrShow, FileCard } from '../components'
import { prettyBytes, currentRoom, useGun, useUser } from '../composables';

const emit = defineEmits(['uploaded'])

const upload = ref()
const uploaded = ref()

function uploadEvent(event) {
  const { torrent } = uploadTorrent(event?.target?.files)

  const gun = useGun()
  const { user } = useUser()
  watch(torrent, async t => {
    upload.value = t
    const data = {
      infoHash: t.infoHash,
      length: t.length,
      name: t.name,
      author: user.pub
    }
    gun.user(currentRoom.pub).get('files').get(`${data.infoHash}@${user.pub}`).put(data, null, {
      opt: { cert: currentRoom.features?.files }
    })
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
.flex.flex-col.gap-4.p-4
  label.p-2.flex.flex-wrap.gap-2.bg-light-100.dark-bg-dark-400.rounded.cursor-pointer
    .font-bold Share a file via torrent
    .flex-1
    input(
      type="file"
      accept="image/*"
      @change="uploadEvent($event)"
      )
  .flex.flex-wrap.gap-2
    .flex.flex-col.gap-2(v-if="upload")
      .text-xl Share the torrent
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
    qr-show(v-if="downloadUrl" :data="downloadUrl")
  file-card(v-for="file in upload?.files" :key="file?.name" :file="file")
</template>