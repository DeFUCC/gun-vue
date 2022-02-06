<script setup>
import { useRoom, useColor, useUser, gunAvatar } from '@composables';
import { ref } from 'vue'

defineEmits(['browse'])

const open = ref(false)

const { room } = useRoom()

const colorDeep = useColor('deep')

</script>

<template lang="pug">
.mx-2.text-xl
  button.button(@click="open = true" :style="{ backgroundColor: !room.isRoot ? colorDeep.hex(room.pub) : 'gray' }")
    la-home
  ui-layer.break-all(:open="open" :closeButton="false" @close="open = false")
    room-page
      

</template>

