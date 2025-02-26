import { defineAsyncComponent } from 'vue'


export const MessageExchange = defineAsyncComponent(() => import('./MessageExchange.vue'))
export const MessagesCount = defineAsyncComponent(() => import('./MessagesCount.vue'))
export const MessageList = defineAsyncComponent(() => import('./MessageList.vue'))