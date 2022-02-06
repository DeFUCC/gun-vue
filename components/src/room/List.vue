<script setup>
import { useRooms, useUser, SEA, regenerateCerts, gunAvatar } from '@composables';
import { reactive, ref } from 'vue'

const { rooms, createRoom } = useRooms()
const { user } = useUser()

const create = reactive({
  pair: null,
  certs: null,
  name: ''
})

async function genPair() {
  let pair = await SEA.pair()
  create.pair = pair
  create.certs = await regenerateCerts(pair)
}

function reset() {
  create.pair = null
  create.certs = null
  create.name = ''
}

</script>

<template lang='pug'>
.flex.flex-col.mb-4 
  .flex.flex-col.bg-cover.rounded-2xl.p-2(v-if="user.pub" :style="{ backgroundImage: `url(${create.pair && gunAvatar({ pub: create.pair.pub, draw: 'squares', reflect: false, size: 600 })})` }")
    button.button.m-2(@click="genPair()" ) Generate room
    .text-xs.p-2 {{ create.pair }}
    room-certs(:certs="create.certs" v-if="create.certs")
    input.p-2.m-2.rounded-xl(type="text" v-if="create.pair" v-model="create.name" placeholder="New room name")
    .flex
      button.button.m-2.flex-1(@click="createRoom(create); reset()" v-if="create.pair && create.name" ) Add room
      button.button.m-2(@click="reset()" v-if="create.pair" ) Reset
  .flex.flex-wrap.gap-4.my-4
    room-card( 
      style="flex: 1 1 200px"
      v-for="(authors, pub) in rooms" :key="pub" 
      :pub="pub"
      :authors="authors"
      ) 
</template> 