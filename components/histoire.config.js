import { defineConfig } from 'histoire'

export default defineConfig({
  setupFile: 'histoire.setup.js',
  outDir: '../app/public/components/',
  vite: {
    base: '/components/'
  },
  routerMode: 'hash',
  theme: {
    title: 'Gun-Vue components',
    // logo: {
    //   square: '../docs/public/png/components.png',
    //   light: '../docs/public/png/components.png',
    //   dark: '../docs/public/png/components.png'
    // },
    // logoHref: 'https://gun-vue.js.org',
    // favicon: '../docs/public/svg/gun-vue-logo.svg',
  },
})