<script setup>
import { useAccount, downloadJSON } from '@composables'
const current = ref('pass')

const { account, updateProfile } = useAccount()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

import { useClipboard, useShare } from '@vueuse/core'


const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

</script>

<template lang='pug'>
.flex.flex-col.items-stretch(v-if="account.is && !account.safe?.saved")
  slot
    .mt-4.mx-6 Please make sure to safely store your cryptographic keypair to be able to use it again later
  .flex.flex-wrap.p-4.items-center
    button.button.flex.items-center(v-if="canShare" @click="share({ title: 'Your key pair', text: JSON.stringify(account.user._.sea) })" :class="{ active: current == 'pass' }")
      la-share
      .px-1 Share
    button.button.flex.items-center(v-if="canCopy" @click="copy(JSON.stringify(account.user._.sea))")
      la-copy
      transition(name="fade")
        .px-2(v-if="copied") Copied!
        .px-2(v-else) Copy
    button.button.flex.items-center(@click="show('key')")
      la-envelope-open-text
      .px-2 Text
    button.button.flex.items-center(@click="show('qr')")
      la-qrcode
      .px-2 QR code
    button.button.flex.items-center(@click="downloadJSON(account.user._.sea); current = null")
      la-file-code
      .px-2 JSON file
    button.button.text-green-600.flex.items-center(@click="account.user.get('safe').get('saved').put(true)" v-if="!account?.safe?.saved")
      la-lock
      .px-2 My key pair is stored safely 
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      account-password.flex-1(key="pass", v-if="current == 'pass'")
      textarea.p-2.text-sm.flex-1(
        rows="6",
        v-if="current == 'key'",
        :value="JSON.stringify(account.user._.sea)",
        key="text"
      )
      qr-show.max-w-600px(v-if="current == 'qr'" key="qr" :data="JSON.stringify(account.user._.sea)")
</template>

<style scoped>
</style>