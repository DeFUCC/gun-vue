import { defineConfig } from "vitepress";

import { sidebar } from "./navigation";
import pack from "../package.json";

export default defineConfig({
	ignoreDeadLinks: true,
	lang: "en-US",
	title: "Gun-Vue",
	titleTemplate: "Gun-Vue docs",
	description: "Reactive p2p crypto graph app toolkit",
	base: "/",
	outDir: "../_dist",
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
	transformHead({ pageData }) {
		return [
			process.env.NODE_ENV === "production" && ["script", { async: true, defer: true, "data-website-id": "63481594-170a-40b4-b3b3-7b62799d0dd2", src: "https://stat.defucc.me/script.js" }],
		]
	}
});
