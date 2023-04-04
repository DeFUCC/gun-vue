import { defineConfig } from "vitepress";

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
	title: "Gun-Vue",
	base: "/composables/",
	outDir: "../app/public/composables",
	vite: {
		resolve: {
			alias: {
				"#components": path.resolve(dirname, "../../src/components"),
				"#composables": path.resolve(dirname, "../../src/composables"),
			},
		},
	}
});
