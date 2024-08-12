import { defineAsyncComponent } from 'vue'

export const QrLoad = defineAsyncComponent(() => import("./QrLoad.vue"))
export const QrShow = defineAsyncComponent(() => import("./QrShow.vue"))
export const QrShare = defineAsyncComponent(() => import("./QrShare.vue"));
