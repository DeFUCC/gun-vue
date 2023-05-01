import { createApp } from "vue";
import { useGun } from '../src/composables'
import * as components from '../src/all-components'
import { GunVuePlugin } from '../src/components'

export * as vue from 'vue'

export function createGunVueApp(
  tag = "#app",
  component = {
    data() {
      return {
        message: 'Welcome to Gun-Vue space',
        components: Object.keys(components)
      }
    }
  },
  init = app => console.log('GunVue app initiated')) {
  const gun = useGun();
  const App = createApp(component)
  App.use(GunVuePlugin)
  init(App)
  App.mount(tag)

}