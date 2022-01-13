import { defineConfig } from "vitepress";

const metaData = {
  title: "Gun-vue",
  description:
    "The Vue.js + GunDb component library for easy p2p app creativity",
  site: "https://gun-vue.js.org",
  locale: "en",
  icon: "/media/gun-vue-logo.svg",
  image: "/media/gun-vue-card.png",
  author: "davay",
  twitter: "defucc",
  tags: "gun, vue, p2p, ui, components, library, db",
};

export default defineConfig({
  // base: "./",
  title: metaData.title,
  outDir: "../_dist/",
  vite: {
    publicDir: "../_public",
    server: {
      port: 3324,
      fs: {
        allow: [".."],
      },
    },
    build: {
      chunkSizeWarningLimit: 3000000,
    },
  },
  themeConfig: {
    logo: "/media/gun-vue-logo.svg",
    repo: "https://github.com/DeFUCC/gun-vue",
    nav: [
      { text: "Components", link: "/components/" },
      {
        text: "Composables",
        link: "/composables/",
      },
      {
        text: "Demos",
        link: "/demos/",
      },
      { text: "Relay", link: "/relay/" },
      { text: "Blog", link: "/blog/" },
    ],
  },
  head: [
    ["meta", { name: "author", content: metaData?.author }],
    ["meta", { name: "keywords", content: metaData?.tags }],
    ["link", { rel: "icon", type: "image/svg+xml", href: metaData.icon }],
    ["link", { rel: "manifest", href: "./manifest.json" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "512x512",
        href: "/media/gun-vue-logo.png",
      },
    ],
    ["link", { rel: "mask-icon", color: "#ffffff", href: metaData.icon }],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "white-translucent",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "HandheldFriendly", content: "True" }],
    ["meta", { name: "MobileOptimized", content: "320" }],
    ["meta", { name: "theme-color", content: "#0ea5e9" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: metaData?.twitter }],
    ["meta", { name: "twitter:title", value: metaData?.twitter }],
    ["meta", { name: "twitter:description", value: metaData.description }],
    //@ts-ignore
    ["meta", { name: "twitter:image", content: metaData?.image }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: metaData.locale }],
    ["meta", { property: "og:site", content: metaData.site }],
    ["meta", { property: "og:site_name", content: metaData.title }],
    ["meta", { property: "og:title", content: metaData.title }],
    //@ts-ignore
    ["meta", { property: "og:image", content: metaData?.image }],
    ["meta", { property: "og:description", content: metaData.description }],
  ],
});
