import { createApp } from "vue";
import App from "./app.vue";

import "virtual:windi.css";
import "@components/styles/index.css";

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router).mount("#app");

import { room } from "@composables";

router.beforeEach((to, from, next) => {
  if (!room.isRoot && Object.keys(to.query).length == 0) {
    next({ ...to, query: { room: room.pub } });
  } else {
    if (to.query.room) {
      room.pub = to.query.room;
    }
    next();
  }
});
