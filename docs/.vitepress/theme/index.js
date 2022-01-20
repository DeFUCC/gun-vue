// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";

import "virtual:windi.css";
import "./styles/index.css";
import "@gun-vue/components/dist/style.css";

import GunVue from "./components/GunVue.vue";
import Blog from "./components/Blog.vue";

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // register global components
    app.component("GunVue", GunVue);
    app.component("Blog", Blog);
  },
};
