<script setup lang="ts">
import { useGuests, joinRoom, useUser, currentRoom } from '#composables';
import { AccountBadge } from '../components'
import { reactive, ref, computed, toRef } from 'vue'


const emit = defineEmits(['user'])

const props = defineProps({
  state: { type: String, default: "online" },
  roomPub: { type: String, default: () => currentRoom.pub }
})

const { user } = useUser()

const guests = useGuests(props.roomPub)

const isInRoom = computed(() => guests.guests[user.pub])

</script>

<template lang="pug">
.flex.flex-wrap
  transition-group(name="fade")
    account-badge.shadow-md.m-1.max-w-200px(
      style="flex: 1 0 90px"
      v-for="(guest, p) in guests[state]"
      :key="p" 
      :size="30"
      :pub="guest.pub"
      :style="{ opacity: guest.online ? 1 : 0.5, order: guest.order }"
      @click="$emit('user', guest.pub)"
    ) 
  button.button.flex.items-center.m-4.p-2(
    v-if="user.is && !isInRoom && roomPub == currentRoom.pub" 
    @click.stop.prevent="joinRoom(roomPub)"
    )
    .i-la-plus
    .ml-2 Join Room
</template>