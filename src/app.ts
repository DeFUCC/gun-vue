import { components, GunVuePlugin } from "./components";

import { createApp } from "vue";

import * as Vue from 'vue'

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
  init = app => console.log('GunVue app initiated', app)) {

  const App = createApp(component)
  App.use(GunVuePlugin)
  init(App)
  App.mount(tag)
  return { Vue, App }
}