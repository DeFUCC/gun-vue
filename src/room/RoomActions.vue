<script setup>
import { useRoom, currentRoom, rootRoom, recreateRoom, useUser, downloadFile, SEA } from '#composables';
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  pub: { type: String, default: () => currentRoom.pub }
})

const emit = defineEmits(['room'])

const { user } = useUser()

const { room, leaveRoom, enterRoom } = useRoom(props.pub)


const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

async function download(enc) {
  const dec = await user.decrypt(enc)
  console.log(dec, enc)
  downloadFile(JSON.stringify(dec), 'application/json', `room-${room.profile?.name}.json`)
}

</script>

<template lang="pug">
.flex.flex-wrap.items-center.gap-2
  button.button(
    v-if="room.hosts?.[user.pub]" 
    @click="recreateRoom(room.hosts?.[user.pub]?.enc)"
    )
    .i-la-tools
    .ml-2 Renew
  button.button(
    v-if="room.hosts?.[user.pub]" 
    @click="download(room.hosts?.[user.pub]?.enc)"
    )
    .i-la-download
    .ml-2 Keys
  .flex.flex-wrap.py-4(v-if="roomPub != rootRoom.pub")
    button.button(
      v-if="currentRoom.pub !== roomPub" 
      @click="enterRoom(roomPub); emit('room')"
      )
      .i-ion-enter-outline
      .ml-2 Enter Room
    button.button(
      v-else 
      @click="leaveRoom(); emit('room')"
      )
      .i-ion-exit-outline
      .ml-2 Leave Room
</template>