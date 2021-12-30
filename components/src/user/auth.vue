<script setup>
import { useUser, safeJSONParse, useFileUpload, uploadText, SEA, color } from '@composables'
import { useRefHistory } from '@vueuse/core'

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

const { user, auth } = useUser()

const newPair = ref(null)
const { history, undo, redo } = useRefHistory(newPair)

async function generatePair() {
  newPair.value = await SEA.pair()
}

generatePair()

</script>

<template lang='pug'>
.flex.flex-col.bg-light-200.p-4(v-if="!user.is")
  .flex.flex-col.my-4.flex-1.items-center.bg-light-700.rounded-3xl.p-4.shadow-lg
    .font-bold.text-xl I already have an account
    .text-md Login with a saved key
    .flex
      button.button.cursor-pointer.flex.items-center(@click="show('key')")
        la-key.text-xl
        .p-1.ml-1.font-bold Paste
      label.button.cursor-pointer.flex.items-center(for="qr-input")
        la-qrcode.text-xl
        .p-1.ml-1.font-bold QR
      label.button.cursor-pointer.flex.items-center(for="json-input")
        la-file-code.text-xl
        .p-1.ml-1.font-bold JSON
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
        textarea.p-2.text-sm.flex-1.w-full(
          rows="6",
          cols="40"
          v-if="current == 'key'",
          v-model="pair",
          key="text"
          placeholder="Paste your key pair here"
          )
  .flex.justify-center.my-4 or
  .flex.flex-col.items-center.flex-1.p-4.bg-light-700.rounded-3xl.shadow-lg
    .text-xl.font-bold Create a new account
    .mb-4.mt-2  Generate a key pair
    account-avatar.cursor-pointer.shadow-xl(v-if="newPair" :pub="newPair.pub" :size="200" @click="generatePair()")
    .flex 
      button.button.items-center(v-if="history.length > 2" @click="undo()") 
        la-undo.text-2xl
      button.button.items-center(@click="generatePair()") 
        fad-random-1dice.text-3xl
    button.button.w-full.flex.justify-center(@click="auth(newPair)" v-if="newPair && !user.is" :style="{ backgroundColor: color.deep.hex(newPair.pub) }") Authenticate with the generated key 
</template> 