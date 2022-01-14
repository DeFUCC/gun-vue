import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [moduleExclude("text-encoding")],
  build: {
    lib: {
      entry: path.resolve(dirname, "./index.js"),
      name: "composables",
      formats: ["es"],
    },
    sourcemap: true,
    rollupOptions: {
      manualChunks: (id) => {
        if (id.includes("node_modules")) {
          return "vendor";
        }
        // return path.parse(id).name;
      },
      external: ["vue"],
      output: {
        minifyInternalExports: false,
        chunkFileNames: "[name].js",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "gun",
      "gun/gun",
      "gun/sea",
      "gun/sea.js",
      "gun/lib/then",
      "gun/lib/webrtc",
      "gun/lib/radix",
      "gun/lib/radisk",
      "gun/lib/store",
      "gun/lib/rindexed",
    ],
  },
});

function moduleExclude(match) {
  const m = (id) => id.indexOf(match) > -1;
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id;
    },
    load(id) {
      if (m(id)) return `export default {}`;
    },
  };
}
