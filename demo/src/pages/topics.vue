<script setup>
import { currentRoom } from '@composables';

let audio

function click() {
  if (!audio) {
    audio = new Audio('audio/safe.mp3')
    audio.volume = 0.1
  }
  let promise = audio.play()
  if (promise) {
    //Older browsers may not return a promise, according to the MDN website
    promise.catch(function (error) { });
  }

}

</script>

<template lang='pug'>
chat-room(:key="currentRoom.pub" @newMessage="click()")
</template>