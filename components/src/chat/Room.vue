<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat, useUser, useBackground, currentRoom } from '@composables';

const emit = defineEmits(['newMessage'])

const { user } = useUser();

const { send, currentChat, addChat, chats, messages } = useChat()

const message = ref('')
const newChat = ref('')
const adding = ref(false)
const chatsPanel = ref()
const panelOpen = ref(true)
const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(chatsPanel, (event) => !isLarge.value ? panelOpen.value = false : null)

watch(messages, () => {
    emit('newMessage')
}, { deep: true });

</script>

<template lang='pug'>
.flex.flex-col.bg-dark-800.bg-opacity-40.backdrop-filter.backdrop-blur-xl.shadow-md.mx-auto.w-full

  .flex.relative.h-78vh.items-stretch
    transition(name="fade")
      .flex.flex-col.bg-dark-300.bg-opacity-70.gap-2.min-h-full.overflow-y-scroll.scroll-smooth.absolute.sm_static.z-20.w-220px.max-w-full.max-h-full.text-light-900.backdrop-filter.backdrop-blur-xl(style="flex: 1 1 320px" v-if="isLarge || (panelOpen && !isLarge)" ref="chatsPanel")
        .flex.flex-wrap
          .text-xl.font-bold.p-2 Chats 
          .flex-1
          .cursor-pointer.self-center.text-2xl.p-2(@click="adding = !adding")
            transition(name="fade" mode="out-in")
              la-plus(v-if="!adding")
              la-times(v-else)
        .flex.flex-wrap(v-if="adding")
          input.p-2.m-2.w-full.rounded-xl.text-dark-800(
            v-model="newChat" 
            @keyup.enter="addChat(newChat); newChat = ''; adding = false"
            placeholder="New chat"
            )
        .flex.flex-col.p-2.gap-2.h-full
          .font-bold.bg-light-100.bg-opacity-30.rounded-xl.px-2.cursor-pointer.flex(
            v-for="(authors, topic) in chats" :key="topic"
            @click="currentChat = topic; panelOpen = false"
            ) 
            .flex-1 {{ topic }}
            account-avatar(v-for="(isAuthor, author) in authors" :key="author" :size="20" :pub="author")

    .flex.flex-col(style="flex: 1000 1 auto")
      .p-4.flex.flex-wrap.items-center
        button.button( @click.stop.prevent="panelOpen = !panelOpen") Chats
        .flex-1.ml-2 / {{ currentChat }}
      chat-messages(:messages="messages")
      .p-4.bg-dark-50.bg-opacity-80.flex.gap-2.flex
        chat-input.flex-auto(@submit="send($event)")
</template>