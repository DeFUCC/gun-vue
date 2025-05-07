<script setup>
import { ref, watch, onMounted } from 'vue'
import { extractFromFile } from "gun-avatar"
import derivePair from '@gun-vue/gun-es/derive'
import { validateMnemonic, mnemonicToEntropy } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english';

import { useGun, safeJSONParse, uploadText, SEA, useQR } from '../composables'

const key = ref()
const passphrase = ref(null)
const showKey = ref(false)
const dragOver = ref(false)

watch(key, async p => {
  const gun = useGun()
  const pair = await handleKey(p)
  if (pair == '') { passphrase.value = '' }
  if (pair && pair.pub) {
    gun.user().auth(pair)
  }
})

async function handleKey(p) {
  if (!p) return false
  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  if (p && typeof p == 'string' && p.substring(0, 3) == 'SEA') {
    return ''
  }
  if (p && typeof p == 'string' && validateMnemonic(p.trim(), wordlist)) {
    const entropy = mnemonicToEntropy(p.trim(), wordlist)
    p = await derivePair(btoa(String.fromCharCode(...entropy)))
  }
  let obj = safeJSONParse(p)
  if (obj?.pub && obj?.priv) {
    return obj
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
      result = await uploadText([file])
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

async function passKeyLogin() {
  const challenge = crypto.getRandomValues(new Uint8Array(32));

  const credential = await navigator.credentials.get({
    publicKey: {
      challenge,
      userVerification: 'preferred',
      timeout: 60000
    }
  })

  const challengeBase64url = btoa(String.fromCharCode(...challenge)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const clientDataJSON = JSON.parse(new TextDecoder().decode(credential.response.clientDataJSON))

  if (clientDataJSON.challenge !== challengeBase64url) {
    console.error('Wrong challenge received! Check your authentication provider security.', clientDataJSON.challenge, challengeBase64url)
    return false
  }

  const bits = new Uint8Array(await crypto.subtle.digest('SHA-256', credential.rawId)).slice(0, 20)

  return btoa(String.fromCharCode(...bits))

}

async function handlePassKey() {
  const entropy = await passKeyLogin()
  if (!entropy) return
  key.value = await derivePair(entropy)
}


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

async function handleDrop(event) {
  key.value = await handleAuthFile(event.dataTransfer?.files[0])
  showKey.value = true
}

async function handleUpload(event) {
  key.value = await handleAuthFile(event.target?.files[0])
  showKey.value = true
}

async function decode(p = key.value) {
  if (typeof p == 'string' && p.includes('#/auth/')) {
    p = parseLink(p)
  }
  key.value = await SEA.decrypt(p, passphrase.value);
}

function parseLink(link, auth_url = "#/auth/") {
  let index = link.indexOf(auth_url);
  let base = link.substring(index + auth_url.length);
  return decodeURIComponent(base);
}

</script>

<template lang="pug">
#dropzone.flex.flex-col.gap-4.flex-1.items-stretch.bg-light-700.dark-bg-dark-50.rounded-3xl.p-4.shadow-lg.border-4.border-dark-100.dark-border-light-100.border-op-0.dark-border-op-0(
  @drop.prevent="handleDrop($event); dragOver = false"
  @dragover.prevent="dragOver = true"
  @dragleave.prevent="dragOver = false"
  :class="{ 'border-op-100 dark-border-op-100': dragOver }"
)
  slot.text-md Login with a saved key
  button.flex-1.button.items-center(@click="handlePassKey()")
    .i-la-fingerprint.text-4xl
    .px-2 Login

  button.flex-1.button.cursor-pointer.flex.items-center(@click="showKey = !showKey" :class="{ active: showKey }")
    .i-la-key.text-4xl
    .p-1.ml-1.font-bold Key 

  transition(name="fade" mode="out-in")

    .flex.flex-col.gap-2(v-if="showKey")
      .text-sm.opacity-50.p-2 Drag and drop your key file here or choose it
      input#file(
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
          @click="decode()"
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