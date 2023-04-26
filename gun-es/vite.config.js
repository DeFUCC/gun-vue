import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

//@ts-ignore
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [],
  build: {
    outDir: 'dist',
    target: 'es2020',
    lib: {
      entry: path.resolve(dirname, './index.js'),
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        minifyInternalExports: true,
      },
    },
    commonjsOptions: {
      dynamicRequireTargets: [
        path.resolve(dirname, './node_modules/gun/gun.js'),
      ],
      dynamicRequireRoot: path.resolve(dirname, './node_modules/gun/'),
    },
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  optimizeDeps: {
    include: [
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
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
