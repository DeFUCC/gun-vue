import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";

// import { VitePWA } from "vite-plugin-pwa";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";

import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
    // VitePWA({ // https://css-tricks.com/vitepwa-plugin-offline-service-worker/, https://vite-plugin-pwa.netlify.app/guide/prompt-for-update.html#runtime
    //   manifest: {
    //     name: "Gun-Vue",
    //     short_name: "@gun-vue",
    //     description: "Peer-to-peer graph database UI components",
    //     iconPath: "./media/gun-vue-logo.png",
    //     theme_color: "#ff0088",
    //     display: "standalone",
    //     homepage_url: "https://gun-vue.js.org",
    //     orientation: "portrait",
    //     providedBy: {
    //       name: "defucc",
    //       url: "https://defucc.me",
    //     },
    //     icons: [
    //       {
    //         src: "./media/gun-vue-logo.svg",
    //         type: "image/svg+xml",
    //         sizes: "512x512",
    //       },
    //       {
    //         src: "./media/gun-vue-logo.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //       {
    //         src: "./media/gun-vue-logo.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
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
