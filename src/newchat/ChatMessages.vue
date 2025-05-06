<script setup lang="ts">
import { watchDebounced, } from '@vueuse/core';
import { ref, watch, nextTick } from 'vue'
import VirtualList from 'vue3-virtual-scroll-list';
import ChatMessage from './ChatMessage.vue';
import type { Message } from './useChat';


const props = defineProps<{
  messages?: Message[]
}>()


const list = ref();

watchDebounced(() => props.messages, () => {
  nextTick(() => {
    list.value.scrollToBottom()
  });
}, { deep: true, debounce: 300 });

</script>

<template>

  <VirtualList
    ref="list"
    class="message-list"
    :data-key="'timestamp'"
    :data-sources="messages"
    :data-component="ChatMessage"
  />
</template>

<style>
.message-list {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding:50px 16px;
  margin: -10px 0;
  gap: 8px;
  backdrop-filter: blur(20px);
  height: 90vh;
  /* background-color: rgba(156, 163, 175, 0.8);  */
}

/* Dark‐mode override (toggle .dark-mode on body/html) */
.dark-mode .message-list {
  background-color: rgba(55, 65, 81, 0.8); /* #374151 @ 80% */
}
</style>