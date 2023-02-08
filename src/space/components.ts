//SPACE

import { defineAsyncComponent } from 'vue'

export const SpacePlane = defineAsyncComponent(() => import('./SpacePlane.vue'))
export const SpaceGuest = defineAsyncComponent(() => import('./SpaceGuest.vue'))
export const SpaceArrow = defineAsyncComponent(() => import('./SpaceArrow.vue'))
export const SpaceDraw = defineAsyncComponent(() => import('./SpaceDraw.vue'))