<script setup>
import { useUser, SEA, createRoom, useBackground, enterRoom } from '#composables';
import { ref, computed } from 'vue'
import { useRefHistory } from '@vueuse/core'

const emit = defineEmits(['room'])

const { user } = useUser()

const newPair = ref(null)
const name = ref('')
const publish = ref(true)

const { history, undo, redo, canRedo, canUndo } = useRefHistory(newPair)

async function genPair() {
  newPair.value = await SEA.pair()
}

function reset() {
  newPair.value = null
  name.value = ''
  publish.value = true
}

function createIt() {
  createRoom({ pair: newPair.value, name: name.value, publish: publish.value });
  emit('room', newPair.value?.pub)
  reset()
}

const bg = computed(() => useBackground({ pub: newPair.value?.pub, size: 620 }))

</script>

<template lang="pug">
.flex.flex-col.gap-4.w-full.p-16.max-w-620px.h-full.transition.items-center(
  v-if="user.pub" 
  :key="newPair"
  )
  transition(name="fade" mode="out-in")
    .bg-cover.absolute.top-0.left-0.right-0.bottom-0.-z-1( :style="{ ...bg }")
  label(for="title") New room name
  input#title.text-center.p-2.rounded-xl.dark-bg-dark-200( d
    v-model="name" 
    type="text" 
    autofocus
    )
  .flex.gap-2
    button.button(
      v-if="canUndo"
      @click="undo()"
      )
      .i-la-undo
    button.button(
      v-if="canRedo" 
      @click="redo()" 
      )
      .i-la-redo
    button.button.flex-1(@click="genPair()" ) Generate a new room key


  transition(name="fade" mode="out-in" appear)
    .flex.gap-2(v-if="newPair && name" )
      button.button.flex-1(
        @click="createIt()" 
        ) Add room
      label.button.flex.items-center.gap-2(for="publish") Publish
        input#publish(type="checkbox" switch v-model="publish" )
</template>