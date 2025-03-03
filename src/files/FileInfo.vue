<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { niceBytes } from '../composables';


const props = defineProps({
  file: { type: Object, required: true }, default: () => ({}),
})

const emit = defineEmits(['close'])

const downloadUrl = computed(() => {
  if (!props.file?.info?.infoHash) return ''
  let url = new URL(window?.location?.href)
  url.hash = ''
  return `${url.href}#/files/${props.file?.info.infoHash}`
})

const clip = useClipboard({ source: downloadUrl })

const { share, isSupported: shareSupported } = useShare()

const showQr = ref(false)
const showFile = ref(false)
</script>

<template lang='pug'>
.flex.flex-wrap.gap-2.p-4.items-start.relative(v-if="file")
  .flex.flex-col.gap-2.w-full
    .text-xl {{ file.info.name }}
    .font-mono.text-xs.op-50 {{ file.info.infoHash }}

  button.absolute.top-4.right-4(@click="emit('close')")
    .i-la-times

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
    @click="share({ title: file.info?.name, url: downloadUrl })"
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
        v-for="file in file.torrent.files" 
        :key="file.name" 
        :file="file"
      )
</template>