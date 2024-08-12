/**
 * Handle mouse movement inside an SVG
 * @module Theme
 * @group UI
 * */

import { reactive } from 'vue'
import { useDark } from "@vueuse/core"

export const theme = reactive({
  dark: useDark()
})

