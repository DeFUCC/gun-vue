import { createApp } from "vue";

import * as Vue from 'vue'
import { gun } from '../src/composables'

import * as components from '../src/all-components'
import { GunVuePlugin } from '../src/components'


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

  const App = createApp(component)
  App.use(GunVuePlugin)
  init(App)
  App.mount(tag)

  return { Gun: gun, Vue, App }
}