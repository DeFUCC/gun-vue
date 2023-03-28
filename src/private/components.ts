import { defineAsyncComponent } from 'vue'


export const ChatPrivate = defineAsyncComponent(() => import('./ChatPrivate.vue'))
export const ChatPrivateCount = defineAsyncComponent(() => import('./ChatPrivateCount.vue'))
export const ChatPrivateList = defineAsyncComponent(() => import('./ChatPrivateList.vue'))