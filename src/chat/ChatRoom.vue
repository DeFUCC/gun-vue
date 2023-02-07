<script setup>
import { watch, computed } from 'vue'

import { useChat, selectedUser, useBackground, currentRoom } from '#composables';
import { useWebNotification, watchDebounced } from '@vueuse/core';

const props = defineProps({
  title: { type: String, default: 'Topics' },
  topic: { type: String, default: 'general' },
  clickSound: { type: String, default: 'audio/safe.mp3' }
})

const emit = defineEmits(['account'])

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

watchDebounced(sorted, (next, prev) => {
  if (next.length > prev.length) {
    click()
    const message = next.slice(-1)[0]
    const {
      isSupported,
      notification,
      show,
      close,
      onClick,
      onShow,
      onError,
      onClose,
    } = useWebNotification({
      title: message?.text,
      body: message?.timestamp,
      lang: 'en',
      renotify: true,
      tag: 'chat',
    })
    if (isSupported.value) {
      show()
    }
  }
}, { deep: true })

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

</script>

<template lang="pug">
.flex.flex-col.overflow-y-scroll(
  style="flex: 1000 1 auto"
  :style="{ ...bg }"
  )
  ui-layer(
    :open="!!selectedUser?.pub"
    @close="selectedUser.pub = ''"
    )
    account-home(v-if="selectedUser?.pub" :pub="selectedUser.pub" )
  .px-4.py-6.flex.flex-wrap.items-center.text-center
    .flex-1.ml-2.font-bold {{ currentChat }}
  chat-messages(:messages="sorted")
  .p-4.bg-dark-50.bg-opacity-80.flex.gap-2.flex.sticky.bottom-0
    chat-input.flex-auto(@submit="send($event)")
</template>