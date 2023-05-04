import { defineAsyncComponent } from 'vue'

export const TorrentUpload = defineAsyncComponent(() => import("./TorrentUpload.vue"));
export const TorrentDownload = defineAsyncComponent(() => import("./TorrentDownload.vue"));

export const FileCard = defineAsyncComponent(() => import("./FileCard.vue"));
export const FileHash = defineAsyncComponent(() => import("./FileHash.vue"));