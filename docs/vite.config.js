import { defineConfig } from "vite"
import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [
    Unocss(),
  ],
  build: {
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
  },
  resolve: {
    alias: {
      "#components": path.resolve(dirname, "../src/components"),
      "#composables": path.resolve(dirname, "../src/composables"),
    },
  },
})