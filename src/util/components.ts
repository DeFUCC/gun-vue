import { defineAsyncComponent } from 'vue'

export const UtilShare = defineAsyncComponent(() => import("./UtilShare.vue"));
export const UtilTools = defineAsyncComponent(() => import("./UtilTools.vue"));