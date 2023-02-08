<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat } from './composables';

defineProps({
  title: { type: String, default: 'Topics' },
  topic: { type: String, default: 'general' }
})

defineEmits(['topic'])

const { addChat, chats } = useChat()

const newChat = ref('')
const adding = ref(false)
const chatsPanel = ref()
const panelOpen = ref(true)
const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(chatsPanel, () => !isLarge.value ? panelOpen.value = false : null)
</script>

<template lang="pug">
button.button.absolute.z-200.top-4.left-4(v-if="(!panelOpen && !isLarge)" @click="panelOpen = true")
  | {{ title }}
transition(name="fade")
  .px-1.py-2.flex.flex-col.bg-dark-50.bg-opacity-95.gap-2.min-h-full.overflow-y-scroll.scroll-smooth.absolute.sm-static.z-20.w-220px.max-w-full.max-h-full.text-light-900.backdrop-filter.backdrop-blur-xl(v-if="isLarge || (panelOpen && !isLarge)" ref="chatsPanel" style="flex: 0 1 320px")
    .flex.flex-wrap
      .text-xl.font-bold.p-2 {{ title }}
      .flex-1
      .cursor-pointer.self-center.text-2xl.p-2(@click="adding = !adding")
        transition(name="fade" mode="out-in")
          .i-la-plus(v-if="!adding")
          .i-la-times(v-else)
    .flex.flex-wrap(v-if="adding")
      input.p-2.m-2.w-full.rounded-xl.text-dark-800(v-model="newChat" placeholder="New chat" @keyup.enter="addChat(newChat); newChat = ''; adding = false")
    .flex.flex-col.p-2.gap-2.h-full
      .font-bold.bg-light-100.bg-opacity-10.rounded-xl.px-2.cursor-pointer.flex(v-for="(authors, top) in chats" :key="top" @click="$emit('topic', top); panelOpen = false")
        .flex-1 {{ top }}
        account-avatar(v-for="(isAuthor, author) in authors" :key="author" :size="20" :pub="author")
</template>