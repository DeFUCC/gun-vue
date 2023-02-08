import { defineAsyncComponent } from 'vue'

export const UtilGraph = defineAsyncComponent(() => import("./UtilGraph.vue"));
export const UtilPulse = defineAsyncComponent(() => import("./UtilPulse.vue"));
export const UtilRelay = defineAsyncComponent(() => import("./UtilRelay.vue"));
export const UtilRelayList = defineAsyncComponent(() => import("./UtilRelayList.vue"));
export const UtilShare = defineAsyncComponent(() => import("./UtilShare.vue"));
export const UtilTools = defineAsyncComponent(() => import("./UtilTools.vue"));