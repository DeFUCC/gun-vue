import { defineAsyncComponent } from 'vue'

export const GunGraph = defineAsyncComponent(() => import("./GunGraph.vue"));
export const GunRelay = defineAsyncComponent(() => import("./GunRelay.vue"));
export const GunRelayList = defineAsyncComponent(() => import("./GunRelayList.vue"));
export const GunTools = defineAsyncComponent(() => import("./GunTools.vue"));