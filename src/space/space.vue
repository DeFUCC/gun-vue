<script setup lang="ts">
import { currentRoom, selectedUser } from '#composables'
import { SpacePlane } from '../components'

const props = defineProps({
  coord: {
    type: String,
    default: '200,300'
  }
})

let audio: HTMLAudioElement

function enter() {
  if (!audio) {
    audio = new Audio('audio/bell.mp3')
    audio.volume = 0.1
  }
  audio.play()
}

let leaveAudio: HTMLAudioElement

function leave() {
  if (!leaveAudio) {
    leaveAudio = new Audio('audio/wind.mp3')
    leaveAudio.volume = 0.1
  }
  leaveAudio.play()
}


</script>

<template lang="pug">
.flex.flex-col.items-centerl.w-full.items-stretch.relative
  space-plane.h-90vh(
    :key="currentRoom.pub"
    :coord="coord" 
    @user="selectedUser.pub = $event" 
    @chat="$router.push('/messages/' + $event)" 
    @enter="enter()"
    @leave="leave()"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      component(:is="Component")
</template>