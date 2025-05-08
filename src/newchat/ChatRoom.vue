<script setup lang="ts">
import { watch, computed } from 'vue'
import { UiLayer, AccountHome, ChatMessages, ChatInput } from '../components'
import { useChat, selectedUser, useBackground, currentRoom } from '../composables';
// import { useWebNotification, watchDebounced } from '@vueuse/core';

const props = defineProps({
  title: { type: String, default: 'Topics' },
  topic: { type: String, default: 'general' },
  clickSound: { type: String, default: 'audio/safe.mp3' }
})

let audio



function click() {
  if (!audio) {
    audio = new Audio(props.clickSound)
    audio.volume = 0.1
  }
  audio.play()
}

const { send, currentChat, sorted } = useChat()

watch(() => props.topic, topic => {
  currentChat.value = topic
}, { immediate: true })

// watchDebounced(sorted, (next, prev) => {
//   if (next.length > prev.length) {
//     click()
//     const message = next.slice(-1)[0]
//     const {
//       isSupported,
//       notification,
//       show,
//       close,
//       onClick,
//       onShow,
//       onError,
//       onClose,
//     } = useWebNotification({
//       title: message?.text,
//       body: `${message?.timestamp} by ${message?.author}`,
//       lang: 'en',
//       tag: 'chat',
//     })
//     if (isSupported.value) {
//       show()
//     }
//   }
// }, { deep: true })

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

</script>

<template>
  <div class="chat-container" :style="bg">
    <div class="chat-header">
      <div class="chat-title">{{ currentChat }}</div>
    </div>

  
    <ChatMessages :messages="sorted" class="chat-messages" />


    <div class="chat-input-container">
      <ChatInput class="chat-input" @submit="send($event)" />
    </div>
  </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
}

/* top bar */
.chat-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  /* background-color: rgba(255, 255, 255, 0.3); */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  padding: 12px 16px;

  background: linear-gradient(to bottom, rgb(133, 132, 132) 20%, rgba(0, 0, 0, 0) 100%);
}

/* dark-mode override (toggle .dark-mode on body/html) */
.dark-mode .chat-header {
  background-color: rgba(32, 32, 32, 0.5);
}

.chat-title {
  flex: 1;
  margin-left: 8px;
  font-weight: bold;
}

/* allow messages area to grow */
.chat-messages {
  flex: 1 1 auto;
  
}

/* bottom input bar */
.chat-input-container {
  position: sticky;
  bottom: 0;

  background: linear-gradient(to top, rgb(255, 255, 255) 20%, rgba(0, 0, 0, 0) 100%);
  /* display: flex; */
  /* gap: 8px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.8); */
}

/* dark-mode override */
.dark-mode .chat-input-container {
  background-color: rgba(32, 32, 32, 0.8);
  
}

/* make the input expand */
.chat-input {
  flex: 1;
}
</style>