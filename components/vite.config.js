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
  server: {
    fs: {
      allow: [".."],
    },
  },
  plugins: [
    vue(),
    Icons({
      /* options */
    }),
    Components({
      dirs: ["src"],
      extensions: ["vue"],
      directoryAsNamespace: false,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),
    WindiCSS(),
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, "/src/index.js"),
      name: "components",
      formats: ["es", "cjs"],
    },
    emptyOutDir: true,
    map: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        minifyInternalExports: false,
        chunkFileNames: "[name].[format].js",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "#": path.resolve(dirname, "/"),
      "#components": path.resolve(dirname, "src"),
      "#composables": path.resolve(dirname, "../composables/src/"),
    },
  },
});
