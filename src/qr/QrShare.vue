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
.flex
  button.button.p-4.transition.shadow-lg.flex.items-center.justify-center(@click="open = !open")
    .i-ion-share-outline
    slot
  ui-layer.text-center(
    :open="open" 
    @close="open = false")
    qr-show.max-w-full(:data="address")
    .flex.flex-col.items-center.mb-4
      .text-md.mx-4.my-2.break-all.max-w-420px {{ address }}
      .flex.text-lg.mt-2
        button.button.text-lg.font-normal.items-center(v-if="canCopy" @click="copy(address)")
          .i-la-copy
          .ml-2(v-if="copied") Copied!
          .ml-2(v-else) Copy
        button.button.text-lg.font-normal.items-center(v-if="canShare")
          .i-la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: address })")
          .ml-2 Send
</template>