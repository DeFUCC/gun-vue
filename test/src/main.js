import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { GunVuePlugin } from "@gun-vue/components";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(GunVuePlugin);

app.mount("#app");
