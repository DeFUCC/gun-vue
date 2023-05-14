import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

//@ts-ignore
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
    Unocss(),
  ],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: path.resolve(dirname, "../src/components.ts"),
      name: "components",
      formats: ["es"],
    },
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // external: ["vue"],
      output: {
        minifyInternalExports: false,
        manualChunks(id) {
          if (id.includes('composables')) {
            return 'composables';
          }
        },
        // chunkFileNames: "[name].[format].js",
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: "Vue",
        // },
      },
    },
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-browser.js',
      "#components": path.resolve(dirname, "../src/components.ts"),
      "#composables": path.resolve(dirname, "../src/composables.ts"),
    },
  },
});
