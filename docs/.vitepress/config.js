import { defineConfig } from "vitepress";

import path from "path";
import { fileURLToPath } from "url";

import Unocss from 'unocss/vite'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
	title: "Gun-Vue",
	base: "/docs/",
	outDir: "../app/public/docs",
	vite: {
		plugins: [
			Unocss(),
		],
		resolve: {
			alias: {
				"#components": path.resolve(dirname, "../../src/components"),
				"#composables": path.resolve(dirname, "../../src/composables"),
			},
		},
	}
});
