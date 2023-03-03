import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

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
  build: {
    lib: {
      entry: path.resolve(dirname, "../src/components.ts"),
      name: "components",
      formats: ["es"],
    },
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
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
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "#components": path.resolve(dirname, "../src/components.ts"),
      "#composables": path.resolve(dirname, "../src/composables.ts"),
    },
  },
});
