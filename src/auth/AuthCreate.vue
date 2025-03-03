<script setup lang="ts">
import { useUser, SEA, useColor, updateProfile } from '#composables'
import { AccountAvatar } from '../components'
import { useRefHistory } from '@vueuse/core'
import { ref, nextTick } from 'vue'

const colorDeep = useColor('deep')
const colorLight = useColor('light')

const { user, auth } = useUser()

const name = ref('')

const newPair = ref(null)
const { history, undo, redo } = useRefHistory(newPair)

async function generatePair() {
  newPair.value = await SEA.pair()
}

generatePair()

function createUser() {
  auth(newPair.value, () => nextTick(() => {
    updateProfile('name', name.value)
  }))
}

const emit = defineEmits(['back'])

</script>

<template lang="pug">
.flex.flex-col.items-center.flex-1.p-2.bg-light-700.dark-bg-dark-200.rounded-3xl.shadow-lg.text-center.p-4.transition.duration-300ms.ease-in(
  v-if="!user.is" 
  :style="{ backgroundColor: colorDeep.hex(newPair?.pub || '') }"
  )
  .text-xl.font-bold Create a new account
  .mb-4.mt-2 Tap the circle to generate a new key
  account-avatar.cursor-pointer.rounded-full.shadow-xl.border-8(
    v-if="newPair" 
    :pub="newPair.pub" 
    :size="200" 
    :style="{ borderColor: colorDeep.hex(newPair.pub) }" 
    @click="generatePair()"
    )
  form.flex.flex-col(@submit.prevent="createUser()")
    .flex.justify-center.my-4
      button.m-2.button.items-center(
        type="button"

        @click.stop=" history.length > 2 ? undo() : $emit('back')"
        )
        .i-la-undo.text-2xl
      button.m-2.button.items-center(
        type="button"
        @click.stop="generatePair()")
        .i-fad-random-1dice.text-3xl
    input.p-4.rounded-2xl.my-2.dark-bg-dark-200(
      v-model="name" 
      placeholder="Enter your name or nickname"
      autocomplete="username" 
      )
    button.button.w-full.flex.justify-center.items-center(
      v-if="newPair && !user.is && name" 
      type="submit"
      ) Authenticate
</template>