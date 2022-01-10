import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    Icons({
      /* options */
    }),
    Components({
      dirs: ["src"],
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
    WindiCSS({
      scan: {
        dirs: ["src"],
        include: ["index.md"],
        exclude: ["/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "/"),
      "@components": path.resolve(dirname, "src"),
      "@composables": path.resolve(dirname, "../composables/index"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, "/src/index.js"),
      name: "components",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
