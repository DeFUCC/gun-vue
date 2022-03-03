<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  messages: { type: Object }
})

const chatWindow = ref();

watch(() => props.messages, () => {
  nextTick(() => {
    chatWindow.value.scrollTo(0, chatWindow.value.scrollHeight);
  });
}, { deep: true });
</script>

<template lang='pug'>
.flex.flex-col.bg-opacity-80.p-4.gap-2.overflow-y-scroll.scroll-smooth.flex-auto(ref="chatWindow"  )
  transition-group(name="fade")
    chat-message(
      :style="{ order: Math.round(Number(message.timestamp) / 1000) - 1640995200 }"
      v-for="(message, key) in messages" :key="key"
      :author="message.author"
      :timestamp="message.timestamp"
      :text="message.text"
      ) 
</template>