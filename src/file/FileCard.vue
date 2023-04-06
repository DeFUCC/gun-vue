<script setup>
import { useObjectUrl } from '@vueuse/core';
import { ref, onMounted } from 'vue';
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

const img = useObjectUrl(blob)
</script>

<template lang='pug'>
.p-2.border-1.gap-4.flex.flex-col
  .flex.flex-wrap.gap-4
    .font-bold {{ file.name }} 
    .text-sm {{ file.type }} 
    .font-mono {{ prettyBytes(file.length) }}
  img.w-full(:src="img")
</template>