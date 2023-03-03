import { createApp } from "vue";
import App from "./app.vue";

import '@unocss/reset/tailwind.css'
import 'uno.css'
import "../../src/styles/index.css"; // use '@gun-vue/components/style.css' in your apps

import { createRouter, createWebHashHistory } from "vue-router";
// //@ts-expect-error
//import routes from "~pages";

import routes from '../../src/routes'

// import FloatingVue from 'floating-vue'

import { currentRoom, useUser } from "../../src/composables";
import { GunVuePlugin } from "../../src/components"; // use '@gun-vue/components' in your apps


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



router.beforeEach((to, from, next) => {
  const { user } = useUser()

  if (to.meta.requiresAuth && !user.pub) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: '/auth/',
      // save the location we were at to come back later
      query: { redirect: from.fullPath },
    })
  } else if (!currentRoom.isRoot && !to.query?.room) {
    next({ ...to, query: { room: currentRoom.pub } });
  } else {
    next();
  }
});


