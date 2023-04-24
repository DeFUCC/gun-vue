import '@unocss/reset/tailwind.css'
import 'uno.css'
import "./styles/index.css";
import "./styles/transitions.css";
import 'floating-vue/dist/style.css'

import { createApp } from "vue";

import * as Vue from 'vue'
import { gun } from './composables'

import * as components from './all-components'

export const GunVuePlugin = {
  install(Vue) {
    for (const prop in components) {
      Vue.component(prop, components[prop])
    }
  }
}


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
}


export * from './all-components'
export * as components from './all-components'
export * as composables from "./composables";


