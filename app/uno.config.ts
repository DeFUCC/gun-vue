import { defineConfig,presetUno, presetIcons, presetTypography, transformerDirectives, extractorSplit } from "unocss";
import extractorPug from '@unocss/extractor-pug'

export default defineConfig({
      presets: [
        presetIcons({
          scale: 1.2,
        }),
        presetUno(),
        presetTypography()
      ],
      transformers: [
        transformerDirectives(),
      ],
      extractors: [
        extractorPug(),
        extractorSplit,
      ],
    })