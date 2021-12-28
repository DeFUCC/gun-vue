<script setup>
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'

const location = useBrowserLocation()

const open = ref(false)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()
</script>

<template lang='pug'>
.mx-2.text-xl.cursor-pointer(@click="open = true")
  ic-twotone-ios-share
transition(name="fade")
  .fixed.w-full.h-full.flex.items-center.justify-center.z-10.top-0(v-if="open")
    .bg-dark-100.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer(@click="open = false")
    .bg-light-100.w-90.rounded-4xl.p-4.flex.flex-col.items-center.z-4.text-center.break-all.relative.shadow-2xl
      button.button.absolute.right-2.top-2(@click="open = false")
        la-times
      qr-show.min-w-20em(:data="location.href")
      .text-sm {{ location.href }}
      .flex.text-lg  
        button.button.text-lg.font-normal.items-center(v-if="canCopy")
          la-copy(@click="copy(location.href)")
          .ml-2(v-if="copied") Copied!
        button.button.text-lg.font-normal.items-center(v-if="canShare")
          la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: location.href })")
</template>