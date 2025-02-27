import { createApp } from "vue";
import { useGun } from '../src/composables'
import * as components from '../src/all-components'
import { GunVuePlugin } from '../src/components'

export function createGunVueApp(
  tag = "#app",
) {
  const gun = useGun();


  const App = createApp()

  App.use(GunVuePlugin)
  App.mount(tag)
  return { App, gun }
}