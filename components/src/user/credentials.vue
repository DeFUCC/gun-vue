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

const encPair = computed(() => {
  return pass?.safe?.enc
})

</script>

<template lang='pug'>
.flex.flex-col.items-stretch.pb-4(v-if="user.is && !user.safe?.saved") {{ pass.b32 }}
  slot
    .mt-4.mx-6 Please make sure to safely store your cryptographic keypair to be able to use it again later
  .flex.flex-col.mt-4
    user-passphrase
  .flex.flex-wrap.p-4.items-center(v-if="encPair")
    button.button.flex.items-center(v-if="canShare" @click="share({ title: 'Your key pair', text: encPair })" :class="{ active: current == 'pass' }")
      la-share
      .px-1 Share
    button.button.flex.items-center(v-if="canCopy" @click="copy(encPair)")
      la-copy
      transition(name="fade")
        .px-2(v-if="copied") Copied!
        .px-2(v-else) Copy
    button.button.flex.items-center(@click="show('key')")
      la-envelope-open-text
      .px-2 Text
    button.button.flex.items-center(@click="show('links')")
      la-link
      .px-2 Links
    button.button.flex.items-center(@click="show('qr')")
      la-qrcode
      .px-2 QR
    button.button.flex.items-center(@click="downloadText(encPair, 'text/txt', (user.name || 'account') + '.txt'); current = null")
      la-file-code
      .px-2 TXT
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      .flex.flex-col(v-if="current == 'links'")
        a.text-xl.text-bold(key="link" target="_blank" :href="pass.links.pass") Login with password
        a.text-xl.text-bold(key="link" target="_blank" :href="pass.links.pair") Login with keypair
      textarea.p-2.text-sm.flex-1(
        rows="6",
        v-if="current == 'key'",
        :value="encPair",
        key="text"
      )
      qr-show.max-w-600px(v-if="current == 'qr'" key="qr" :data="pass.links.pair")
  button.button.text-green-600.flex.items-center.justify-center(@click="user.db.get('safe').get('saved').put(true)" v-if="!user?.safe?.saved")
    la-lock
    .px-2 OK, I have my key now
</template>

<style scoped>
</style>