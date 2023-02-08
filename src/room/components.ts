import { defineAsyncComponent } from 'vue'

// ROOM

export const RoomCard = defineAsyncComponent(() => import('./RoomCard.vue'))
export const RoomFeature = defineAsyncComponent(() => import('./RoomFeature.vue'))
export const RoomFeatureIcon = defineAsyncComponent(() => import('./RoomFeatureIcon.vue'))
export const RoomForm = defineAsyncComponent(() => import('./RoomForm.vue'))
export const RoomLogo = defineAsyncComponent(() => import('./RoomLogo.vue'))
export const RoomList = defineAsyncComponent(() => import('./RoomList.vue'))
export const RoomPage = defineAsyncComponent(() => import('./RoomPage.vue'))
export const RoomProfile = defineAsyncComponent(() => import("./RoomProfile.vue"))
export const RoomButton = defineAsyncComponent(() => import('./RoomButton.vue'))
export const RoomActions = defineAsyncComponent(() => import('./RoomActions.vue'))