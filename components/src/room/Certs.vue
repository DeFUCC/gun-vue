<script setup>
import { ref } from 'vue'
const props = defineProps({
  certs: { type: Object, default: {} }
})

const open = ref(false)
</script>

<template lang='pug'>
.flex.flex-wrap.text-sm.items-center Certificates:
  .p-2.font-bold(v-for="(cert, c) in certs" :key="c" :title="cert") {{ c }}
  la-copy(@click="open = !open")
  .text-xs(v-if="open") {{ certs }}
</template>