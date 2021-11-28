import "virtual:windi.css";

import dataBase from "./data/base.vue";
import userAvatar from "./user/avatar.vue";

export { dataBase, userAvatar };

// import { defineCustomElement } from "vue";
// export const DataBase = defineCustomElement(dataBase);
// export function register() {
//   customElements.define("data-base", DataBase);
// }

// Объявление функции установки, выполняемой Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("data-base", dataBase);
}

// Создание значения модуля для Vue.use()
const plugin = {
  install,
};

// Автоматическая установка, когда vue найден (например в браузере с помощью тега <script>)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
