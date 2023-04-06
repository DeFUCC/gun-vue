<script setup>
import { currentRoom } from '#composables';
import { ChatRoom } from '../components'

const props = defineProps({
  topic: { type: String, default: '' }
})



</script>

<template lang="pug">
chat-room(
  :key="currentRoom.pub" 
  :topic="topic")
</template>