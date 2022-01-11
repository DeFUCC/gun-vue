import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3323,
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core", "@gun-vue/components"],
  },
  build: {
    rollupOptions: {
      manualChunks: {
        gunvue: ["@gun-vue/components"],
      },
    },
  },
});
