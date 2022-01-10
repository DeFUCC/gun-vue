import { createApp } from "vue";
import App from "./app.vue";

import "virtual:windi.css";
import "@gun-vue/components/dist/style.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router).mount("#app");
