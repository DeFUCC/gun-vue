<script setup>
import { useUser, SEA, generateRoomCerts, createRoom, useBackground, enterRoom } from '@composables';
import { reactive, ref, computed } from 'vue'

const emit = defineEmits(['room'])

const { user } = useUser()

const create = reactive({
  pair: null,
  certs: null,
  name: ''
})

async function genPair() {
  let pair = await SEA.pair()
  create.pair = pair
  create.certs = await generateRoomCerts(pair)
}

function reset() {
  emit('room', create.pair.pub)
  enterRoom(create.pair.pub)
  create.pair = null
  create.certs = null
  create.name = ''
}

const bg = computed(() => useBackground(create.pair?.pub, 620))

</script>

<template lang='pug'>
.flex.flex-col.bg-cover.rounded-2xl.p-8.max-w-620px.bg-light-800.justify-center(v-if="user.pub" :style="{ ...bg }")
  .flex
    button.button.m-2.flex-1(@click="genPair()" ) Generate a new room
    button.button.m-2(@click="reset()" v-if="create.pair" ) Reset
  input.p-2.m-2.rounded-xl(type="text" v-if="create.pair" v-model="create.name" placeholder="New room name")
  transition(name="fade")
    button.button.m-2.flex-1(@click="createRoom(create); reset(); " v-if="create.pair && create.name" ) Add room
  room-certs.mt-6(:certs="create.certs" v-if="create.certs")

</template> 