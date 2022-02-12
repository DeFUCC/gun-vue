<script setup>
import { useChat, useUser } from '@composables';

const { user } = useUser();

const { send, message, messages, chatWindow } = useChat()
</script>

<template lang='pug'>
.flex.flex-col.m-4.rounded-3xl.bg-light-800.shadow-md.max-w-55ch.mx-auto
  .p-4 
    .text-xl.font-bold Chat
  .flex.flex-col.bg-dark-50.bg-opacity-80.p-4.gap-2.max-h-50vh.overflow-y-scroll.scroll-smooth(ref="chatWindow")
    chat-message(
      :style="{ order: Math.round(Number(message.timestamp) / 1000) - 1640995200 }"
      v-for="(message, key) in messages" :key="key"
      :author="message.author"
      :timestamp="message.timestamp"
      :text="message.text"
      ) 
  .p-4.rounded-2xl.bg-light-900.flex.gap-2(v-if="user.pub")
    input.p-2.rounded-xl.bg-light-200(
      v-model="message" placeholder="Your message"
      @keyup.enter="send()"
      )
    button.button(@click="send()" v-if="user.pub")
      la-comment-dots.mx-2
  .p-4.flex.flex-col.items-center(v-else)
    button.button(@click="user.auth = true") Log in to post messages
</template>