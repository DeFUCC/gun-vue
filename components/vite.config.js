import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Unocss from 'unocss/vite'
import { presetUno, presetIcons, transformerDirectives, extractorSplit } from "unocss";
import extractorPug from '@unocss/extractor-pug'

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
    Components({
      dirs: ["src"],
      extensions: ["vue"],
      directoryAsNamespace: false,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
    }),
    // WindiCSS(),
    Unocss({
      presets: [
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
        presetUno()
      ],
      transformers: [
        transformerDirectives(),
      ],
      extractors: [
        extractorPug(),
        extractorSplit,
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, "/src/index.ts"),
      name: "components",
      formats: ["es"],
    },
    emptyOutDir: true,
    map: true,
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
      "#": path.resolve(dirname, "/"),
      "#components": path.resolve(dirname, "src"),
      "#composables": path.resolve(dirname, "../composables/src/"),
    },
  },
});
