<script setup>
import { useRoom, useColor, currentRoom, gunAvatar } from '@composables';
import { ref } from 'vue'

defineEmits(['room'])

const open = ref(false)


const colorDeep = useColor('deep')

</script>

<template lang="pug">
.mx-2
  button.button(
    @click="open = true" 
    :style="{ backgroundColor: !currentRoom.isRoot ? colorDeep.hex(currentRoom.pub) : '#ddd' }"
    ) 
    la-home.text-lg
    .ml-2.text-sm(v-if="currentRoom?.profile?.name") {{ currentRoom.profile.name.substring(0, 12) }}
  ui-layer.break-all(:open="open" :closeButton="false" @close="open = false")
    room-page(@room="$emit('room', $event)" :key="currentRoom.pub")
      

</template>

