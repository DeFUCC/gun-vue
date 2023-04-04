import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

// import { VitePWA } from "vite-plugin-pwa";

import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

//@ts-expect-error
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* globals process */

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	server: {
		port: 3142,
		strictPort: true,
	},
	envPrefix: ['VITE_', 'TAURI_'],
	publicDir: "public",
	plugins: [
		vue(),
		Unocss(),
		Components({
			dirs: ["src/components"],
			extensions: ["vue"],
			directoryAsNamespace: false,
			globalNamespaces: ["global"],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			exclude: [/node_modules/, /\.git/],
		}),
		// VitePWA({
		// 	registerType: "autoUpdate",
		// 	workbox: {
		// 		maximumFileSizeToCacheInBytes: 4000000
		// 	},
		// 	manifest: {
		// 		name: "Gun-Vue",
		// 		short_name: "Gun-Vue",
		// 		description: "Reactive P2P webapps toolbox",
		// 		//@ts-expect-error
		// 		iconPath: "/media/gun-vue-logo.png",
		// 		theme_color: "#43b883",
		// 		display: "standalone",
		// 		homepage_url: "https://gun-vue.js.org",
		// 		orientation: "portrait",
		// 		providedBy: {
		// 			name: "defucc",
		// 			url: "https://defucc.me",
		// 		},
		// 		icons: [
		// 			{
		// 				src: "/media/gun-vue-logo.svg",
		// 				type: "image/svg+xml",
		// 				sizes: "512x512",
		// 			},
		// 			{
		// 				src: "/media/gun-vue-logo.png",
		// 				sizes: "192x192",
		// 				type: "image/png",
		// 				purpose: "any maskable",
		// 			},
		// 			{
		// 				src: "/media/gun-vue-logo.png",
		// 				sizes: "512x512",
		// 				type: "image/png",
		// 				purpose: "any maskable",
		// 			},
		// 		],
		// 	},
		// }),
	],
	base: './',
	build: {
		outDir: "../_dist/",
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
		include: ["vue", "vue-router", "@vueuse/core"],
	},
	resolve: {
		alias: {
			"#components": path.resolve(dirname, "../src/components"),
			"#composables": path.resolve(dirname, "../src/composables"),
		},
	},
});
