<script setup>
import { useUser, safeJSONParse, uploadText, SEA, parseLink, useQR } from '../composables'
import { QrLoad } from '../components'
import { ref, watch } from 'vue'
import { extractFromFile } from "gun-avatar"

const { processFile } = useQR()


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

function uploadFile(event) {
  uploadText(event.target?.files, (file) => pair.value = file)
}

async function uploadPNG(event) {
  const file = event.target?.files?.[0]
  if (!file) return
  try {
    const data = await extractFromFile(file)
    if (data?.content) {
      pair.value = data.content
    }
  } catch (e) {
    console.error('Failed to extract data from PNG:', e)
  }
}

function uploadQR(file) {
  processFile(file, (data) => pair.value = data)
}

// File handling functions
async function handleFiles(files) {
  const file = files[0]
  if (!file) return

  const type = file.type.toLowerCase()
  if (type === 'application/json') {
    uploadText([file], (text) => pair.value = text)
  } else if (type === 'image/png') {
    try {
      const data = await extractFromFile(file)
      if (data?.content) pair.value = data.content
    } catch (e) {
      console.error('Failed to extract data from PNG:', e)
    }
  } else if (type.startsWith('image/')) {
    uploadQR(file)
  }
}

// Drop zone handlers
function onDrop(e) {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (files?.length) handleFiles(files)
  removeDragClass()
}

function onDragOver(e) {
  e.preventDefault()
  addDragClass()
}

function onDragLeave(e) {
  e.preventDefault()
  removeDragClass()
}

function addDragClass() {
  document.body.classList.add('dragging')
}

function removeDragClass() {
  document.body.classList.remove('dragging')
}

</script>

<template lang="pug">
#dropzone.flex.flex-col.my-4.flex-1.items-center.bg-light-700.dark-bg-dark-50.rounded-3xl.p-4.shadow-lg(
  @drop="onDrop"
  @dragover="onDragOver"
  @dragleave="onDragLeave"
)
  .font-bold.text-xl I already have an account
  .text-md Login with a saved key
  .text-sm.opacity-50.my-2 Drag and drop your key file here (PNG, JSON, or QR image)
  .flex.flex-wrap.justify-center
    button.button.m-2.cursor-pointer.flex.items-center(@click="show('key')")
      .i-la-key.text-xl
      .p-1.ml-1.font-bold Paste
    label.button.m-2.cursor-pointer.flex.items-center(for="qr-input")
      .i-la-qrcode.text-xl
      .p-1.ml-1.font-bold QR
    label.button.m-2.cursor-pointer.flex.items-center(for="json-input")
      .i-la-file-code.text-xl
      .p-1.ml-1.font-bold JSON
    label.button.m-2.cursor-pointer.flex.items-center(for="png-input")
      .i-la-user-circle.text-xl
      .p-1.ml-1.font-bold PNG
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
      .i-la-sign-in-alt
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
      accept="application/json" 
      @change="uploadFile($event)"
      )
    input#png-input(
      type="file" 
      accept="image/png" 
      @change="uploadPNG($event)"
    )
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