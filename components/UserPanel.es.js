import { openBlock, createElementBlock, normalizeStyle, createBaseVNode, createVNode, toDisplayString, createBlock, createCommentVNode, computed } from "./vendor.es.js";
import { useUser, useColor } from "./useDraw.es.js";
import { useBackground } from "./useBackground.es.js";
import { __unplugin_components_4 } from "./exit-outline.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1, __unplugin_components_2 as __unplugin_components_2$1 } from "./lock.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import { __unplugin_components_1 } from "./MateButton.es.js";
import __unplugin_components_0 from "./UserAvatar.es.js";
import "./useMates.es.js";
import "./times.es.js";
import "./plus.es.js";
import "./AccountBadge.es.js";
import "./AccountAvatar.es.js";
import "./useFile.es.js";
import "./UiLayer.es.js";
import "./check.es.js";
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "p-1 m-1 rounded-full transition-all duration-300 ease-in-out",
    style: normalizeStyle({ backgroundColor: $props.blink ? "white" : "black" })
  }, null, 4);
}
const _sfc_main$1 = {
  __name: "UtilPulse",
  props: {
    blink: Boolean
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/util/UtilPulse.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/util/UtilPulse.vue"]]);
const _hoisted_1 = { class: "flex items-center" };
const _hoisted_2 = { class: "text-2xl mx-2 font-bold" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_user_avatar = __unplugin_components_0;
  const _component_mate_button = __unplugin_components_1;
  const _component_util_pulse = __unplugin_components_2;
  const _component_la_lock = __unplugin_components_1$1;
  const _component_la_unlock = __unplugin_components_2$1;
  const _component_ion_exit_outline = __unplugin_components_4;
  return $setup.user.is ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "p-4 flex items-center",
    style: normalizeStyle({ ...$setup.bg })
  }, [
    createBaseVNode("div", _hoisted_1, [
      createVNode(_component_user_avatar, { size: 120 }),
      createBaseVNode("div", _hoisted_2, toDisplayString((_a = $setup.user) == null ? void 0 : _a.name), 1)
    ]),
    createVNode(_component_mate_button, {
      pub: $setup.user.pub
    }, null, 8, ["pub"]),
    _hoisted_3,
    createVNode(_component_util_pulse, {
      blink: $setup.user.blink
    }, null, 8, ["blink"]),
    createBaseVNode("button", {
      class: "p-2 text-2xl",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.user.db.get("safe").get("saved").put(!$setup.user.safe.saved))
    }, [
      $setup.user.safe.saved ? (openBlock(), createBlock(_component_la_lock, { key: 0 })) : (openBlock(), createBlock(_component_la_unlock, { key: 1 }))
    ]),
    createBaseVNode("button", {
      class: "text-2xl ml-1 p-2",
      onClick: _cache[1] || (_cache[1] = ($event) => $setup.leave())
    }, [
      createVNode(_component_ion_exit_outline)
    ])
  ], 4)) : createCommentVNode("v-if", true);
}
const _sfc_main = {
  __name: "UserPanel",
  emits: ["browse"],
  setup(__props, { expose, emit }) {
    expose();
    const { user, leave } = useUser();
    const colorDeep = useColor("deep");
    const bg = computed(() => useBackground({ pub: user.pub, size: 600, light: 0.5, draw: "circles" }));
    const __returned__ = { user, leave, colorDeep, emit, bg, computed, useUser, useColor, useBackground };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserPanel.vue";
var __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserPanel.vue"]]);
export { __unplugin_components_3 as default };
