import { createApp } from "vue";
import App from "./app.vue";

import '@unocss/reset/tailwind.css'
import 'uno.css'
import "./styles/index.css"; // use '@gun-vue/components/style.css' in your apps

import { createRouter, createWebHashHistory } from "vue-router";

import routes from './routes'

// import FloatingVue from 'floating-vue'

import { GunVuePlugin } from "./components"; // use '@gun-vue/components' in your apps


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





