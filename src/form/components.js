import { defineAsyncComponent } from 'vue'

export const FormLink = defineAsyncComponent(() => import('./FormLink.vue'))
export const FormPicture = defineAsyncComponent(() => import('./FormPicture.vue'))
export const FormText = defineAsyncComponent(() => import('./FormText.vue'))
export const FormYoutube = defineAsyncComponent(() => import('./FormYoutube.vue'))
export const FormTitle = defineAsyncComponent(() => import('./FormTitle.vue'))