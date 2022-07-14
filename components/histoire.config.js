import { defineConfig } from 'histoire'

export default defineConfig({
  setupFile: 'histoire.setup.js',
  outDir: '../app/public/components/',
  vite: {
    server: {
      fs: {
        allow: '..'
      }
    },
    build: { sourcemap: false },
    base: '/components/'
  },
  tree: {
    file: 'title'
  },
  routerMode: 'history',
  theme: {
    title: 'Gun-Vue components',
    logo: {
      square: '/gun-vue-logo.svg',
      light: '/components.svg',
      dark: '/components.svg'
    },
    logoHref: '/',
    favicon: '/gun-vue-logo.svg',
  },
})