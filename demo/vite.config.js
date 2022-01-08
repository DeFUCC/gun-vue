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
  server: {
    port: 3042,
  },
  publicDir: "public",
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
    }),
    WindiCSS({
      scan: {
        dirs: ["../components/src", "src"],
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
      imports: ["vue"],
    }),
    Icons({
      /* options */
    }),
    Components({
      dirs: ["src/components", "../components/src"],
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
  build: {
    target: "esnext",
    brotliSize: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/"),
      "@components": path.resolve(__dirname, "../components/src"),
      "@composables": path.resolve(__dirname, "../composables/index"),
    },
  },
});
