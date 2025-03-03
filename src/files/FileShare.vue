<script setup>
import { useClipboard, useShare } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';
import { useTorrent } from './useTorrent';
import { QrShow, FileCard, UiLayer } from '../components'
import { niceBytes, activeFile } from '../composables';
import FileInfo from './FileInfo.vue';

const { files, initialized, upload, deleteFile, init, clearFiles, clearOPFS } = useTorrent()

const dragover = ref(false)

const emit = defineEmits(['uploaded', 'url', 'infoHash'])

onMounted(init)

async function handleFiles(e) {
  const inputFiles = e.target?.files || e?.dataTransfer?.files
  if (!inputFiles?.length) return
  const results = await upload(inputFiles)
  if (results.length) {
    activeFile.value = results[0]
    emit('uploaded', results[0])
    // showFiles.value = true

    let url = new URL(window?.location?.href)
    url.hash = ''
    emit('infoHash', activeFile.value.info.infoHash)
    emit('url', downloadUrl.value)

  }
}

const downloadUrl = computed(() => {
  if (!activeFile.value?.info?.infoHash) return ''
  let url = new URL(window?.location?.href)
  url.hash = ''
  return `${url.href}#/files/${activeFile.value.info.infoHash}`
})

</script>

<template lang='pug'>
.flex.gap-2
  label.button(
    :class="{ 'bg-light-800': dragover }"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="handleFiles($event); dragover = false"
  )
    .i-la-paperclip.text-xl
    input(type="file" accept="*" multiple @change="handleFiles" style="display:none")
</template>