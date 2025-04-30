<script setup>
import { useUser, safeJSONParse, uploadText, SEA, parseLink, useQR, handleAuthFiles } from '../composables'
import { QrLoad } from '../components'
import { ref, watch } from 'vue'
import { extractFromFile } from "gun-avatar"
import { getPassKey } from './usePassKeys'
import derivePair from '@gun-vue/gun-es/derive'

const { processFile: processQr } = useQR()


const current = ref('pass')
const pair = ref()
const passphrase = ref(null)

const { auth } = useUser()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

watch(pair, async (p) => {
  if (!p) return

  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  if (p && typeof p == 'string' && p.substring(0, 3) == 'SEA') {
    passphrase.value = ''
  }

  let obj = safeJSONParse(p)
  if (obj?.pub && obj?.priv) {
    auth(obj)
    pair.value = null
  } else {
    console.log('No valid pair')
  }
})

async function decode(p = pair.value) {
  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  pair.value = await SEA.decrypt(p, passphrase.value);
}

async function uploadFile(event) {
  pair.value = await uploadText(event.target?.files)
}

async function uploadAvatar(event) {
  const file = event.target?.files?.[0]
  if (!file) return
  try {
    const data = await extractFromFile(file)
    if (data?.content) {
      pair.value = data.content
    }
  } catch (e) {
    console.error('Failed to extract data from avatar:', e)
  }
}

async function uploadQR(file) {
  pair.value = await processQr(file)
}



const over = ref(false)

const name = ref('')

async function passKeyLogin() {
  let id = await getPassKey()
  console.log(id)
  pair.value = await derivePair(JSON.stringify(id))
}


async function handleDrop(event) {
  pair.value = await handleAuthFiles(event.dataTransfer?.files)
}

if ('launchQueue' in window) {
  window.launchQueue.setConsumer(async launchParams => {
    const fileHandle = launchParams.files?.[0];
    if (fileHandle) {
      const file = await fileHandle.getFile()
      console.log('loading', file)
      pair.value = await handleAuthFiles([file])
    }
  });
}

</script>

<template lang="pug">
#dropzone.flex.flex-col.my-4.flex-1.items-center.bg-light-700.dark-bg-dark-50.rounded-3xl.p-4.shadow-lg.border-4.border-dark-100.dark-border-light-100.border-op-0.dark-border-op-0(
  @drop.prevent="handleDrop($event); over = false"
  @dragover.prevent="over = true"
  @dragleave.prevent="over = false"
  :class="{ 'border-op-100 dark-border-op-100': over }"
)
  .font-bold.text-xl I already have an account
  .text-md Login with a saved key

  .flex.flex-wrap.justify-center.my-2.gap-2
    button.button.items-center(@click="passKeyLogin()")
      .i-la-fingerprint.text-2xl
      .px-2 PassKey
    button.button.cursor-pointer.flex.items-center(@click="show('key')" :class="{ active: current == 'key' }")
      .i-la-key.text-2xl
      .p-1.ml-1.font-bold Text
    label.button.cursor-pointer.flex.items-center(for="qr-input")
      .i-la-qrcode.text-2xl
      .p-1.ml-1.font-bold QR
    label.button.cursor-pointer.flex.items-center(for="json-input")
      .i-la-file-code.text-2xl
      .p-1.ml-1.font-bold Key
    label.button.cursor-pointer.flex.items-center(for="png-input")
      .i-la-user-circle.text-2xl
      .p-1.ml-1.font-bold PNG
    label.button.cursor-pointer.flex.items-center(for="svg-input")
      .i-la-user.text-2xl
      .p-1.ml-1.font-bold SVG

  form.flex(v-if="passphrase !== null")
    input.py-1.px-4.m-1.rounded-xl(
      v-model="passphrase" 
      autofocus 
      type="password"
      autocomplete="current-password" 
      placeholder="Enter the password"
      )
    button.button.text-2xl(
      type="submit" 
      @click="decode()"
      )
      .i-la-sign-in-alt.text-2xl
  .hidden
    qr-load(@loaded="pair = $event")
    input#qr-input(
      type="file",
      accept="image/*",
      @change="uploadQR($event.target.files[0])"
      )
    input#json-input(
      ref="file" 
      tabindex="-1" 
      type="file" 
      accept=".webkey,application/json" 
      @change="uploadFile($event)"
      )
    input#png-input(
      type="file" 
      accept="image/png" 
      @change="uploadAvatar($event)"
    )
    input#svg-input(
      type="file" 
      accept="image/svg+xml" 
      @change="uploadAvatar($event)"
    )

  .text-sm.opacity-50 Drag and drop your file here (PNG, JSON, or QR photo/screenshot)

  .flex.flex-wrap
    transition(name="fade" mode="out-in" appear)

      textarea.p-2.text-sm.flex-1.w-full.dark-bg-dark-200(
        v-if="current == 'key'" 
          key="text" 
          v-model="pair" 
          rows="6" 
          cols="40" 
          placeholder="Paste your key pair here or drag and drop a file"
          )
</template>

<style scoped>
:global(body.dragging) #dropzone {
  outline: 2px dashed currentColor;
  outline-offset: -8px;
  opacity: 0.8;
}
</style>