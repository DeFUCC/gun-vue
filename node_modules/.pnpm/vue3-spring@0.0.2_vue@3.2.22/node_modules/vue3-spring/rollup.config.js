import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const banner = `/**
 * Vue 3 Spring ${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      banner,
    },
    {
      file: pkg.module,
      format: 'es',
      banner,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
