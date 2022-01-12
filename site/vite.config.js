import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3324,
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
