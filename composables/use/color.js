import ColorHash from "color-hash";

export { ColorHash };

export const color = {
  light: new ColorHash({
    saturation: [0.05, 0.08, 0.22],
    lightness: [0.85, 0.87, 0.9],
  }),
  regular: new ColorHash({
    saturation: [0.1, 0.5, 0.7],
    lightness: [0.3, 0.5, 0.7],
  }),
  deep: new ColorHash({
    saturation: [0.5, 0.7, 0.9],
    lightness: [0.5, 0.6, 0.7],
  }),
  dark: new ColorHash({
    saturation: [0.02, 0.05, 0.08],
    lightness: [0.18, 0.2, 0.3],
  }),
};

export function useColor(palette = "deep") {
  return color[palette];
}
