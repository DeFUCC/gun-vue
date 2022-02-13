<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat, useUser } from '@composables';

const { user } = useUser();

const { send, currentChat, addChat, chats, messages } = useChat()

const message = ref('')
const newChat = ref('')
const chatsPanel = ref()
const panelOpen = ref(true)
const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(chatsPanel, (event) => !isLarge.value ? panelOpen.value = false : null)

const chatWindow = ref();

onMounted(() => {
  watch(messages, () => {
    nextTick(() => {
      chatWindow.value.scrollTo(0, chatWindow.value.scrollHeight);
    });
  });
});


</script>

<template lang='pug'>
.flex.flex-col.bg-light-800.shadow-md.mx-auto.w-full
  .p-4.flex.flex-wrap.items-center
    button.button( @click.stop.prevent="panelOpen = !panelOpen") Chats
    .flex-1.ml-2 / {{ currentChat }}
  .flex
    transition(name="fade")
      .flex.flex-col.bg-dark-300.gap-2.h-55vh.overflow-y-scroll.scroll-smooth.absolute.sm_static.z-20.w-220px.max-w-full.text-light-900(style="flex: 1 1 220px" v-if="isLarge || (panelOpen && !isLarge)" ref="chatsPanel")
        .text-xl.font-bold.bg-dark-50.p-2 Chats 
        .flex.flex-col.p-2.gap-2.h-full
          .font-bold.bg-light-100.bg-opacity-30.rounded-xl.px-2.cursor-pointer.flex(
            v-for="(authors, topic) in chats" :key="topic"
            @click="currentChat = topic; panelOpen = false"
            ) 
            .flex-1 {{ topic }}
            account-avatar(v-for="(isAuthor, author) in authors" :key="author" :size="20" :pub="author")
          .flex-1
          .flex.flex-wrap
            input.p-2.m-2.w-full.rounded-xl.text-dark-800(
              v-model="newChat" 
              @keyup.enter="addChat(newChat); newChat = ''"
              placeholder="New chat"
              )
    .flex.flex-col.bg-dark-50.bg-opacity-80.p-4.gap-2.h-55vh.overflow-y-scroll.scroll-smooth(ref="chatWindow" style="flex: 1 1 auto")
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
      @keyup.enter="send(message); message = ''"
      )
    button.button(@click="send(message); message = ''" v-if="user.pub")
      la-comment-dots.mx-2
  .p-4.flex.flex-col.items-center(v-else)
    button.button(@click="user.auth = true") Log in to post messages
</template>