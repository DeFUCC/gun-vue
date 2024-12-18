import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({

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
        'node_modules/gun/*.js',
      ],
      dynamicRequireRoot: path.resolve(dirname, './node_modules/gun/'),
    },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: [
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js'
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
