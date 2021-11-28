import { defineCustomElement } from "vue";

import "virtual:windi.css";

import dataBase from "./data/base.vue";
import userAvatar from "./user/avatar.vue";

export { dataBase, userAvatar };

export const DataBase = defineCustomElement(dataBase);

export function register() {
  customElements.define("data-base", DataBase);
}
