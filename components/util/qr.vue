<script setup>
import qrcode from "@qrcode/svg";

const props = defineProps({
  data: String,
});

const src = computed(() => {
  if (!props.data) return;
  return qrcode(props.data, {
    margin: 4,
  });
});
</script>

<template lang='pug'>
.min-w-16.flex-1(v-html="src")
</template>