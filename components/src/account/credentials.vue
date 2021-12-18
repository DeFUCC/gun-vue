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

</script>

<template lang='pug'>
.flex.flex-col.items-stretch(v-if="account.is")
  .flex.flex-wrap.p-2.items-center
    button.button(@click="show('pass')" :class="{ active: current == 'pass' }")
      la-asterisk
    button.button(@click="show('key')")
      la-key
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