<script setup>
import qrcode from "@qrcode/svg";
import { computed } from 'vue'

const props = defineProps({
  data: String,
});

const src = computed(() => {
  if (!props.data) return;
  return qrcode(props.data, {
    size: 400,
    margin: 4,
  });
});
</script>

<template lang='pug'>
.min-w-16.flex.flex-col.items-center(v-html="src")
</template>