import "virtual:windi.css";
import "./styles/index.css";
import "./styles/transitions.css";

import * as components from './all.js'

export const GunVuePlugin = {
  install(Vue) {
    for (const prop in components) {
      Vue.component(prop, components[prop])
    }
  }
}

import { resolveComponent } from 'vue'

resolveComponent()


export * from './all.js'
export * from "#composables";


