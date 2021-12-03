const path = require("path");
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    Icons({
      /* options */
    }),
    Components({
      dirs: ["./"],
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
        dirs: ["data", "user", "./"],
        include: ["index.md"],
        exclude: ["**/examples/**/*", "/node_modules/"],
        fileExtensions: ["vue", "ts", "md"],
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "/src/index.js"),
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
