<script setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'

import derivePair from '@gun-vue/gun-es/derive'
import { entropyToMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { onStartTyping, useFocus } from '@vueuse/core'

import { SEA, useQR } from '../composables'

import { handleAuthFile, parseKey } from './useAuth'
import { createPassKey, passKeyLogin } from './useWebAuthn'

const emit = defineEmits(['auth'])

const key = ref()
const passphrase = ref(null)
const showKey = ref(false)
const dragOver = ref(false)
const create = ref(false)
const name = ref('')
const stored = ref(false)

const entropy = ref(crypto.getRandomValues(new Uint8Array(20)))

const mnemonic = computed(() => entropyToMnemonic(entropy.value, wordlist))

const input = ref(null)
const { focused } = useFocus(input)
onStartTyping(() => { input.value.focus() })

watch(name, n => { if (n.length == 0) create.value = false })

watch(showKey, s => { if (s) entropy.value = crypto.getRandomValues(new Uint8Array(20)) })

watch(key, async p => {
  const pair = await parseKey(p)
  if (pair === '') { passphrase.value = '' }
  if (pair && pair.pub && pair.priv) {
    emit('auth', { pair, name: name.value })
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

  button.select-none.flex-1.button.items-center(@click="createAccount()" v-if="!create") 
    .i-la-plus.text-4xl
    .px-2 New account
  .flex.relative(v-else)
    input.p-4.rounded-2xl.text-xl.w-full.dark-bg-dark-700.outline(
      v-model="name" 
      ref="input"
      autofocus
      placeholder="Your Name"
      autocomplete="username" 
      )
    button.absolute.top-4.right-4.op-60.hover-op-100.transition(@click="name = ''" v-if="name")
      .i-la-times.text-2xl


  button.select-none.flex-1.button.items-center(@click="handlePassKey()" :disabled="create && !name")
    .i-la-fingerprint.text-4xl
    .px-2(v-if="!create") Use PassKey
    .px-2(v-else) New PassKey

  button.select-none.flex-1.button.cursor-pointer.flex.items-center(@click="showKey = !showKey" :class="{ active: showKey }" :disabled="create && !name")
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
      form.flex.flex-col.gap-2(v-if="passphrase !== null")
        input.p-4.rounded-xl.text-xl.text-center(
          v-model="passphrase" 
          autofocus 
          type="password"
          autocomplete="current-password" 
          placeholder="Enter the password"
          )
        button.button(
          type="submit" 
          @click="handlePassphrase(key)"
          )
          .i-la-check.text-4xl
          .px-2 Authenticate
</template>

<style scoped>
:global(body.dragging) #dropzone {
  outline: 2px dashed currentColor;
  outline-offset: -8px;
  opacity: 0.8;
}
</style>