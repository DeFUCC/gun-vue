<script setup lang="ts">
import { currentRoom } from '#composables';
import { ChatTopics } from '../components'
</script>

<template lang="pug">
.flex.relative.items-stretch.bg-dark-50.dark-bg-dark-200.bg-opacity-40
  chat-topics(@topic="$router.push(`/chat/${$event}`)" :key="currentRoom.pub")
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")
</template>