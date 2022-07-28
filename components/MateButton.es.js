import { useUser, useColor } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createVNode, toDisplayString, createCommentVNode, withDirectives, vModelText, withModifiers, createBlock, normalizeStyle } from "./vendor.es.js";
import { useMate } from "./useMates.es.js";
import { __unplugin_components_0 as __unplugin_components_0$1 } from "./times.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1 } from "./plus.es.js";
import __unplugin_components_0 from "./AccountBadge.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_2 = {
  key: 0,
  class: "p-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_badge = __unplugin_components_0;
  const _component_la_plus = __unplugin_components_1$1;
  const _component_la_times = __unplugin_components_0$1;
  return $setup.user.is && $setup.user.pub != $props.pub ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("button", {
      class: "flex items-center rounded-2xl shadow-xl px-2 text-3xl bg-light-500",
      onClick: _cache[2] || (_cache[2] = ($event) => $setup.toggleMate()),
      style: normalizeStyle({ backgroundColor: $setup.isMate ? $setup.colorDeep.hex($props.pub) : "" })
    }, [
      createVNode(_component_account_badge, {
        pub: $setup.user.pub,
        showName: false
      }, null, 8, ["pub"]),
      $setup.isMate ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($setup.isMate), 1)) : createCommentVNode("v-if", true),
      !$setup.isMate ? withDirectives((openBlock(), createElementBlock("input", {
        key: 1,
        class: "mx-1 rounded-2xl w-46px p-2 rounded-lg shadow-inner text-center",
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.emoji = $event),
        placeholder: "",
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop", "prevent"]))
      }, null, 512)), [
        [vModelText, $setup.emoji]
      ]) : createCommentVNode("v-if", true),
      !$setup.isMate ? (openBlock(), createBlock(_component_la_plus, { key: 2 })) : (openBlock(), createBlock(_component_la_times, { key: 3 }))
    ], 4)
  ])) : createCommentVNode("v-if", true);
}
const _sfc_main = {
  __name: "MateButton",
  props: {
    pub: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const colorDeep = useColor("deep");
    const { emoji, isMate, toggleMate } = useMate(props.pub);
    const __returned__ = { props, user, colorDeep, emoji, isMate, toggleMate, useUser, useMate, useColor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/mate/MateButton.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/mate/MateButton.vue"]]);
export { __unplugin_components_1 };
