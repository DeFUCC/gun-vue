<script setup>
const props = defineProps({
  certs: { type: Object, default: {} }
})
</script>

<template lang='pug'>
.flex.flex-wrap.text-sm.items-center Certificates:
  .p-2.font-bold(v-for="(cert, c) in certs" :key="c" :title="cert") {{ c }}
</template>