/**
 * Deterministic colors derived from oub keys, hashes or any other string data
 * @module useColor
 * */

import ColorHash from "color-hash";

const color = {
  light: new ColorHash({
    saturation: [0.05, 0.08, 0.22],
    lightness: [0.85, 0.87, 0.9],
  }),
  pale: new ColorHash({
    saturation: [0.05, 0.42, 0.52],
    lightness: [0.75, 0.77, 0.9],
  }),
  regular: new ColorHash({
    saturation: [0.1, 0.5, 0.7],
    lightness: [0.3, 0.5, 0.7],
  }),
  deep: new ColorHash({
    saturation: [0.5, 0.6, 0.7],
    lightness: [0.5, 0.55, 0.6],
  }),
  dark: new ColorHash({
    saturation: [0.02, 0.5, 0.6],
    lightness: [0.18, 0.2, 0.5],
  }),
};

/**
 * Get a color generator of a certain palette
 * @param {('light'|'regular'|'deep'|'dark')} palette
 * @returns {ColorHash} Color-Hash instance
 * @see https://github.com/zenozeng/color-hash
 * @example
 * import {useColor} from '@gun-vue/composables'
 * const colorDeep = useColor('deep')
 * const color = colorDeep.hex('any text data')
 * // color == '#e052ae'
 */

export function useColor(palette = "deep") {
  if (typeof palette == "object") {
    return new ColorHash(palette);
  }
  return color[palette];
}
