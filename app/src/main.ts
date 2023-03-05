import { createApp } from "vue";
import App from "./app.vue";

import '@unocss/reset/tailwind.css'
import 'uno.css'
import "../../src/styles/index.css"; // use '@gun-vue/components/style.css' in your apps

import { createRouter, createWebHashHistory } from "vue-router";

import routes from '../../src/routes'

// import FloatingVue from 'floating-vue'

import { currentRoom, relay, useUser } from "../../src/composables";
import { GunVuePlugin } from "../../src/components"; // use '@gun-vue/components' in your apps

import config from '../../gun.config.json'


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



router.beforeEach((to, from) => {
  const { user } = useUser()

  if (to.meta.requiresAuth && !user.pub) {
    return {
      path: '/auth/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }

  if (!currentRoom.isRoot && !to.query?.room) {
    return { ...to, query: { ...to.query, room: currentRoom.pub, } }
  }

  if (relay.peer != config.relay && !to.query?.relay) {
    return { ...to, query: { ...to.query, relay: relay.peer } }
  }

  return true
});


