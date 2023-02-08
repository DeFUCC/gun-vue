// export { default as AccountAvatar } from "./AccountAvatar.vue";
// export { default as AccountBadge } from "./AccountBadge.vue";
// export { default as AccountProfile } from "./AccountProfile.vue";
// export { default as AccountReactions } from "./AccountReactions.vue";
// export { default as AccountSelect } from "./AccountSelect.vue";
// export { default as AccountPetname } from "./AccountPetname.vue";
// export { default as AccountHome } from "./AccountHome.vue";
//export { default as AccountStars } from "./AccountStars.vue";

import { defineAsyncComponent } from 'vue'
export const AccountHome = defineAsyncComponent(() => import('./AccountHome.vue'))
export const AccountPetname = defineAsyncComponent(() => import('./AccountPetname.vue'))
// export const AccountStars = defineAsyncComponent(() => import('./AccountStars.vux'))
export const AccountReactions = defineAsyncComponent(() => import('./AccountReactions.vue'))
export const AccountSelect = defineAsyncComponent(() => import('./AccountSelect.vue'))
export const AccountProfile = defineAsyncComponent(() => import('./AccountProfile.vue'))
export const AccountBadge = defineAsyncComponent(() => import('./AccountBadge.vue'))
export const AccountAvatar = defineAsyncComponent(() => import('./AccountAvatar.vue'))