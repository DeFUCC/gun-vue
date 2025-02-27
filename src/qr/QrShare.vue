<script setup lang="ts">
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'
import { ref, computed } from 'vue'
import { UiLayer, QrShow } from '../components'

const location = useBrowserLocation()

const open = ref(false)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()


const address = computed(() => {
  return location.value.href + location.value.search
})


</script>

<template lang="pug">
.flex.flex-col.bg-light-400.dark-bg-dark-400.gap-4.p-4
  qr-show.max-w-full(:data="address")
  .flex.flex-col.items-center
    input.w-full.text-md.break-all.max-w-420px.font-mono.op-70(v-model="address" disabled)
    .flex.text-lg.my-2.gap-2
      button.button.text-lg.font-normal.items-center(v-if="canCopy" @click="copy(address)")
        .i-la-copy
        .ml-2(v-if="copied") Copied!
        .ml-2(v-else) Copy
      button.button.text-lg.font-normal.items-center(v-if="canShare")
        .i-la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: address })")
        .ml-2 Send
</template>