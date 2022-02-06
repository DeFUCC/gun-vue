<script setup>
import { useRoom, useColor, useUser, gunAvatar } from '@composables';
import { ref, watch } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse'])

const open = ref(false)

const { user } = useUser()

const { room, rooms, profile, createRoom, leaveRoom, updateRoomProfile } = useRoom()

const name = ref('')

watch(name, n => {
  updateRoomProfile('name', n)
})

const colorDeep = useColor('deep')

</script>

<template lang="pug">
.mx-2.text-xl
  button.button(@click="open = true" :style="{ backgroundColor: !room.isRoot ? colorDeep.hex(room.pub) : 'gray' }")
    la-home
  ui-layer.break-all(:open="open" @close="open = false")
    .px-8.py-24(:style="{ backgroundColor: colorDeep.hex(room.pub), backgroundImage: `url(${gunAvatar({ pub: room.pub, draw: 'squares', reflect: false, size: 600 })})` }")
      .font-bold {{ profile.name }}
      .my-4.text-sm(v-if="!room.isRoot") {{ room.pub }}
    .p-8
      input.my-2.p-2.shadow-lg(v-if="user.pub == room.host" type="text" v-model="name")
      .text-sm.font-mono {{ room }}
      .text-sm.font-mono {{ profile }}
      .flex.flex-col.gap-2
        .p-4.rounded-xl.shadow-md.text-sm.font-mono.bg-cover(
          v-for="r in rooms" :key="r" 
          :style="{ backgroundColor: colorDeep.hex(r), backgroundImage: `url(${gunAvatar({ pub: r, draw: 'squares', reflect: false, size: 600 })})` }"
          @click="room.pub = r"
          ) {{ r.slice(0, 12) }}
      .flex.flex-wrap 
        button.button(@click="createRoom()" v-if="user.pub") Create
        button.button(@click="leaveRoom()" v-if="!room.isRoot") Leave


</template>