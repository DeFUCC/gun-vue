import { defineAsyncComponent } from 'vue'

export const MateButton = defineAsyncComponent(() => import('./MateButton.vue'))
export const MateList = defineAsyncComponent(() => import('./MateList.vue'))
export const MateLink = defineAsyncComponent(() => import('./MateLink.vue'))