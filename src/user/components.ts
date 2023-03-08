// USER
import { defineAsyncComponent } from 'vue'

export const UserAvatar = defineAsyncComponent(() => import("./UserAvatar.vue"));
export const UserGraph = defineAsyncComponent(() => import("./UserGraph.vue"));
export const UserHome = defineAsyncComponent(() => import("./UserHome.vue"));
export const UserIcon = defineAsyncComponent(() => import("./UserIcon.vue"));
export const UserList = defineAsyncComponent(() => import("./UserList.vue"));

export const UserPanel = defineAsyncComponent(() => import("./UserPanel.vue"));
export const UserProfile = defineAsyncComponent(() => import("./UserProfile.vue"));
export const UserProfileField = defineAsyncComponent(() => import("./UserProfileField.vue"));
export const UserRooms = defineAsyncComponent(() => import("./UserRooms.vue"));