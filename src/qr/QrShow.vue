<script setup>
import { computed } from 'vue';
import encodeQR from 'qr';

const props = defineProps({
  data: { type: String, default: '' },
  size: { type: Number, default: 280 },
  margin: { type: Number, default: 1 }
});

const qrSvg = computed(() => {
  if (!props.data) return '';

  return encodeQR(props.data, 'svg', {
    scale: 1,
    border: props.margin,
    ecc: 'quartile'
  });
});
</script>

<template lang="pug">
.min-w-16.flex.flex-col.items-center
  div.qr-container(v-if="qrSvg" v-html="qrSvg" )
</template>

<style scoped lang="postcss">
.qr-container :deep(svg) {
  @apply w-full bg-light-100;
  width: v-bind(size+'px');
}
</style>