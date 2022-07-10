<script setup>
import qrcode from "@qrcode/svg";
import { computed } from 'vue'

const props = defineProps({
  data: String,
  size: { type: Number, default: 400 },
  margin: { type: Number, default: 4 }
});

const src = computed(() => {
  if (!props.data) return;
  return qrcode(props.data, {
    size: props.size,
    margin: props.margin,
  });
});
</script>

<template lang='pug'>
.min-w-16.flex.flex-col.items-center(v-html="src")
</template>