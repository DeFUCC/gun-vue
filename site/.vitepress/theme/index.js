// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";

import "virtual:windi.css";
import "@gun-vue/components/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {},
};
