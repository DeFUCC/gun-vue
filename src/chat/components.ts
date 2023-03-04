import { defineAsyncComponent } from 'vue'

export const ChatInput = defineAsyncComponent(() => import('./ChatInput.vue'))
export const ChatMessage = defineAsyncComponent(() => import('./ChatMessage.vue'))
export const ChatMessages = defineAsyncComponent(() => import('./ChatMessages.vue'))
export const ChatTopics = defineAsyncComponent(() => import('./ChatTopics.vue'))
export const ChatRoom = defineAsyncComponent(() => import('./ChatRoom.vue'))

// Private

export const ChatPrivate = defineAsyncComponent(() => import('./ChatPrivate.vue'))
export const ChatPrivateCount = defineAsyncComponent(() => import('./ChatPrivateCount.vue'))
export const ChatPrivateList = defineAsyncComponent(() => import('./ChatPrivateList.vue'))