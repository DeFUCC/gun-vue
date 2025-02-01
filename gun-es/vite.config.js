import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
      entry: path.resolve(dirname, './index.js'),
      formats: ['es'],
    },
    sourcemap: true,
  },
});
