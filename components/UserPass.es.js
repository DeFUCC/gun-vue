import { usePass } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createVNode, createBlock, createCommentVNode, withDirectives, vModelDynamic } from "./vendor.es.js";
import { __unplugin_components_4 } from "./eye.es.js";
import { __unplugin_components_5 } from "./check.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m17.7 17l6.198 8.398L21.5 27L16 18.3L10.5 27l-2.3-1.602L14.397 17l-9.296-2.398L6 12l9.102 3.2L14.5 5h3L17 15.2l9-3.2l.8 2.7z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_0$1 = { name: "la-asterisk", render: render$1 };
const _hoisted_1 = { class: "flex flex-col mt-4 bg-light-700 p-4 m-2 shadow-lg rounded-xl" };
const _hoisted_2 = { class: "flex items-center mb-4" };
const _hoisted_3 = { class: "mx-2" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "px-1" }, "Enter a passphrase to encrypt your key with", -1);
const _hoisted_5 = { class: "flex items-center px-4" };
const _hoisted_6 = { class: "ml-1 flex flex-col items-center" };
const _hoisted_7 = ["type", "placeholder"];
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Set", -1);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Show", -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_la_asterisk = __unplugin_components_0$1;
  const _component_la_check = __unplugin_components_5;
  const _component_la_eye = __unplugin_components_4;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_la_asterisk)
      ]),
      _hoisted_4
    ]),
    createBaseVNode("div", _hoisted_5, [
      createBaseVNode("div", _hoisted_6, [
        ((_a = $setup.pass.safe) == null ? void 0 : _a.enc) ? (openBlock(), createBlock(_component_la_check, {
          key: 0,
          class: "text-green-600 m-1"
        })) : createCommentVNode("v-if", true)
      ]),
      withDirectives(createBaseVNode("input", {
        class: "p-2 mx-4 rounded-xl w-full",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.pass.input = $event),
        type: $setup.pass.show ? "text" : "password",
        placeholder: `Your passphrase of ${$setup.pass.minLength} or more letters`
      }, null, 8, _hoisted_7), [
        [vModelDynamic, $setup.pass.input]
      ]),
      $setup.pass.input.length >= $setup.pass.minLength ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "button items-center",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.pass.set())
      }, [
        createVNode(_component_la_check),
        _hoisted_8
      ])) : createCommentVNode("v-if", true),
      ((_c = (_b = $setup.pass) == null ? void 0 : _b.safe) == null ? void 0 : _c.enc) ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "button items-center",
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.pass.show = !$setup.pass.show)
      }, [
        createVNode(_component_la_eye),
        _hoisted_9
      ])) : createCommentVNode("v-if", true)
    ])
  ]);
}
const _sfc_main = {
  __name: "UserPass",
  setup(__props, { expose }) {
    expose();
    const { pass } = usePass();
    const __returned__ = { pass, usePass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserPass.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserPass.vue"]]);
export { __unplugin_components_0 as default };
