import { openBlock, createElementBlock, createCommentVNode, createBlock, ref } from "./vendor.es.js";
import __unplugin_components_1 from "./UserCreate.es.js";
import __unplugin_components_0 from "./UserAuth.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
import "./useDraw.es.js";
import "./useFile.es.js";
import "./QrLoad.es.js";
import "./qrcode.es.js";
const _hoisted_1 = { class: "flex flex-col p-4" };
const _hoisted_2 = {
  key: 1,
  class: "flex justify-center mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_user_auth = __unplugin_components_0;
  const _component_user_create = __unplugin_components_1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    !$setup.generate ? (openBlock(), createElementBlock("button", {
      key: 0,
      class: "text-xl flex justify-center bg-light-900 hover_bg-light-50 p-4 rounded-2xl shadow-lg hover_shadow-xl transition duration-200 ease-out font-bold",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.generate = true)
    }, "Create a new account")) : createCommentVNode("v-if", true),
    !$setup.generate ? (openBlock(), createElementBlock("div", _hoisted_2, "or")) : createCommentVNode("v-if", true),
    !$setup.generate ? (openBlock(), createBlock(_component_user_auth, { key: 2 })) : (openBlock(), createBlock(_component_user_create, { key: 3 }))
  ]);
}
const _sfc_main = {
  __name: "UserLogin",
  setup(__props, { expose }) {
    expose();
    const generate = ref(false);
    const __returned__ = { generate, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserLogin.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserLogin.vue"]]);
export { __unplugin_components_2 as default };
