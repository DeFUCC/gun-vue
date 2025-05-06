<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery, onClickOutside } from '@vueuse/core'
import { useChat } from './composables';
import { AccountAvatar } from '../components'
import { useUser, currentRoom } from '#composables';

defineProps({
  title: { type: String, default: 'Topics' },
  topic: { type: String, default: 'general' }
})

defineEmits(['topic'])

const { user } = useUser()
const { addChat, chats, removeChat } = useChat()

const newChat = ref('')
const adding = ref(false)
const chatsPanel = ref<HTMLElement>()
const panelOpen = ref(true)
const isLarge = useMediaQuery('(min-width: 640px)')

onClickOutside(chatsPanel, () => {
  if (!isLarge.value) panelOpen.value = false
})
</script>

<template>
 
  <button
    v-if="(!panelOpen && !isLarge)"
    @click="panelOpen = true"
    class="toggle-button"
  >{{ title }}</button>

  <transition name="fade" mode="out-in" appear>
    <div
      v-if="isLarge || (panelOpen && !isLarge)"
      ref="chatsPanel"
      class="chat-panel"
    >
   
      <div class="chat-header">
        <span class="chat-header__title">{{ title }}</span>
        <button
          v-if="user.is"
          class="chat-header__toggle-add"
          @click="adding = !adding"
        >
          <span v-if="!adding" class="icon-plus" />
          <span v-else class="icon-times" />
        </button>
      </div>


      <div v-if="adding" class="add-chat">
        <input
          v-model="newChat"
          @keyup.enter="addChat(newChat); newChat=''; adding=false"
          placeholder="New chat"
          class="add-chat__input"
        />
      </div>

  
      <div class="chat-list" > 
        <div
          v-for="chat in chats"
          :key="chat.title"
          class="chat-item"
          @click="$emit('topic', chat.title); panelOpen=false"
        >
          <span class="chat-item__title">{{ chat.title }}</span>

          <button
            v-if="user.is && chat.my < 1"
            @click.stop="addChat(chat.title)"
            class="icon-button"
          >
            <span class="icon-plus" />
          </button>

          <span class="chat-item__rating">{{ chat.rating }}</span>

          <button
            v-if="user.is && chat.my > -1"
            @click.stop="removeChat(chat.title)"
            class="icon-button"
          >
            <span class="icon-times" />
          </button>
         
        </div>
     
      </div>
     
    </div>
  </transition>
</template>

<style>

.toggle-button {
  position: fixed;
  z-index: 2000;
  top: 4rem;    /* Tailwind top-16 */
  left: 1rem;   /* Tailwind left-4 */
  padding: 0.5rem 1rem;
  background: #000000;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
}


.chat-panel {
  overscroll-behavior: contain;  
  position: absolute;
  z-index: 20000;
  top: 0;
  left: 0;
  bottom: 0;
  height: 93vh;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;               /* Tailwind gap-2 */
  padding: 0.25rem 0.25rem 2rem; /* px-1 py-2 + pb-8 */
  min-width: 260px;
  max-width: 100%;
  color: #111827;            /* text-light-900 */
  background-color: rgba(31, 41, 55, 0.05); /* bg-dark-50 + bg-opacity-95 */
  backdrop-filter: blur(10px);
  overflow-y: auto;

  scroll-behavior: smooth;
}


@media (min-width: 640px) {
  .chat-panel {
    position: static;
    flex: 0 1 320px;         /* style="flex: 0 1 320px" */
  }
}


.chat-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;           /* p-2 */
}
.chat-header__title {
  flex: 1;
  font-size: 1.25rem;        /* text-xl */
  font-weight: 700;          /* font-bold */
}
.chat-header__toggle-add {
  background: none;
  border: none;
  padding: 0.5rem;           /* p-2 */
  font-size: 1.5rem;         /* text-2xl */
  cursor: pointer;
}


.add-chat {
  display: flex;
  flex-wrap: wrap;
}
.add-chat__input {
  flex: 1 1 100%;
  padding: 0.5rem;           /* p-2 */
  margin: 0.5rem;            /* m-2 */
  border: 1px solid #d1d5db;
  border-radius: 1rem;       /* rounded-xl */
  color: #1f2937;            /* text-dark-800 */
  background: #ffffff;
}


.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;               /* gap-2 */
  padding: 0.5rem;           /* p-2 */
  height: 100%;              /* h-full */
}


.chat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;              /* gap-1 */
  padding: 0.25rem;          /* px-2,py-1 */
  background-color: rgba(247, 250, 252, 0.1); /* bg-light-100 + bg-opacity-10 */
  border-radius: 0.75rem;    /* rounded-xl */
  font-weight: 700;          /* font-bold */
  cursor: pointer;
}
.chat-item:hover {
  background-color: rgba(247, 250, 252, 0.2);
}
.chat-item__title {
  flex: 1;
}
.chat-item__rating {
  font-family: monospace;
  font-size: 0.75rem;        /* text-xs */
  font-weight: 400;          /* font-normal */
}


.icon-button {
  background: none;
  border: none;
  padding: 0.25rem;          /* p-1 */
  cursor: pointer;
}


.icon-plus::before {
  content: '+';
  display: inline-block;
}
.icon-times::before {
  content: '×';
  display: inline-block;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
