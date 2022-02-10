<script setup>
import { useRooms, useUser, SEA, generateRoomCerts, submitRoom, useBackground } from '@composables';
import { reactive, ref, computed } from 'vue'

defineEmits(['browse'])

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
  create.certs = await generateRoomCerts(pair)
}

function reset() {
  create.pair = null
  create.certs = null
  create.name = ''
}

const bg = computed(() => useBackground(create.pair?.pub, 620))

</script>

<template lang='pug'>
.flex.flex-col.mb-4 
  .flex.flex-wrap.gap-4.my-4
    room-card( 
      style="flex: 1 1 200px"
      v-for="(authors, pub) in rooms" :key="pub" 
      :pub="pub"
      @click="$emit('browse', pub)"
      )
      post-action-react(:authors="authors" :hash="pub" tag="rooms")
  room-form(@room="$emit('browse', $event)")
</template> 