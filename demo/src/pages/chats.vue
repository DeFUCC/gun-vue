<script setup>
import { currentRoom } from '@composables';

let audio

function click() {
  if (!audio) {
    audio = new Audio('audio/safe.mp3')
    audio.volume = 0.1
  }
  audio.play()
}

</script>

<template lang='pug'>
chat-room(:key="currentRoom.pub" @newMessage="click()")
</template>