<script setup>
import { useRoom, useColor, useUser, gunAvatar } from '@composables';
import { ref } from 'vue'

defineEmits(['browse'])

const open = ref(false)

const { room, profile } = useRoom()

const colorDeep = useColor('deep')

</script>

<template lang="pug">
.mx-2
  button.button(@click="open = true" :style="{ backgroundColor: !room.isRoot ? colorDeep.hex(room.pub) : '#ddd' }")
    la-home.text-lg
    .ml-2.text-sm(v-if="profile.name") {{ profile.name.substring(0, 12) }}
  ui-layer.break-all(:open="open" :closeButton="false" @close="open = false")
    room-page
      

</template>

