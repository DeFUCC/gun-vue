import { defineConfig, DefaultTheme } from "vitepress";

import { sidebar } from './navigation'

export default defineConfig({
	lang: "en-US",
	title: " ",
	description: 'Reactive p2p crypto graph app toolkit',
	base: "/docs/",
	outDir: "../app/public/docs",
	themeConfig: {
		logo: 'gun-vue-logo.svg',
		search: {
			provider: 'local'
		},
		sidebar
	}
});
