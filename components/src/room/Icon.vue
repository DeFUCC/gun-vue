<script setup>
import { useRoom, useColor, useUser } from '@composables';
import { ref } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' }
})

const open = ref(false)

defineEmits(['browse'])

const { room, createRoom, leaveRoom } = useRoom()
const { user } = useUser()

const colorDeep = useColor('deep')

</script>

<template lang="pug">
.mx-2.text-xl.cursor-pointer
  button.button(@click="open = true" :style="{ backgroundColor: !room.isRoot ? colorDeep.hex(room.pub) : 'gray' }")
    la-home
  ui-layer(:open="open" @close="open = false")
    .p-8(:style="{ backgroundColor: colorDeep.hex(room.pub) }")
      .font-bold ROOM 
      .my-4.text-sm(v-if="!room.isRoot") {{ room.pub }}
    .p-8 
      .text-sm.font-mono {{ room }}
      .flex.flex-wrap 
        button.button(@click="createRoom()" v-if="user.pub") Create
        button.button(@click="leaveRoom()" v-if="!room.isRoot") Leave


</template>