<script setup>
import { useAccount, safeJSONParse, downloadUserPair } from '@composables'

const current = ref('pass')
const pair = ref()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

watch(pair, (p) => {
  let obj = safeJSONParse(p)
  if (obj.pub && obj.priv) {
    account.auth(obj)
  } else {
    console.log('No valid pair')
  }
})

const account = useAccount()

</script>

<template lang='pug'>
.flex.flex-col(v-if="!account.is")
  .flex.flex-wrap.p-2.items-center(v-if="!account.is")
    button(@click="show('pass')" :class="{ active: current == 'pass' }")
      la-asterisk
    button(@click="show('key')")
      la-key
    button(@click="show('qr')")
      la-qrcode
    button(@click="downloadUserPair(); current = null")
      la-file-code
  .flex.flex-wrap
    textarea.p-2.text-sm.flex-1(
      rows="6",
      cols="20"
      v-if="current == 'key'",
      v-model="pair",
      key="text"
      )
    button.button(@click="account.auth()" v-if="!account.is") Auth
</template>