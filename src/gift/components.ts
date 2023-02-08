import { defineAsyncComponent } from 'vue'

export const GiftCard = defineAsyncComponent(() => import('./GiftCard.vue'))
export const GiftList = defineAsyncComponent(() => import('./GiftList.vue'))
export const GiftForm = defineAsyncComponent(() => import('./GiftForm.vue'))
export const GiftButton = defineAsyncComponent(() => import('./GiftButton.vue'))
export const GiftWallets = defineAsyncComponent(() => import('./GiftWallets.vue'))
export const GiftWallet = defineAsyncComponent(() => import('./GiftWallet.vue'))
export const GiftStatus = defineAsyncComponent(() => import('./GiftStatus.vue'))