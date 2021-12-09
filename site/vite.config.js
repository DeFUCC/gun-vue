import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: ["vue"],
    }),
    Components({
      dirs: [".vitepress/theme/components", "../components/src"],
      extensions: ["vue", "ts", "js"],
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
    Icons({
      defaultStyle: "vertical-align: middle;",
    }),
    WindiCSS({
      scan: {
        dirs: ["../components/src", ".vitepress", "./"],
        include: ["index.md"],
        exclude: ["**/examples/**/*", "/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["vue"],
  },
  build: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@composables": path.resolve(__dirname, "../composables/index"),
    },
  },
});
