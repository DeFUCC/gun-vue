<script setup>
import { ref } from 'vue';
import QrLoad from './QrLoad.vue'
import QrShow from './QrShow.vue'
import SvgSave from './svg-save.vue';

const input = ref('Enter your text')
const output = ref()
</script>

<template lang='pug'>
.p-4.flex-col.flex.gap-4.max-w-45ch.overflow-x-hidden
  h2.text-xl QR Code Lab
  input.dark-bg-dark-600.p-2.rounded-lg(type="text" v-model="input")
  QrShow.w-full#QR(:data="input")
  SvgSave(svg="QR") Download SVG

  QrLoad(@loaded="output = $event")
  .p-2
    .text-lg Data:
    .p-4.font-mono.text-sm.bg-light-300.bg-opacity-20 {{ output }}
</template>