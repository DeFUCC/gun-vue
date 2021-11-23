import { createApp } from 'vue'
import App from './app.vue'

import 'virtual:windi.css'
import '@styles/transitions.css'

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
