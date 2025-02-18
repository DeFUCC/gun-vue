<script setup lang="ts">
import { useUser } from '#composables';
import { ref, watch } from 'vue';
import { UiLayer, AuthCredentials, AuthLogin, UserPanel, UserProfile, UserRooms, ChatPrivateList, } from '../components'
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['user', 'room', 'close', 'chat', 'browse'])

const { user } = useUser()

function isSafe() {
  user.db.get('safe').get('saved').put(true)
}

const safe = ref(false)

watch(() => user.is, () => {
  user.db.get('safe').get('saved').on(s => safe.value = s)
}, { immediate: true })

const showChats = useStorage('showChats', true)


</script>

<template lang="pug">
.flex.flex-col.items-center.w-full
  ui-layer(
    :open="user.is && !safe" 
    close-button 
    @close="isSafe()"
    )
    auth-credentials(v-if="!safe")
      button.button.mx-8.justify-center(@click="isSafe()")
        .i-la-check
        .ml-2 I've stored my key securely
  auth-login(v-if="!user.is")
  .flex.flex-col(v-else)
    user-panel(
      @browse="$emit('browse', $event); $emit('close')"
      )
    .p-4.flex.flex-col.items-stretch.gap-4
      user-profile
      button.p-2.rounded-xl.font-bold.text-lg.shadow-md(
        :style="{ backgroundColor: user.color }"
        @click="$emit('user', user.pub); $emit('close')"
        )  My public profile
      hr.w-full
      UserRooms(@browse="$emit('room', $event)")
      .flex.flex-col.items-stretch.bg-light-900.p-2.rounded-xl
        button.items-center.w-full.flex.px-2.pb-2(@click="showChats = !showChats") 
          .font-bold.text-lg My chats
          .flex-1
          .i-la-angle-down(v-if="showChats")
          .i-la-angle-up(v-else)
        transition(
          name="fade" 
          mode="out-in")
          ChatPrivateList(@chat="$emit('chat', $event)" v-if="showChats")

</template>