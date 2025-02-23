import { defineAsyncComponent } from 'vue'

export const TorrentUpload = defineAsyncComponent(() => import("./TorrentUpload.vue"));
export const TorrentDownload = defineAsyncComponent(() => import("./TorrentDownload.vue"));

export const FileCard = defineAsyncComponent(() => import("./FileCard.vue"));
export const FileHash = defineAsyncComponent(() => import("./FileHash.vue"));
export const FileShare = defineAsyncComponent(() => import("./FileShare.vue"));
export const FileInfo = defineAsyncComponent(() => import("./FileInfo.vue"));
export const FileList = defineAsyncComponent(() => import("./FileList.vue"));