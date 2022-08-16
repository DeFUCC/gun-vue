<script setup>
import { useRoom, useColor, currentRoom, useBackground, useRoomLogo } from '#composables';
import { ref, computed } from 'vue'

defineEmits(['room', 'rooms', 'browse'])

const open = ref(false)

const current = computed(() => useRoom(currentRoom.pub))


const colorDeep = useColor('deep')

const bg = computed(() => useBackground({
  pub: currentRoom.pub,
  size: 200,
  attachment: 'local'
}))

const { logo } = useRoomLogo(currentRoom.pub)

</script>

<template lang="pug">
.mx-2
  button.button(
    @click="open = true" 
    :style="{ ...bg }"
    )
    img.h-12.rounded-xl.mr-2(v-if="logo" :src="logo")
    .text-2xl.font-normal @
    .ml-1.text-sm(v-if="current?.room?.profile?.name") {{ current?.room.profile.name.substring(0, 15) }}
  ui-panel.break-all(:open="open" :closeButton="false" @close="open = false")
    room-page(
      @room="$emit('room', $event)" 
      :key="currentRoom.pub" 
      @rooms="$emit('rooms')"
      @browse="$emit('browse', $event); open = false" 
      )
      button.button.m-4(@click="$emit('rooms'); open = false") Browse rooms
      

</template>

