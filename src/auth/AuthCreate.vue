<script setup lang="ts">
import { useRefHistory, onStartTyping, useFocus, asyncComputed } from '@vueuse/core'
import { ref, nextTick, reactive, onMounted, computed } from 'vue'
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import derivePair from '@gun-vue/gun-es/derive'

import { useUser, updateProfile, useGun, gunAvatar } from '#composables'

const { user } = useUser()

const name = ref('')
const entropy = ref(crypto.getRandomValues(new Uint8Array(20)))

const passKeys = reactive(new Set())

const { history, undo, canUndo, canRedo, redo } = useRefHistory(entropy)

const mnemonic = computed(() => bip39.entropyToMnemonic(entropy.value, wordlist))

const isPassKey = computed(() => passKeys.has(entropy.value))

const pair = asyncComputed(async () => await derivePair(btoa(String.fromCharCode(...entropy.value))), {}, { immediate: true })

async function updateEntropy() {
  entropy.value = crypto.getRandomValues(new Uint8Array(20))
}

function createUser() {
  const gun = useGun()
  gun.user().auth(pair.value, () => nextTick(async () => {
    let n = await gun.user(pair.value.pub).get('profile').get('name').once().then()
    if (!n) updateProfile('name', name.value || 'Noname')
  }))
}

const emit = defineEmits(['back'])

async function generatePK() {
  let key = await createPassKey(name.value)
  passKeys.add(key)

  entropy.value = key
}

const input = ref(null)
const { focused } = useFocus(input)

onStartTyping(() => { if (!input.value.active) input.value.focus() })

onMounted(() => { focused.value = true })

async function createPassKey(name) {
  if (!name) return

  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: 'Gun-Vue' },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name,
        displayName: name
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 }
      ],
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred'
      },
      attestation: 'none',
      timeout: 60000
    }
  });

  return new Uint8Array(await crypto.subtle.digest('SHA-256', credential.rawId)).slice(0, 20)

}

const toBase64 = u8 => btoa(String.fromCharCode(...u8));

const toUint8Array = b64 => new Uint8Array([...atob(b64)].map(c => c.charCodeAt(0)));




</script>

<template lang="pug">
form.flex.flex-col.items-center.flex-1.bg-light-700.dark-bg-dark-200.rounded-3xl.shadow-lg.text-center.py-4.transition.duration-300ms.ease-in.relative(
  v-if="!user.is" 
  @submit.prevent="name && createUser()"
  )
  button.button.absolute.top-0.left-0(@click="$emit('back')")
    .i-la-angle-left
  .h-240px.w-240px.rounded-full.shadow-xl.flex.items-center.justify-center 
    object(
      :data="gunAvatar({ pub: pair.pub, size: 220, svg: 'interactive' })"
      v-if="pair" 
      )

  .flex.flex-col.gap-4.p-4.max-w-70vw()
    input.p-4.rounded-2xl.text-center.text-xl.font-bol.max-w-full(
      v-model="name" 
      ref="input"
      autofocus
      placeholder="Your Name"
      autocomplete="username" 
      )

    .flex.flex-wrap.justify-center.gap-2
      button.gap-2.button.items-center(
        type="button"
        :disabled="!canUndo"
        @click.stop="undo()"
        )
        .i-la-undo.text-2xl

      button.gap-2.button.items-center(
        type="button"
        @click.stop="updateEntropy()")
        .i-la-redo-alt.text-2xl
      button.gap-2.button.items-center(
        title="Requires name to create a new credential"
        type="button"
        :disabled="!name"
        @click.stop="generatePK()"
        :class="{ [isPassKey ? 'bg-green! dark-bg-green-800!' : '']: true }"
        )
        .i-la-fingerprint.text-2xl
      button.gap-2.button.items-center(
        type="button"
        :disabled="!canRedo"
        @click.stop="redo()"
        )
        .i-la-redo.text-2xl

    .p-4.rounded-xl.max-w-100.font-mono.bg-light-900.dark-bg-dark-700.border-2(:class="{ [isPassKey ? 'border-green!' : 'border-red']: true }")

      p.blur-lg.hover-blur-0.transition-500.select-all {{ mnemonic }} 


    .max-w-100.text-12px.font-mono.text-green-700(v-if="isPassKey") This passphrase comes from your PassKey and can be accessed from another device with the same credentials provider. You can recover this seed phrase from your credentials ID later. But best practice is to write it down somewhere just in case of possible provider failures. Even if the seed phrase gets destroyed a derived key pair may be securely stored and used as well.

    .max-w-100.text-12px.font-mono.text-red(v-else) Random seed phrases are not stored after use for key derivation. Store it privately to derive this key pair on other devices. If you ever lose your seed phrase you can still store your derived key pair and use it as purely random one.



    button.button.w-full.flex.justify-center.items-center(
      v-if="pair" 
      :disabled="!name"
      type="submit"
      ) Authenticate
</template>