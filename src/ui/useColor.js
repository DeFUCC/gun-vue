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
		lightness: [0.2, 0.35, 0.4],
	}),
	dark: new ColorHash({
		saturation: [0.02, 0.5, 0.6],
		lightness: [0.18, 0.2, 0.5],
	}),
};

export function useColor(palette = "deep") {
	if (typeof palette == "object") {
		return new ColorHash(palette);
	}
	return color[palette];
}
