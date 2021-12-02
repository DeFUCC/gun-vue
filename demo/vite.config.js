import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import path from "path";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: "pages",
    }),
    WindiCSS({
      scan: {
        dirs: ["../components", "components", "pages", "styles"],
        include: ["index.md"],
        exclude: ["**/examples/**/*", "/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: [
        "vue",
        {
          "@vueuse/core": ["useStorage"],
        },
      ],
    }),
    Icons({
      /* options */
    }),
    Components({
      dirs: ["components", "../components"],
      extensions: ["vue"],
      directoryAsNamespace: true,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/"),
      "@styles": path.resolve(__dirname, "styles"),
      "@assets": path.resolve(__dirname, "assets"),
      "@components": path.resolve(__dirname, "components"),
      "@use": path.resolve(__dirname, "use"),
      "@store": path.resolve(__dirname, "store"),
    },
  },
});
