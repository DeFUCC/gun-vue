import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import generateSitemap from 'vite-plugin-pages-sitemap'

import { VitePWA } from "vite-plugin-pwa";

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
    port: 3142,
  },
  publicDir: "public",
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
      routeBlockLang: 'yaml',
      onRoutesGenerated: routes => (generateSitemap({ routes, hostname: 'https://gun-vue.js.org' })),
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
      dirs: ["src/components"],
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
    // VitePWA({
    //   registerType: "autoUpdate",
    //   workbox: {
    //     maximumFileSizeToCacheInBytes: 4000000
    //   },
    //   manifest: {
    //     name: "Gun-Vue",
    //     short_name: "Gun-Vue",
    //     description: "Peer-to-peer graph database UI components",
    //     iconPath: "./gun-vue-logo.png",
    //     theme_color: "#43b883",
    //     display: "standalone",
    //     homepage_url: "https://gun-vue.js.org",
    //     skylink: "AQC7upIKykiM-nYJA6Ac-Q4PHRtYsHDVS1Ne-M2ELcZU2A",
    //     orientation: "portrait",
    //     providedBy: {
    //       name: "defucc",
    //       url: "https://defucc.me",
    //     },
    //     icons: [
    //       {
    //         src: "./gun-vue-logo.svg",
    //         type: "image/svg+xml",
    //         sizes: "512x512",
    //       },
    //       {
    //         src: "./gun-vue-logo.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //       {
    //         src: "./gun-vue-logo.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
  ],
  base: './',
  build: {
    outDir: "../_dist/",
    target: "esnext",
    sourcemap: true,
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
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
  resolve: {
    alias: {
      "#components": path.resolve(dirname, "../components/src"),
      "#composables": path.resolve(dirname, "../composables/src"),
    },
  },
});
