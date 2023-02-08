import '@unocss/reset/tailwind.css'
import 'uno.css'
import "./styles/index.css";
import "./styles/transitions.css";
import 'floating-vue/dist/style.css'


import * as components from './all-components'

export const GunVuePlugin = {
  install(Vue) {
    for (const prop in components) {
      Vue.component(prop, components[prop])
    }
  }
}

export * from './all-components'
export * as composables from "./composables";


