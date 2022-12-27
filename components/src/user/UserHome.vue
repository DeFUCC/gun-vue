<script setup>
import { useUser } from '#composables';

const emit = defineEmits(['user', 'room', 'close', 'chat', 'browse'])

const { user } = useUser()

function isSafe() {
  user.db.get('safe').get('saved').put(true)
}

</script>

<template lang="pug">
.flex.flex-col.items-center.w-full
  ui-layer(
    :open="user.is && !user.safe?.saved" 
    close-button 
    @close="isSafe()"
    )
    user-credentials(@close="isSafe()")

  user-login(v-if="!user.is")
  .flex.flex-col(v-else)
    user-panel(
      @browse="$emit('browse', $event); $emit('close')"
      )
    .p-4.flex.flex-col.items-start
      user-profile
      chat-private-list(@chat="$emit('chat', $event)")
      mate-list(
        :pub="user.pub"  
      @browse="$emit('user', $event)"
      )
      .text-xl.p-4 My wallets
        gift-wallets(:pub="user.pub")
      UserRooms(@browse="$emit('room', $event)")
    button.p-4.m-4.rounded-xl.font-bold.text-lg.shadow-md(
      :style="{ backgroundColor: user.color }"
      @click="$emit('user', user.pub); $emit('close')"
      )
      slot  My public profile
    
</template>