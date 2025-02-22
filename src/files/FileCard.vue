<script setup>
import { useObjectUrl } from '@vueuse/core';
import { ref, onMounted, computed } from 'vue';
import { prettyBytes } from '../composables';

const props = defineProps({
  file: {
    type: Object,
    default: null
  }
})

const blob = ref()

onMounted(async () => {
  blob.value = await props.file.blob()
})

const isImage = computed(() => props.file.type?.startsWith('image/'))
const isVideo = computed(() => props.file.type?.startsWith('video/'))

const img = useObjectUrl(blob)
</script>

<template lang='pug'>
.border-1.flex.flex-col.rounded.border-dark.dark-border-light

  img.max-h-80vh.m-auto(:src="img" v-if="isImage")
  video.w-full.max-h-90vh(:src="img" v-if="isVideo" controls)

  .flex.flex-wrap.gap-2.p-2.items-center
    .flex-1.font-bold {{ file.name }} 
    .text-sm {{ file.type }} 
    .font-mono {{ prettyBytes(file.length || 0) }}
    .text-green-400.flex.items-center.gap-2(v-if="file?.done") 
      .i-la-check
      .p-0 Downloaded
    a.flex-1a.p-1.bg-green-400.rounded-lg.shadow-lg(:href="img" :download="file?.name") Save 
</template>