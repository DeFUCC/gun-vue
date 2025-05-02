<script setup lang="ts">
import { useRefHistory, onStartTyping, useFocus, asyncComputed } from '@vueuse/core'
import { ref, nextTick, reactive, onMounted, computed } from 'vue'
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import derivePair from '@gun-vue/gun-es/derive'

import { useUser, updateProfile, useGun, gunAvatar } from '#composables'

const { user, auth } = useUser()

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
  auth(pair.value, () => nextTick(async () => {
    let n = await useGun().user(pair.value.pub).get('profile').get('name').once().then()
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
  .h-300px.w-300px.border-8.rounded-full.shadow-xl
    object(
      :data="gunAvatar({ pub: pair.pub, size: 280, svg: 'interactive' })"
      v-if="pair" 
      )

  .flex.flex-col.gap-4.p-4()
    input.p-4.rounded-2xl.text-center.text-xl.font-bold(
      v-model="name" 
      ref="input"
      autofocus
      placeholder="Enter your name or nickname"
      autocomplete="username" 
      )

    .flex.flex-wrap.justify-center.gap-2
      button.gap-2.button.items-center(
        type="button"
        v-if="canUndo"
        @click.stop="undo()"
        )
        .i-la-undo.text-2xl
      button.gap-2.button.items-center(
        type="button"
        v-if="canRedo"
        @click.stop="redo()"
        )
        .i-la-redo.text-2xl
      button.gap-2.button.items-center(
        type="button"
        @click.stop="updateEntropy()")
        .i-la-dice.text-2xl
        .text-sm Randomize
      button.gap-2.button.items-center(
        type="button"
        :disabled="!name"
        @click.stop="generatePK()"
        :class="{ [isPassKey ? 'bg-green! dark-bg-green-800!' : '']: true }"
        )
        .i-la-fingerprint.text-2xl
        .text-sm PassKey

    .p-4.rounded-xl.max-w-100.font-mono(:class="{ [isPassKey ? 'bg-green! dark-bg-green-800!' : 'bg-red']: true }")
      p.blur-lg.hover-blur-0.transition-500.select-all {{ mnemonic }} 
    .max-w-100.text-xs.font-mono(:class="{ [isPassKey ? 'text-green-700' : 'text-red']: true }") {{ isPassKey ? 'Key is generated from a PassKey and can be open elsewhere with the same credentials. You can recover your seed phrase from it later.' : 'Key is generated randomly. Store the seed phrase securely or you will never be able to recover it again. Store your derived key pair securely.' }}

    button.button.w-full.flex.justify-center.items-center(
      v-if="pair" 
      :disabled="!name"
      type="submit"
      ) Authenticate
</template>