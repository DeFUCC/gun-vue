<script setup>
import { useAccount, safeJSONParse, useFileUpload, uploadText } from '@composables'

const current = ref('pass')
const pair = ref()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { state, handleFile } = useFileUpload()

watch(() => state.output, output => pair.value = output)

watch(pair, (p) => {
  let obj = safeJSONParse(p)
  if (obj.pub && obj.priv) {
    auth(obj)
    pair.value = ''
  } else {
    console.log('No valid pair')
  }
})

const { account, auth } = useAccount()

</script>

<template lang='pug'>
.flex.flex-col(v-if="!account.is")
  .flex.flex-wrap.p-2.items-center(v-if="!account.is")
    .p-2 Authenticate with your saved key
    button.m-1.p-2.shadow-lg.rounded-full.cursor-pointer(@click="show('key')")
      la-key
    label.m-1.p-2.shadow-lg.rounded-full.cursor-pointer(for="qr-input")
      la-qrcode
    label.m-1.p-2.shadow-lg.rounded-full.cursor-pointer(for="json-input")
      la-file-code
  .hidden
    qr-load(
      @loaded="pair = $event"
    )
    input#json-input(
      tabindex="-1"
      type="file",
      accept="application/json",
      ref="file"
      @change="uploadText($event, file => pair = file)"
    )
  .flex.flex-wrap
    transition(name="fade")
      textarea.p-2.text-sm.flex-1(
        rows="6",
        cols="20"
        v-if="current == 'key'",
        v-model="pair",
        key="text"
        placeholder="Paste your crypto pair here"
        )

  button.button(@click="auth()" v-if="!account.is") Auth
</template>