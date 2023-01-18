<script setup>
import { useRoom, currentRoom, rootRoom, recreateRoom, useColor, useUser, useBackground } from '#composables';
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  pub: { type: String, default: currentRoom.pub }
})

const { user } = useUser()

const { room, leaveRoom, enterRoom } = useRoom(props.pub)


const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

</script>

<template lang="pug">
.flex.flex-wrap.items-center.gap-2
  button.button(
    v-if="room.hosts?.[user.pub]" 
    @click="recreateRoom(room.hosts?.[user.pub]?.enc)"
    )
    .i-la-tools
    .ml-2 Renew
  .flex.flex-wrap.py-4(v-if="roomPub != rootRoom.pub")
    button.button(
      v-if="currentRoom.pub !== roomPub" 
      @click="enterRoom(roomPub)"
      )
      .i-ion-enter-outline
      .ml-2 Enter
    button.button(
      v-else 
      @click="leaveRoom()"
      )
      .i-ion-exit-outline
      .ml-2 Leave
</template>