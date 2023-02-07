import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  storyMatch: [
    '../src/**/*.story.vue',
  ],
  setupFile: 'histoire.setup.js',
  outDir: '../app/public/components/',
  plugins: [
    HstVue(),
  ],
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
    // file: 'title'
    groups: [

      {
        title: 'Docs',
        id: "docs"
      },
      {
        id: 'top',
        title: 'Auth', // No toggle
        include: file => ['User', 'Account', 'Room'].reduce((prev, curr) => prev || file.title.startsWith(curr), false),
      },
      {
        title: 'Features',
        include: file => !file.title.includes('Util') && !file.title.includes('Qr'),
      },
      {
        title: 'Tools',
        include: () => true,
      },
    ],
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
    favicon: '/gun-vue-logo.svg',
  },
})