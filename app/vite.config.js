import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile"
import Unocss from 'unocss/vite'

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
		viteSingleFile(),
		viteBuildScript(),
	],
	base: './',
	build: {
		outDir: "../docs/public/app/",
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



function viteBuildScript() {
	return {
		name: 'vite-build-script',
		transformIndexHtml(html) {
			if (process.env.NODE_ENV === 'production') {
				return html.replace(/<!-- Production build insert -->/, `<script async defer src="https://stat.defucc.me/script.js" data-website-id="9e6f4375-b00a-4348-9aed-4101363b2f5c"></script>
          
          <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope: ', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed: ', error);
          });
      });
    }
  </script>
	
	`);
			}
			return html;
		},
	};
}
