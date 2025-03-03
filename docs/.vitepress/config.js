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
		['meta', { charset: 'UTF-8' }],
		['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
		['meta', { name: 'description', content: 'Gun-Vue: The Peer-to-Peer Web App Toolkit' }],
		['meta', { name: 'keywords', content: 'p2p, peer-to-peer, decentralized, vue, vue3, gun, gundb, e2ee, end-to-end encryption, crypto, web3, dapp, pwa, offline-first, real-time, reactive, composables, components, webrtc, webtorrent, social, chat, file sharing' }],
		['meta', { name: 'theme-color', content: '#256448' }],
		['link', { rel: 'icon', href: '/media/gun-vue-logo.svg', sizes: 'any', type: 'image/svg+xml' }],
		['link', { rel: 'mask-icon', href: '/media/gun-vue-logo.svg', color: '#FFFFFF' }],
		['link', { rel: 'apple-touch-icon', href: '/media/gun-vue-logo.png' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
		// Open Graph / Facebook
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:title', content: 'Gun-Vue: The Peer-to-Peer Web App Toolkit' }],
		['meta', { property: 'og:description', content: 'Open source library and tech demo for p2p reactive graph development' }],
		['meta', { property: 'og:image', content: 'https://gun-vue.js.org/media/gun-vue-kit.png' }],
		// Twitter
		['meta', { name: 'twitter:card', content: 'summary_large_image' }],
		['meta', { name: 'twitter:site', content: '@defucc' }],
		['meta', { name: 'twitter:creator', content: '@defucc' }],
		['meta', { name: 'twitter:title', content: 'Gun-Vue: The Peer-to-Peer Web App Toolkit' }],
		['meta', { name: 'twitter:description', content: 'Open source library and tech demo for p2p reactive graph development' }],
		['meta', { name: 'twitter:image', content: 'https://gun-vue.js.org/media/gun-vue-kit.png' }]
	],
	transformHead({ pageData }) {
		return [
			process.env.NODE_ENV === "production" && ["script", { async: true, defer: true, "data-website-id": "63481594-170a-40b4-b3b3-7b62799d0dd2", src: "https://stat.defucc.me/script.js" }],
		]
	}
});
