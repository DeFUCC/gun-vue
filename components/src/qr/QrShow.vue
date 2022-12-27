
<script setup>
import QRCode from '@qrcode/svg'
import { computedAsync } from '@vueuse/core'

const props = defineProps({
  data: { type: String, default: '' },
  size: { type: Number, default: 400 },
  margin: { type: Number, default: 4 }
});



const src = computedAsync(async () => {
  if (!props.data) return;

  return QRCode(props.data, {
    size: props.size,
    margin: props.margin,
  });
});
</script>
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.min-w-16.flex.flex-col.items-center(v-html="src")
</template>