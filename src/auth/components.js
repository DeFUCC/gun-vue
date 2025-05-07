// USER
import { defineAsyncComponent } from 'vue'


export const AuthForm = defineAsyncComponent(() => import("./AuthForm.vue"));
export const AuthCreate = defineAsyncComponent(() => import("./AuthCreate.vue"));
export const AuthPanel = defineAsyncComponent(() => import("./AuthPanel.vue"));
export const AuthCredentials = defineAsyncComponent(() => import("./AuthCredentials.vue"));