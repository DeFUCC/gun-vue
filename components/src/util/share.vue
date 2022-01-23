<script setup>
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'
import { ref } from 'vue'
const location = useBrowserLocation()

const open = ref(false)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()
</script>

<template lang='pug'>
.flex
  button.button.p-4.transition.bg-light-800.shadow-lg.m-2.flex.items-center.justify-center(@click="open = !open")
    ion-share-outline
    slot
      .ml-2 Share 
  ui-layer.flex.flex-col.items-center.text-center(:open="open" @close="open = false")
    qr-show(:data="location.href")
    .flex.flex-col.items-center.mb-4.-mt-8
      .text-md.mx-4.my-2.break-all.max-w-420px {{ location.href }}
      .flex.text-lg.mt-2
        button.button.text-lg.font-normal.items-center(v-if="canCopy")
          la-copy(@click="copy(location.href)")
          .ml-2(v-if="copied") Copied!
          .ml-2(v-else) Copy
        button.button.text-lg.font-normal.items-center(v-if="canShare")
          la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: location.href })")
          .ml-2 Send
</template>