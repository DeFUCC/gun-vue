<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat, useUser, useBackground, currentRoom } from '@composables';

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

const { send, currentChat, messages } = useChat()

watch(() => props.topic, topic => {
  currentChat.value = topic
}, { immediate: true })

watch(messages, () => {
  click()
}, { deep: true });

</script>

<template lang='pug'>


.flex.flex-col.overflow-y-scroll(style="flex: 1000 1 auto")
  .px-4.py-6.flex.flex-wrap.items-center.text-center
    .flex-1.ml-2.font-bold {{ currentChat }}
  chat-messages(:messages="messages")
  .p-4.bg-dark-50.bg-opacity-80.flex.gap-2.flex.sticky.bottom-0
    chat-input.flex-auto(@submit="send($event)")
</template>