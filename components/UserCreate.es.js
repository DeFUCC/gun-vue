import { openBlock, createElementBlock, createBaseVNode, ref, useRefHistory, createBlock, normalizeStyle, createCommentVNode, createVNode, withDirectives, vModelText, SEA, nextTick } from "./vendor.es.js";
import __unplugin_components_0 from "./AccountAvatar.es.js";
import { useColor, useUser, updateProfile } from "./useDraw.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$2 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("g", {
  fill: "currentColor",
  "fill-rule": "evenodd"
}, [
  /* @__PURE__ */ createBaseVNode("path", { d: "M47.895 88.097c.001-4.416 3.064-9.837 6.854-12.117l66.257-39.858c3.785-2.277 9.915-2.277 13.707.008l66.28 39.934c3.786 2.28 6.853 7.703 6.852 12.138l-.028 79.603c-.001 4.423-3.069 9.865-6.848 12.154l-66.4 40.205c-3.781 2.29-9.903 2.289-13.69-.01l-66.167-40.185c-3.78-2.295-6.842-7.733-6.84-12.151l.023-79.72zm13.936-6.474l65.834 36.759l62.766-36.278l-62.872-36.918L61.83 81.623zM57.585 93.52c0 1.628-1.065 71.86-1.065 71.86c-.034 2.206 1.467 4.917 3.367 6.064l61.612 37.182l.567-77.413s-64.48-39.322-64.48-37.693zm76.107 114.938l60.912-38.66c2.332-1.48 4.223-4.915 4.223-7.679V93.125l-65.135 37.513v77.82z" }),
  /* @__PURE__ */ createBaseVNode("path", { d: "M77.76 132.287c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm-32 16c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm78.238-78.052c-4.783-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.623 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zm-16.238 29c-4.782-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.622 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zm-17 28c-4.782-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.622 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zM128.5 69c-6.351 0-11.5 4.925-11.5 11s5.149 11 11.5 11S140 86.075 140 80s-5.149-11-11.5-11z" })
], -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
var __unplugin_components_2 = { name: "fad-random1dice", render: render$1 };
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m12.781 5.281l-8 8l-.687.719l.687.719l8 8l1.438-1.438L7.938 15H21c2.754 0 5 2.246 5 5v7h2v-7c0-3.844-3.156-7-7-7H7.937l6.282-6.281z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_1$1 = { name: "la-undo", render };
const _sfc_main = {
  __name: "UserCreate",
  setup(__props, { expose }) {
    expose();
    const colorDeep = useColor("deep");
    const colorLight = useColor("light");
    const { user, auth, create } = useUser();
    const name = ref("");
    const newPair = ref(null);
    const { history, undo, redo } = useRefHistory(newPair);
    async function generatePair() {
      newPair.value = await SEA.pair();
    }
    generatePair();
    function createUser() {
      auth(newPair.value, () => nextTick(() => {
        updateProfile("name", name.value);
      }));
    }
    const __returned__ = { colorDeep, colorLight, user, auth, create, name, newPair, history, undo, redo, generatePair, createUser, useUser, SEA, useColor, updateProfile, useRefHistory, ref, nextTick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-xl font-bold" }, "Create a new account", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "mb-4 mt-2" }, "Tap the circle to generate a new key", -1);
const _hoisted_3 = { class: "flex flex-col" };
const _hoisted_4 = { class: "flex justify-center my-4" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_account_avatar = __unplugin_components_0;
  const _component_la_undo = __unplugin_components_1$1;
  const _component_fad_random_1dice = __unplugin_components_2;
  return !$setup.user.is ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "flex flex-col items-center flex-1 p-2 bg-light-700 rounded-3xl shadow-lg text-center p-4 transition duration-300ms ease-in",
    style: normalizeStyle({ backgroundColor: $setup.colorDeep.hex(((_a = $setup.newPair) == null ? void 0 : _a.pub) || "") })
  }, [
    _hoisted_1,
    _hoisted_2,
    $setup.newPair ? (openBlock(), createBlock(_component_account_avatar, {
      key: 0,
      class: "cursor-pointer rounded-full shadow-xl border-8",
      pub: $setup.newPair.pub,
      size: 200,
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.generatePair()),
      style: normalizeStyle({ borderColor: $setup.colorDeep.hex($setup.newPair.pub) })
    }, null, 8, ["pub", "style"])) : createCommentVNode("v-if", true),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        $setup.history.length > 2 ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "m-2 button items-center",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.undo())
        }, [
          createVNode(_component_la_undo, { class: "text-2xl" })
        ])) : createCommentVNode("v-if", true),
        createBaseVNode("button", {
          class: "m-2 button items-center",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.generatePair())
        }, [
          createVNode(_component_fad_random_1dice, { class: "text-3xl" })
        ])
      ]),
      withDirectives(createBaseVNode("input", {
        class: "p-4 rounded-2xl my-2",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.name = $event),
        placeholder: "Enter your name or nickname"
      }, null, 512), [
        [vModelText, $setup.name]
      ]),
      $setup.newPair && !$setup.user.is && $setup.name ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "button w-full flex justify-center items-center",
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.createUser()),
        style: normalizeStyle({ backgroundColor: $setup.colorLight.hex($setup.newPair.pub) })
      }, "Authenticate", 4)) : createCommentVNode("v-if", true)
    ])
  ], 4)) : createCommentVNode("v-if", true);
}
_sfc_main.__file = "src/user/UserCreate.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserCreate.vue"]]);
export { __unplugin_components_1 as default };
