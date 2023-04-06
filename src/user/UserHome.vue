<script setup lang="ts">
import { useUser } from '#composables';
import { UiLayer, AuthCredentials, AuthLogin, UserPanel, UserProfile, UserRooms, } from '../components'

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
    auth-credentials(v-if="!user.safe?.saved")
      button.button.mx-8.justify-center(@click="isSafe()")
        .i-la-check
        .ml-2 I've stored my key securely
  auth-login(v-if="!user.is")
  .flex.flex-col(v-else)
    user-panel(
      @browse="$emit('browse', $event); $emit('close')"
      )
    .p-4.flex.flex-col.items-start
      user-profile
      UserRooms(@browse="$emit('room', $event)")
    button.p-4.m-4.rounded-xl.font-bold.text-lg.shadow-md(
      :style="{ backgroundColor: user.color }"
      @click="$emit('user', user.pub); $emit('close')"
      )
      slot  My public profile
</template>