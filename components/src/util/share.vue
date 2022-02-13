<script setup>
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'
import { ref, computed } from 'vue'
const location = useBrowserLocation()

const open = ref(false)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

const address = computed(() => {
  return location.value.href + location.value.search
})
</script>

<template lang='pug'>
.flex
  button.button.p-4.transition.bg-light-800.shadow-lg.flex.items-center.justify-center(@click="open = !open")
    ion-share-outline
      slot
  ui-layer.text-center(:open="open" @close="open = false")
    qr-show(:data="address")
    .flex.flex-col.items-center.mb-4.-mt-8
      .text-md.mx-4.my-2.break-all.max-w-420px {{ address }}
      .flex.text-lg.mt-2
        button.button.text-lg.font-normal.items-center(v-if="canCopy")
          la-copy(@click="copy(address)")
          .ml-2(v-if="copied") Copied!
          .ml-2(v-else) Copy
        button.button.text-lg.font-normal.items-center(v-if="canShare")
          la-share(@click="share({ title: 'Look at this', text: 'A gun-vue page', url: address })")
          .ml-2 Send
</template>