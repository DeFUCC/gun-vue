import { defineConfig } from "vitepress";

export default defineConfig({
  // base: "./",
  title: "@gun-vue",
  outDir: "../_dist/",
  vite: {
    publicDir: "../_public",
    server: {
      port: 3324,
      fs: {
        allow: [".."],
      },
    },
  },
});
