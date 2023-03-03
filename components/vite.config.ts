import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Unocss from 'unocss/vite'
import { presetUno, presetIcons, transformerDirectives, extractorSplit } from "unocss";
import extractorPug from '@unocss/extractor-pug'
import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'

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
    Components({
      dirs: ["../src"],
      extensions: ["vue"],
      directoryAsNamespace: false,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/, /\.story\.vue/],
    }),
    Unocss({
      presets: [
        presetIcons({
          scale: 1.2,
          extraProperties: presetIconExtraProperties,
        }),
        presetUno(),
        // anu-vue preset
        presetAnu(),
        // default theme preset
        presetThemeDefault(),
      ],
      transformers: [
        transformerDirectives(),
      ],
      extractors: [
        extractorPug(),
        extractorSplit,
      ],
      include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
    }),
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
