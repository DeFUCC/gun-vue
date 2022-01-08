<script setup>
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'

const location = useBrowserLocation()

const open = ref(false)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()
</script>

<template lang='pug'>
.flex.flex-col.items-center
  qr-show.min-w-20em(:data="location.href")
  .text-sm {{ location.href }}
  .flex.text-lg  
    button.button.text-lg.font-normal.items-center(v-if="canCopy")
      la-copy(@click="copy(location.href)")
      .ml-2(v-if="copied") Copied!

    button.button.text-lg.font-normal.items-center(v-if="canShare")
      la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: location.href })")
</template>