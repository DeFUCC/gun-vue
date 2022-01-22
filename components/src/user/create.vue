<script setup>
import { useUser, SEA, useColor } from '@composables'
import { useRefHistory } from '@vueuse/core'
import { ref } from 'vue'

const colorDeep = useColor('deep')

const { user, auth } = useUser()

const newPair = ref(null)
const { history, undo, redo } = useRefHistory(newPair)

async function generatePair() {
  newPair.value = await SEA.pair()
}

generatePair()

</script>

<template lang='pug'>
.flex.flex-col.items-center.flex-1.p-4.bg-light-700.rounded-3xl.shadow-lg.text-center(v-if="!user.is")
  .text-xl.font-bold Create a new account
  .mb-4.mt-2 Tap the circle to generate a new key
  account-avatar.cursor-pointer.shadow-xl(v-if="newPair" :pub="newPair.pub" :size="200" @click="generatePair()")
  .flex.flex-col
    .flex.justify-center.mb-4
      button.m-2.button.items-center(v-if="history.length > 2" @click="undo()") 
        la-undo.text-2xl
      button.m-2.button.items-center(@click="generatePair()") 
        fad-random-1dice.text-3xl
    button.button.w-full.flex.justify-center.items-center(@click="auth(newPair)" v-if="newPair && !user.is" :style="{ backgroundColor: colorDeep.hex(newPair.pub) }") Authenticate
</template> 