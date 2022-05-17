<script setup>
import { useUser, SEA, useColor, updateProfile } from '@composables'
import { useRefHistory } from '@vueuse/core'
import { ref, nextTick } from 'vue'

const colorDeep = useColor('deep')
const colorLight = useColor('light')

const { user, auth, create } = useUser()

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

</script>

<template>
  <div
    class="flex flex-col items-center flex-1 p-2 bg-light-700 rounded-3xl shadow-lg text-center p-4 transition duration-300ms ease-in"
    v-if="!user.is"
    :style="{ backgroundColor: colorDeep.hex(newPair?.pub || '') }"
  >
    <div class="text-xl font-bold">Create a new account</div>
    <div class="mb-4 mt-2">Tap the circle to generate a new key</div>
    <account-avatar
      class="cursor-pointer shadow-xl border-8"
      v-if="newPair"
      :pub="newPair.pub"
      :size="200"
      @click="generatePair()"
      :style="{ borderColor: colorDeep.hex(newPair.pub) }"
    ></account-avatar>
    <div class="flex flex-col">
      <div class="flex justify-center my-4">
        <button class="m-2 button items-center" v-if="history.length > 2" @click="undo()">
          <la-undo class="text-2xl"></la-undo>
        </button>
        <button class="m-2 button items-center" @click="generatePair()">
          <fad-random-1dice class="text-3xl"></fad-random-1dice>
        </button>
      </div>
      <input class="p-4 rounded-2xl my-2" v-model="name" placeholder="Enter your name or nickname" />
      <button
        class="button w-full flex justify-center items-center"
        @click="createUser()"
        v-if="newPair && !user.is && name"
        :style="{ backgroundColor: colorLight.hex(newPair.pub) }"
      >Authenticate</button>
    </div>
  </div>
</template> 