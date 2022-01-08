<script setup>
import { useUser, SEA, color } from '@composables'
import { useRefHistory } from '@vueuse/core'

const { user, auth } = useUser()

const newPair = ref(null)
const { history, undo, redo } = useRefHistory(newPair)

async function generatePair() {
  newPair.value = await SEA.pair()
}

generatePair()

</script>

<template lang='pug'>
.flex.flex-col.items-center.flex-1.p-4.bg-light-700.rounded-3xl.shadow-lg(v-if="!user.is")
  .text-xl.font-bold Create a new account
  .mb-4.mt-2  Generate a key pair
  account-avatar.cursor-pointer.shadow-xl(v-if="newPair" :pub="newPair.pub" :size="200" @click="generatePair()")
  .flex.flex-col
    .flex.justify-center
      button.button.items-center(v-if="history.length > 2" @click="undo()") 
        la-undo.text-2xl
      button.button.items-center(@click="generatePair()") 
        fad-random-1dice.text-3xl
    button.button.w-full.flex.justify-center.items-center(@click="auth(newPair)" v-if="newPair && !user.is" :style="{ backgroundColor: color.deep.hex(newPair.pub) }") Authenticate
</template> 