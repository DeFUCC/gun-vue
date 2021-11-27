import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import path from "path";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";

const moduleExclude = (match) => {
  const m = (id) => id.indexOf(match) > -1;
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id;
    },
    load(id) {
      if (m(id)) return `export default {}`;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: "pages",
    }),
    WindiCSS({
      scan: {
        dirs: ["./"],
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
      dirs: ["components"],
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
    moduleExclude("text-encoding"),
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
  optimizeDeps: {
    include: [
      "gun",
      "gun/gun",
      "gun/sea",
      "gun/sea.js",
      "gun/lib/then",
      "gun/lib/webrtc",
      "gun/lib/radix",
      "gun/lib/radisk",
      "gun/lib/store",
      "gun/lib/rindexed",
    ],
  },
});
