<script setup>
import { useUser, downloadFile, usePass } from '@composables'
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const current = ref('pass')

const { user } = useUser()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { pass } = usePass()

import { useClipboard, useShare } from '@vueuse/core'


const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

const safePair = ref(true)

const encPair = computed(() => {
  return safePair.value ? pass?.safe?.enc : JSON.stringify(user.pair())
});

</script>

<template lang='pug'>
.flex.flex-col.items-stretch.pb-4.border-1.border-dark-100.border-opacity-10.max-w-120.mx-auto(v-if="user.is && !user.safe?.saved")
  slot
    .mt-4.mx-6 Please make sure to safely store your cryptographic keypair to be able to use it again later
  user-pass
  .flex.p-4.items-center.bg-dark-100.bg-opacity-20.mt-2.shadow-inset(v-if="encPair")
    .flex.flex-col.w-34.items-center(:style="{ color: safePair ? 'green' : 'red' }")
      button.m-2.button.text-2xl(@click="safePair = !safePair")
        la-lock(v-if="safePair")
        la-unlock(v-else)
      .text-sm {{ safePair ? 'Encrypted' : 'Plain Text' }}
      .text-m Key Pair
    .flex.flex-wrap
      button.m-2.button.items-center(v-if="canShare" @click="share({ title: 'Your key pair', text: encPair })" :class="{ active: current == 'pass' }")
        la-share
        .px-1 Share
      button.m-2.button.items-center(v-if="canCopy" @click="copy(encPair)")
        la-copy
        transition(name="fade")
          .px-2(v-if="copied") Copied!
          .px-2(v-else) Copy
      a.m-2.button.items-center(@click="show('links')" target="_blank" :href="safePair ? pass.links.pass : pass.links.pair" )
        la-link
        .px-2 Link
      button.m-2.button.items-center(@click="show('qr')")
        la-qrcode
        .px-2 QR
      button.m-2.button.items-center(@click="show('key')")
        la-envelope-open-text
        .px-2 Text
      button.m-2.button.items-center(@click="downloadFile(encPair, 'text/json', (user.name || 'account') + '.json', false); current = null")
        la-file-code
        .px-2 JSON
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      textarea.p-4.text-sm.flex-1.rounded-xl(
        rows="9",
        v-if="current == 'key'",
        :value="encPair",
        key="text"
      )
      qr-show.max-w-600px(v-if="current == 'qr'" key="qr" :data="safePair ? pass.links.pass : pass.links.pair")
  button.button.mx-8.justify-center(@click="$emit('close')")
    la-check
    .ml-2 I've stored my key securely
</template>

<style scoped>
</style>