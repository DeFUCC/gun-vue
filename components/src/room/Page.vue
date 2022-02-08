<script setup>
import { useRoom, rootRoom, useColor, useUser, useBackground, useRoomProfile } from '@composables';
import { ref, computed } from 'vue'

const props = defineProps({
  pub: String
})

defineEmits(['browse'])

const { room, leaveRoom, updateRoomProfile, enterRoom } = useRoom()

const { user } = useUser()

const profile = computed(() => {
  return useRoomProfile(props.pub)
})

const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return room.pub
  }
})

const name = ref('')
const editName = ref(false)

const colorDeep = useColor('deep')

const bg = computed(() => useBackground(user.pub, 600))

</script>

<template lang='pug'>
.pt-42.pb-2.px-2.md_px-8.md_pb-8.bg-cover.relative.flex.flex-col.items-center(:style="{ ...bg }")
  .flex.flex-col.items-start.bg-light-100.bg-opacity-20.p-6.md_p-12.rounded-4xl.shadow-xl.backdrop-blur-md.backdrop-filter
    .flex.flex-col.mb-4
      .flex.items-center
        .text-2xl.font-bold.break-all {{ profile.name || roomPub.substring(0, 12) }}
        la-pen.ml-2.cursor-pointer(@click="name = profile.name; editName = true" v-if="user.pub == room.host && pub == room.pub && !editName")
        la-times.ml-2.cursor-pointer(v-if="editName" @click="editName = false")
      input.my-2.p-2.shadow-lg.rounded-lg(v-if="user.pub == room.host && editName" type="text" v-model="name" @keyup.escape="editName = false" @keyup.enter="updateRoomProfile('name', name); editName = null")
    account-badge(:pub="room.host")
    room-certs(:certs="room.certs")
    .text-sm.font-mono.my-4 {{ profile }}
    .flex.flex-wrap
      button.button(@click="enterRoom(roomPub)" v-if="room.pub !== roomPub && roomPub != rootRoom.pub")
        la-door-closed
        .ml-2 Enter
      button.button(@click="leaveRoom()" v-if="room.pub == roomPub && roomPub != rootRoom.pub")
        la-door-open
        .ml-2 Leave
</template>