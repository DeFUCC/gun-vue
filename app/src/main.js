import { createApp } from "vue";
import App from "./app.vue";

import '@unocss/reset/tailwind.css'
import 'uno.css'

// import "virtual:windi.css";
import "#components/styles/index.css"; // use '@gun-vue/components/styles/index.css' in your apps

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

// import FloatingVue from 'floating-vue'

import { GunVuePlugin } from "#components"; // use '@gun-vue/components' in your apps

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
// app.use(FloatingVue)
app.use(GunVuePlugin)
app.use(router).mount("#app");

import { currentRoom } from "#composables";

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});
