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
.border-1.flex.flex-col.rounded
  img.w-full(:src="img")
  .flex.flex-wrap.gap-4.p-2
    .font-bold {{ file.name }} 
    .text-sm {{ file.type }} 
    .font-mono {{ prettyBytes(file.length) }}
</template>