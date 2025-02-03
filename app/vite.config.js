import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// import { VitePWA } from "vite-plugin-pwa";

import { viteSingleFile } from "vite-plugin-singlefile"

import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	server: {
		port: 3142,
		strictPort: false,
		fs: {
			allow: ['../']
		}
	},
	envPrefix: ['VITE_'],
	publicDir: "public",
	plugins: [
		vue(),
		Unocss(),
		viteSingleFile()
	],
	base: './',
	build: {
		outDir: "../_dist/",
		target: "esnext",
		minify: 'esbuild',
		sourcemap: false,
		assetsInlineLimit: 100000000,
		chunkSizeWarningLimit: 100000000,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
			},
		}
	},
	optimizeDeps: {
		include: ["vue", "vue-router", "@vueuse/core"],
	},
	rollupOptions: {
		input: {
			index: path.resolve(dirname, "./index.html")
		}
	},
	resolve: {
		alias: {
			"#components": path.resolve(dirname, "../src/components"),
			"#composables": path.resolve(dirname, "../src/composables"),
		},
	},
});
