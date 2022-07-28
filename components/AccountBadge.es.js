import { openBlock, createElementBlock, createVNode, toDisplayString, Fragment, normalizeStyle, createCommentVNode, renderSlot, ref, watchEffect } from "./vendor.es.js";
import { useColor, useGun, selectedUser } from "./useDraw.es.js";
import __unplugin_components_0$1 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = ["title"];
const _hoisted_2 = {
  key: 0,
  class: "mx-2 font-bold text-sm max-w-8ch overflow-ellipsis overflow-hidden whitespace-nowrap"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_avatar = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", {
    class: "frame p-2px flex items-center rounded-full bg-light-900 cursor-pointer shadow transition duration-400 ease-in",
    style: normalizeStyle({ backgroundColor: $setup.colorDeep.hex($props.pub), flexDirection: $props.vertical ? "column" : "row" }),
    onClick: _cache[0] || (_cache[0] = ($event) => $setup.select()),
    title: $props.showName ? $props.pub : $setup.name
  }, [
    createVNode(_component_account_avatar, {
      pub: $props.pub,
      size: $props.size
    }, null, 8, ["pub", "size"]),
    $props.showName && $setup.name ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($setup.name), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      $setup.name ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "tip mx-2 font-bold text-sm max-w-8ch overflow-ellipsis overflow-hidden whitespace-nowrap absolute opacity-0 hover_opacity-100 transition-all duration-300 ease-in text-center transform translate-y-2 p-1 rounded-lg",
        style: normalizeStyle({ transform: `translateY(${-$props.size - 5}px) translateX(-50%)`, backgroundColor: $setup.colorDeep.hex($props.pub) })
      }, toDisplayString($setup.name), 5)) : createCommentVNode("v-if", true)
    ], 2112)),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 12, _hoisted_1);
}
var AccountBadge_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "AccountBadge",
  props: {
    pub: { type: String, default: "" },
    showName: { type: Boolean, default: true },
    size: { type: Number, default: 30 },
    selectable: Boolean,
    vertical: Boolean
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const name = ref("");
    const colorDeep = useColor("deep");
    const gun = useGun();
    watchEffect(() => {
      name.value = "";
      gun.user(props.pub).get("profile").get("name").on((d) => {
        name.value = d;
      });
    });
    function select() {
      if (props.selectable) {
        selectedUser.pub = props.pub;
      }
    }
    const __returned__ = { props, name, colorDeep, gun, select, ref, watchEffect, useGun, useColor, selectedUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/account/AccountBadge.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-3f9eb4de"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/account/AccountBadge.vue"]]);
export { __unplugin_components_0 as default };
