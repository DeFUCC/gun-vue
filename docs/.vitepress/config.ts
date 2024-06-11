import { defineConfig, DefaultTheme } from "vitepress";

import { sidebar } from "./navigation";
import path from "path";
import pack from "../package.json";

export default defineConfig({
	ignoreDeadLinks: true,
	lang: "en-US",
	title: "Gun-Vue",
	titleTemplate: "Gun-Vue docs",
	description: "Reactive p2p crypto graph app toolkit",
	base: "/docs/",
	outDir: "../app/public/docs",
	themeConfig: {
		logo: "gun-vue-logo.svg",
		search: {
			provider: "local",
		},
		sidebar,
		socialLinks: [
			{ icon: "github", link: "https://github.com/DeFUCC/gun-vue" },
			{ icon: "youtube", link: "https://www.youtube.com/@defucc" },
		],
		footer: {
			message: "MIT",
			copyright: `v.${pack.version}`,
		},
	},
	async transformPageData(pageData, { siteConfig }) {
		const pages = siteConfig?.pages.map((p) => {
			// let id = path.join(siteConfig.site.base, p)
			let id = p;
			id = id.replace(/\/index\.md$/, "/");
			id = id.replace(/\.md$/, "");
			return id;
		});
		return {
			pages,
		};
	},
});
