<script setup>
import { useRoom, useColor, useUser, gunAvatar } from '@composables';
import { ref } from 'vue'

defineEmits(['browse'])

const { user } = useUser()

const { room, rooms, profile, createRoom, leaveRoom, updateRoomProfile } = useRoom()

const name = ref('')
const editName = ref(false)

const colorDeep = useColor('deep')
</script>

<template lang='pug'>
.px-8.py-20.bg-cover.relative.flex.flex-col.items-center(:style="{ backgroundImage: `url(${gunAvatar({ pub: room.pub, draw: 'squares', reflect: false, size: 600 })})` }")
  button.button.absolute.left-4.bottom-4(@click="leaveRoom()" v-if="!room.isRoot")
    la-door-open
    .ml-2 Leave
  .flex.flex-col.items-center.bg-light-100.bg-opacity-20.p-8.rounded-4xl.shadow-xl.backdrop-blur-md.backdrop-filter
    .flex.flex-col.mb-4
      .flex.items-center
        .text-2xl.font-bold.break-all {{ profile.name || room.pub }}
        la-pen.ml-2.cursor-pointer(@click="name = profile.name; editName = true" v-if="user.pub == room.host.value && !editName")
        la-times.ml-2.cursor-pointer(v-if="editName" @click="editName = false")
      input.my-2.p-2.shadow-lg.rounded-lg(v-if="user.pub == room.host.value && editName" type="text" v-model="name" @keyup.escape="editName = false" @keyup.enter="updateRoomProfile('name', name); editName = null")
    account-badge(:pub="room.host.value")
    room-certs(:certs="room.certs.value")
    .text-sm.font-mono.my-4 {{ profile }}
</template>