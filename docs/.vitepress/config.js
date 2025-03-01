import { defineConfig } from "vitepress";

import { sidebar } from "./navigation";
import pack from "../package.json";

export default defineConfig({
	ignoreDeadLinks: true,
	lang: "en-US",
	title: "Gun-Vue",
	titleTemplate: "Gun-Vue docs",
	description: "The Peer-to-Peer Web App Toolkit",
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
	head: [
		['meta', { name: 'keywords', content: 'p2p, peer-to-peer, decentralized, vue, vue3, gun, gundb, e2ee, end-to-end encryption, crypto, web3, dapp, pwa, offline-first, real-time, reactive, composables, components, webrtc, webtorrent, social, chat, file sharing' }]
	],
	transformHead({ pageData }) {
		return [
			process.env.NODE_ENV === "production" && ["script", { async: true, defer: true, "data-website-id": "63481594-170a-40b4-b3b3-7b62799d0dd2", src: "https://stat.defucc.me/script.js" }],
		]
	}
});
