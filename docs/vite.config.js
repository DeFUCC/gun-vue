import { defineConfig } from "vite";

import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  server: {
    port: 3324,
    fs: {
      allow: [".."],
    },
  },
  plugins: [WindiCSS()],
  build: {
    chunkSizeWarningLimit: 3000000,
  },
});
