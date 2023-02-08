// POSTS
import { defineAsyncComponent } from 'vue'


export const PostCard = defineAsyncComponent(() => import("./PostCard.vue"))
export const PostForm = defineAsyncComponent(() => import("./PostForm.vue"))
export const PostGraph = defineAsyncComponent(() => import("./PostGraph.vue"))
export const PostLine = defineAsyncComponent(() => import("./PostLine.vue"))
export const PostLink = defineAsyncComponent(() => import("./PostLink.vue"))
export const PostList = defineAsyncComponent(() => import("./PostList.vue"))
export const PostPage = defineAsyncComponent(() => import("./PostPage.vue"))


// ACTION

export const PostActionStar = defineAsyncComponent(() => import("./action/PostActionStar.vue"))
export const PostActionUpdate = defineAsyncComponent(() => import("./action/PostActionUpdate.vue"))
export const PostActionBan = defineAsyncComponent(() => import("./action/PostActionBan.vue"))
export const PostActionReact = defineAsyncComponent(() => import("./action/PostActionReact.vue"))

// REACTION

export const PostReactionButton = defineAsyncComponent(() => import("./reaction/PostReactionButton.vue"))
export const PostReactionTabs = defineAsyncComponent(() => import("./reaction/PostReactionTabs.vue"))

