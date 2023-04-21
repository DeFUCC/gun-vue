import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from 'unocss/vite'


import path from "path";
import { fileURLToPath } from "url";

// // @ts-expect-error
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* globals process */

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	server: {
		port: 3142,
		strictPort: true,
		fs: {
			allow: ['../']
		}
	},
	envPrefix: ['VITE_', 'TAURI_'],
	publicDir: "none",
	plugins: [
		vue(), Unocss()
	],
	define: {
		'process.env': {}
	},
	base: './',
	build: {
		lib: {
			entry: path.resolve(dirname, 'app.ts'),
			name: 'Gun-Vue app',
			// the proper extensions will be added
			fileName: 'app',
			formats: ["es"],
		},
		outDir: "dist",
		target: "esnext",
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		sourcemap: !!process.env.TAURI_DEBUG,
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
		include: ["vue", "@vueuse/core"],
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm-bundler.js',
			"#components": path.resolve(dirname, "../src/components"),
			"#composables": path.resolve(dirname, "../src/composables"),
		},
	},
});
