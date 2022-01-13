// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";

import "./styles/index.css";
import "@gun-vue/components/dist/style.css";

import GunVue from "../components/load-component.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component("GunVue", GunVue);
  },
};
