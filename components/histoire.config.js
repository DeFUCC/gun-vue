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
    base: '/components/'
  },
  tree: {
    file: 'title'
  },
  routerMode: 'hash',
  theme: {
    title: 'Gun-Vue components',
    logo: {
      square: '/gun-vue-logo.svg',
      light: '/components.svg',
      dark: '/components.svg'
    },
    logoHref: '/',
    // favicon: '../docs/public/svg/gun-vue-logo.svg',
  },
})