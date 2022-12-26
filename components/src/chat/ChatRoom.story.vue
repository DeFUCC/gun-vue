<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const ChatRoom = defineAsyncComponent(() => import('./ChatRoom.vue'))
const ChatTopics = defineAsyncComponent(() => import('./ChatTopics.vue'))

const state = reactive({
  topic: 'general'
})

</script>

<template lang="pug">
Story(
  title="Chat/Room" 
  icon="la:home"
  )
  Variant(title="Round")
    ChatRoom(v-bind="state")

  template(#controls)
    .p-2.flex.flex-col.gap-4
      ChatTopics(@topic="state.topic = $event")
</template>