import { createApp } from "vue";
import App from "./app.vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

const app = createApp(App);

app.use(router).mount("#app");

import { room } from "@composables";

router.beforeEach((to, from, next) => {
  if (!room.isRoot && !to.query?.room) {
    next({ ...to, query: { room: room.pub } });
  } else {
    next();
  }
});
