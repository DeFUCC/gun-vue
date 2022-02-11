<script setup>
import { useRoom, currentRoom, rootRoom, recreateRoom, useColor, useUser, useBackground } from '@composables';
import { ref, computed } from 'vue'

const props = defineProps({
  pub: String
})

defineEmits(['browse'])

const { room, leaveRoom, updateRoomProfile, enterRoom } = useRoom(props.pub)

const { user } = useUser()

const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

const name = ref('')
const editName = ref(false)

const colorDeep = useColor('deep')

const bg = computed(() => useBackground(roomPub.value, 600))

</script>

<template lang='pug'>
.flex.flex-col.items-stretch
  .pt-42.pb-2.px-2.md_px-8.md_pb-8.bg-cover.relative.flex.flex-col.items-center(:style="{ ...bg }")
    .flex.flex-col.items-stretche.bg-light-100.bg-opacity-20.p-4.md_p-12.rounded-4xl.shadow-xl.backdrop-blur-md.backdrop-filter
      .flex.flex-wrap.items-center
        .flex.flex-col
          .flex.items-center.mr-4.mb-2
            .text-2xl.font-bold.break-all {{ room.profile.name || roomPub.substring(0, 12) }}
            la-pen.ml-2.cursor-pointer(@click="name = room.profile.name; editName = true" v-if="room.hosts[user.pub] && roomPub == currentRoom.pub && !editName")
            la-times.ml-2.cursor-pointer(v-if="editName" @click="editName = false")
          input.my-2.p-2.shadow-lg.rounded-lg(v-if="room.hosts[user.pub] && editName" type="text" v-model="name" @keyup.escape="editName = false" @keyup.enter="updateRoomProfile('name', name); editName = null")
          .flex.items-center
            .font-bold.mr-2 Hosts: 
            .p-2(v-for="(enc, host) in room.hosts" :key="host")
              account-badge( :pub="host" :selectable="true")
              room-features(:features="enc") Tools
        .flex-1
        .flex.flex-wrap.py-4(v-if="roomPub != rootRoom.pub")
          button.button(@click="enterRoom(roomPub)" v-if="currentRoom.pub !== roomPub")
            ion-enter-outline
            .ml-2 Enter
          button.button(@click="leaveRoom()" v-else)
            ion-exit-outline
            .ml-2 Leave
      room-features.my-4(:features="room.features")
      .flex.flex-wrap
        button.button(v-if="room.hosts?.[user.pub]?.enc" @click="recreateRoom(room.hosts?.[user.pub]?.enc)")
          la-tools
          .ml-2 Renew
  .text-center.flex.flex-col.items-center
    .m-2.p-4.shadow-lg.rounded-2xl
      .text-sm.font-mono {{ room.profile }}
      .text-md {{ room.profile.description }}
      
      


</template>