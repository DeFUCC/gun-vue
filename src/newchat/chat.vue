<script setup lang="ts">
import { currentRoom } from '#composables'
import { ChatTopics } from '../components'
</script>

<template>
  <div class="chat-wrapper">
  
    <ChatTopics
      
      @topic="$router.push(`/chat/${$event}`)"
      :key="currentRoom.pub"
    />

    <router-view v-slot="{ Component }">
      
      <transition name="fade" mode="out-in">
        
        <keep-alive>
          
          <component :is="Component" class="chat-content" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>


.chat-wrapper {
  display: flex;
  position: relative;
  align-items: stretch;
  overflow: hidden;
  /* light theme background with 40% opacity */
  background-color: rgba(243, 244, 246, 0.4);
}

.dark-mode .chat-wrapper {
  /* dark theme background with 40% opacity */
  background-color: rgba(45, 45, 45, 0.4);
}

.chat-content {
  flex: 1 1 auto;
}
</style>
