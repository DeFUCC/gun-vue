import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
        dirs: ["src", "../components/src"],
        include: ["index.md"],
        exclude: ["**/examples/**/*", "/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
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
    outDir: "../_dist/",
    target: "esnext",
    brotliSize: true,
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
      "@": path.resolve(dirname, "/"),
      "@components": path.resolve(dirname, "../components/src"),
      "@composables": path.resolve(dirname, "../composables/src"),
    },
  },
});
