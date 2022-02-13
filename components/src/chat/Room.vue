<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat, useUser } from '@composables';

const { user } = useUser();

const { send, currentTopic, topics, messages } = useChat()

const message = ref('')
const topicsPanel = ref()
const topicsOpen = ref(true)
const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(topicsPanel, (event) => !isLarge.value ? topicsOpen.value = false : null)

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
    .text-xl.font-bold Chat 
    .flex-1.ml-2 / {{ currentTopic }}
    button.button(v-if="!isLarge" @click.stop.prevent="topicsOpen = !topicsOpen") Channels
  .flex
    transition(name="fade")
      .flex.flex-col.bg-dark-300.gap-2.h-50vh.overflow-y-scroll.scroll-smooth.absolute.sm_static.z-20.w-220px.max-w-full.text-light-900(style="flex: 1 1 420px" v-if="isLarge || (topicsOpen && !isLarge)" ref="topicsPanel")
        .text-xl.font-bold.bg-dark-50.p-2 Channels
        .flex.flex-col.p-2.gap-1
          .font-bold.bg-light-100.bg-opacity-30.rounded-xl.px-2.cursor-pointer(
            v-for="(count, topic) in topics" :key="topic"
            @click="currentTopic = topic; topicsOpen = false"
            ) {{ topic }} {{ count }}
    .flex.flex-col.bg-dark-50.bg-opacity-80.p-4.gap-2.h-50vh.overflow-y-scroll.scroll-smooth(ref="chatWindow" style="flex: 1 1 auto")
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