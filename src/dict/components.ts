import { defineAsyncComponent } from 'vue'

// DICTIONARY

export const DictBy = defineAsyncComponent(() => import('./DictBy.vue'))
export const DictPanel = defineAsyncComponent(() => import('./DictPanel.vue'))
export const DictAuthors = defineAsyncComponent(() => import('./DictAuthors.vue'))

// DEF

export const DictDefCard = defineAsyncComponent(() => import('./def/DictDefCard.vue'))
export const DictDefList = defineAsyncComponent(() => import('./def/DictDefList.vue'))
export const DictDefPage = defineAsyncComponent(() => import('./def/DictDefPage.vue'))


// WORD

export const DictWordCard = defineAsyncComponent(() => import('./word/DictWordCard.vue'))
export const DictWordList = defineAsyncComponent(() => import('./word/DictWordList.vue'))
export const DictWordPage = defineAsyncComponent(() => import('./word/DictWordPage.vue'))


// LINK

export const DictLinkList = defineAsyncComponent(() => import('./link/DictLinkList.vue'))
export const DictLinkButton = defineAsyncComponent(() => import('./link/DictLinkButton.vue'))


