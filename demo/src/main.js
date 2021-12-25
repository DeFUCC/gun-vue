import { createApp } from "vue";
import App from "./app.vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

const app = createApp(App);

app.use(router).mount("#app");
