<script setup>
import { user, downloadText, usePassphrase } from '@composables'
const current = ref('pass')

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { pass } = usePassphrase()

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
  .flex.flex-col.mt-4.bg-light-700.p-4.m-2.shadow-lg.rounded-xl
    .flex.items-center.mb-4
      .mx-2
        la-asterisk
      .px-1 Enter a passphrase to encrypt your key with
    .flex.items-center.px-4
      .ml-1.flex.flex-col.items-center

        la-check.text-green-600.m-1(v-if="pass.safe?.enc")
      input.p-2.mx-4.rounded-xl.w-full(
        v-model="pass.input",
        :type="pass.show ? 'text' : 'password'"
        :placeholder="`Your passphrase of ${pass.minLength} or more letters`"
      )
      button.button.items-center(
        @click="pass.set()",
        v-if="pass.input.length >= pass.minLength"
      ) 
        la-check
        .ml-2 Set
      button.button.items-center(v-if="pass?.safe?.enc" @click="pass.show = !pass.show")
        la-eye
        .ml-2 Show
  .flex.p-4.items-center(v-if="encPair")
    .flex.flex-col.w-34.items-center(:style="{ color: safePair ? 'green' : 'red' }")
      button.button.text-2xl(@click="safePair = !safePair")
        la-lock(v-if="safePair")
        la-unlock(v-else)
      .text-sm {{ safePair ? 'Encrypted' : 'Plain Text' }}
      .text-m Key Pair
    .flex.flex-wrap
      button.button.items-center(v-if="canShare" @click="share({ title: 'Your key pair', text: encPair })" :class="{ active: current == 'pass' }")
        la-share
        .px-1 Share
      button.button.items-center(v-if="canCopy" @click="copy(encPair)")
        la-copy
        transition(name="fade")
          .px-2(v-if="copied") Copied!
          .px-2(v-else) Copy
      a.button.items-center(@click="show('links')" target="_blank" :href="safePair ? pass.links.pass : pass.links.pair" )
        la-link
        .px-2 Link
      button.button.items-center(@click="show('qr')")
        la-qrcode
        .px-2 QR
      button.button.items-center(@click="show('key')")
        la-envelope-open-text
        .px-2 Text
      button.button.items-center(@click="downloadText(encPair, 'application/json', (user.name || 'account') + '.json'); current = null")
        la-file-code
        .px-2 JSON
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      textarea.p-2.text-sm.flex-1(
        rows="9",
        v-if="current == 'key'",
        :value="encPair",
        key="text"
      )
      qr-show.max-w-600px(v-if="current == 'qr'" key="qr" :data="safePair ? pass.links.pass : pass.links.pair")
</template>

<style scoped>
</style>