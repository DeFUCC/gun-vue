<script setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { extractFromFile } from "gun-avatar"
import derivePair from '@gun-vue/gun-es/derive'
import { validateMnemonic, mnemonicToEntropy, entropyToMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { onStartTyping, useFocus } from '@vueuse/core'

import { SEA, useQR } from '../composables'

import { createPassKey, passKeyLogin, } from './useAuth'

const emit = defineEmits(['auth'])

const key = ref()
const passphrase = ref(null)
const showKey = ref(false)
const dragOver = ref(false)
const create = ref(false)
const name = ref('')
const entropy = ref(crypto.getRandomValues(new Uint8Array(20)))
const mnemonic = computed(() => entropyToMnemonic(entropy.value, wordlist))
const stored = ref(false)

const input = ref(null)
const { focused } = useFocus(input)
onStartTyping(() => { input.value.focus() })

watch(name, n => {
  if (n.length == 0) create.value = false
})

watch(key, async p => {
  const pair = await handleKey(p)
  if (pair === '') { passphrase.value = '' }
  if (pair && pair.pub) {
    emit('auth', pair)
  }
})

onMounted(() => {
  if ('launchQueue' in window) {
    window.launchQueue.setConsumer(async launchParams => {
      const fileHandle = launchParams.files?.[0];
      if (fileHandle) {
        const file = await fileHandle.getFile()
        key.value = await handleAuthFile(file)
        showKey.value = true
      }
    });
  }
})

async function handleBIP39() {
  key.value = await derivePair(btoa(String.fromCharCode(...entropy.value)))
}

async function handlePassKey() {
  const ent = create.value ? await createPassKey(name.value) : await passKeyLogin()
  if (!ent) return
  key.value = await derivePair(ent)
}

async function handleDrop(event) {
  key.value = await handleAuthFile(event.dataTransfer?.files[0])
  showKey.value = true
}

async function handleUpload(event) {
  key.value = await handleAuthFile(event.target?.files[0])
  showKey.value = true
}

async function handlePassphrase(p) {
  key.value = await SEA.decrypt(p, passphrase.value)
}

async function handleKey(p) {
  if (!p) return false
  let auth_url = "#/auth/"
  if (typeof p == 'string' && p.includes(auth_url)) {
    p = decodeURIComponent(link.substring(link.indexOf(auth_url) + auth_url.length))
  }
  if (typeof p == 'string' && p.substring(0, 3) == 'SEA') {
    return ''
  }
  if (typeof p == 'string' && validateMnemonic(p.trim(), wordlist)) {
    const entropy = mnemonicToEntropy(p.trim(), wordlist)
    p = await derivePair(btoa(String.fromCharCode(...entropy)))
  }
  if (typeof p == 'string') {
    p = JSON.parse(p)
  }
  if (p?.pub && p?.priv) {
    return p
  } else {
    return null
  }
}

async function handleAuthFile(file, pair) {
  if (!file) return false
  const type = file.type.toLowerCase()
  let result = null
  try {
    if (type === 'application/json' || file.name.endsWith('.webkey')) {
      result = await uploadText(file)
    } else if (type === 'image/png' || type === 'image/svg+xml') {
      const data = await extractFromFile(file)
      if (data?.content) result = data.content
    } else if (type.startsWith('image/')) {
      const { processFile } = useQR()
      result = await processFile(file)
    }
  } catch (e) {
    console.error('Failed to extract auth data from file:', e)
  }

  return result
}

async function uploadText(file) {
  if (!file || file.size > 20_000_000) {
    console.error("File is missing or too big");
    return;
  }
  return await new Promise((res, rej) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => res(reader.result),
      onerror: rej
    });
    reader.readAsText(file);
  });
};

function createAccount() {
  create.value = true;
  nextTick(() => {
    focused.value = true
  })
}

</script>

<template lang="pug">
#dropzone.max-w-80.flex.flex-col.gap-4.flex-1.items-stretch.bg-light-700.dark-bg-dark-50.p-4.shadow-lg.border-4.border-dark-100.dark-border-light-100.border-op-0.dark-border-op-0(
  @drop.prevent="handleDrop($event); dragOver = false"
  @dragover.prevent="dragOver = true"
  @dragleave.prevent="dragOver = false"
  :class="{ 'border-op-100 dark-border-op-100': dragOver }"
)

  button.flex-1.button.items-center(@click="createAccount()" v-if="!create") 
    .i-la-plus.text-4xl
    .px-2 New account
  .flex.relative(v-else)
    input.p-4.rounded-2xl.text-xl.w-full(
      v-model="name" 
      ref="input"
      autofocus
      placeholder="Your Name"
      autocomplete="username" 
      )
    button.absolute.top-4.right-4.op-60.hover-op-100.transition(@click="name = ''" v-if="name")
      .i-la-times.text-2xl


  button.flex-1.button.items-center(@click="handlePassKey()" :disabled="create && !name")
    .i-la-fingerprint.text-4xl
    .px-2(v-if="!create") Use PassKey
    .px-2(v-else) New PassKey

  button.flex-1.button.cursor-pointer.flex.items-center(@click="showKey = !showKey" :class="{ active: showKey }")
    .i-la-key.text-4xl
    .p-1.ml-1.font-bold(v-if="!create") Use Key 
    .p-1.ml-1.font-bold(v-else) Generate Key 
  transition(name="fade" mode="out-in")
    .flex.flex-col.gap-2(v-if="showKey && create")
      .shadow.bg-light-100.dark-bg-dark-800.p-4.rounded-xl.border.hyphens-none.font-mono.text-center
        .blur-lg.hover-blur-0.transition.duration-800.select-all {{ mnemonic }}
      label.bg-light-100.dark-bg-dark-800.select-none.border-1.shadow.rounded-lg.p-4.flex.items-center.gap-4(for="secure")
        input#secure.scale-150(type="checkbox" v-model="stored")
        .text-sm.op-80 I've securely stored my seed phrase.
      button.button(@click="handleBIP39()" :disabled="!name || !stored") 
        .i-la-check.text-4xl
        .text-lg.px-2 Authenticate
      .text-red.text-xs(v-if="!name") Name must not be left empty

  transition(name="fade" mode="out-in")
    .flex.flex-col.gap-2(v-if="showKey && !create")
      input#file.bg-light-100.dark-bg-dark-800.border-1.p-4.shadow.rounded-xl(
        type="file",
        accept="image/*,.webkey,application/json,image/svg+xml"
        @input="handleUpload($event)"
        )
      textarea.p-2.text-sm.flex-1.w-full.dark-bg-dark-200(

        key="text" 
        v-model="key" 
        rows="6" 
        cols="40" 
        placeholder="Your seed phrase or your keypair"
        )
      .text-sm.opacity-50.p-2 Drag and drop your key file in this area
      form.flex(v-if="passphrase !== null")
        input.py-3.px-4.m-4.rounded-xl.text-xl.text-center(
          v-model="passphrase" 
          autofocus 
          type="password"
          autocomplete="current-password" 
          placeholder="Enter the password"
          )
        button.button.text-4xl(
          type="submit" 
          @click="handlePassphrase(key)"
          )
          .i-la-sign-in-alt.text-4xl
</template>

<style scoped>
:global(body.dragging) #dropzone {
  outline: 2px dashed currentColor;
  outline-offset: -8px;
  opacity: 0.8;
}
</style>