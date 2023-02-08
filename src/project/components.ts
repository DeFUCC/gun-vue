import { defineAsyncComponent } from 'vue'

export const ProjectList = defineAsyncComponent(() => import("./ProjectList.vue"))
export const ProjectCard = defineAsyncComponent(() => import("./ProjectCard.vue"))
export const ProjectPage = defineAsyncComponent(() => import("./ProjectPage.vue"))
export const ProjectFunding = defineAsyncComponent(() => import("./ProjectFunding.vue"))
