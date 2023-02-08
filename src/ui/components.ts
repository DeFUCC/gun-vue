import { defineAsyncComponent } from 'vue'

export const UiButton = defineAsyncComponent(() => import('./UiButton.vue'))
export const UiLayer = defineAsyncComponent(() => import('./UiLayer.vue'))
export const UiLink = defineAsyncComponent(() => import('./UiLink.vue'))
export const UiModal = defineAsyncComponent(() => import('./UiModal.vue'))
export const UiPanel = defineAsyncComponent(() => import('./UiPanel.vue'))
