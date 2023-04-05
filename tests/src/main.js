import { createApp } from "vue";
import App from "./App.vue";
import router from "./views";
import { GunVuePlugin } from "@gun-vue/components";


import "./assets/main.css";

import "@gun-vue/components/style.css"

const app = createApp(App);

app.use(router);

app.use(GunVuePlugin);

app.mount("#app");
