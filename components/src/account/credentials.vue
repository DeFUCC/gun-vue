<script setup>
import { account, downloadJSON } from '@composables'
const current = ref('pass')

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
.flex.flex-col.items-stretch(v-if="account.is")
  .flex.flex-wrap.p-2.items-center
    button.button(v-if="canShare" @click="share({ title: 'Your key pair', text: JSON.stringify(account.user._.sea) })" :class="{ active: current == 'pass' }")
      la-share
    button.button.flex(v-if="canCopy" @click="copy(JSON.stringify(account.user._.sea))")
      la-copy
      transition(name="fade")
        .absolute.bg-light-200.p-4.rounded-xl(v-if="copied") Copied!
    button.button(@click="show('key')")
      la-envelope-open-text
    button.button(@click="show('qr')")
      la-qrcode
    button.button(@click="downloadJSON(account.user._.sea); current = null")
      la-file-code
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