import DefaultTheme from 'vitepress/theme'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { GunVuePlugin } = await import('../../../src/components')
      app.use(GunVuePlugin)
    }
  }
}