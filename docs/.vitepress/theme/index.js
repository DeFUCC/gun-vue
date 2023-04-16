import DefaultTheme from 'vitepress/theme'

import '@unocss/reset/tailwind.css'

import 'uno.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const { GunVuePlugin } = await import('../../../src/components')
      app.use(GunVuePlugin)
    }
  }
}