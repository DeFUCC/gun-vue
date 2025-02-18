<script setup>
import { useUser, SEA, createRoom, useBackground, enterRoom } from '#composables';
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['room'])

const { user } = useUser()

const create = reactive({
  pair: null,
  name: '',
  publish: true,
})

async function genPair() {
  let pair = await SEA.pair()
  create.pair = pair
}

function reset() {
  create.pair = null
  create.name = ''
  create.publish = true
}

function createIt() {
  createRoom(create);
  emit('room', create?.pair?.pub)
  reset()
}

const bg = computed(() => useBackground({ pub: create.pair?.pub, size: 620 }))

</script>

<template lang="pug">
.flex.flex-col.gap-4.bg-cover.rounded-2xl.p-8.max-w-620px.bg-light-800.dark-bg-dark-500.justify-center(
  v-if="user.pub" 
  :style="{ ...bg }"
  )
  .flex.gap-2
    button.button.flex-1(@click="genPair()" ) Generate a new room
    button.button(
      v-if="create.pair" 
      @click="reset()" 
      ) Reset

  input.p-2.rounded-xl.dark-bg-dark-200(
    v-if="create.pair" 
    v-model="create.name" 
    type="text" 
    placeholder="New room name"
    )
  transition(name="fade")
    .flex.gap-2(v-if="create.pair && create.name" )
      button.button.flex-1(
        @click="createIt()" 
        ) Add room
      label.button.flex.items-center.gap-2(for="publish") Publish
        input#publish(type="checkbox" switch v-model="create.publish" )
</template>