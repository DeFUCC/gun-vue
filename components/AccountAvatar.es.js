import { useColor, useGun, useUser } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, normalizeStyle, createVNode, ref, watch, gunAvatar, computed } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 5c-3.855 0-7 3.145-7 7c0 2.41 1.23 4.55 3.094 5.813C8.527 19.343 6 22.883 6 27h2c0-4.43 3.57-8 8-8s8 3.57 8 8h2c0-4.117-2.527-7.656-6.094-9.188A7.024 7.024 0 0 0 23 12c0-3.855-3.145-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5s-5-2.227-5-5s2.227-5 5-5z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3);
}
var __unplugin_components_0$1 = { name: "la-user", render: render$1 };
const _hoisted_1 = { class: "flex flex-col" };
const _hoisted_2 = ["width", "height", "src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_user = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $props.pub ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: "border rounded-full overflow-hidden transition duration-500 ease-out",
      style: normalizeStyle({ borderColor: $setup.blink ? $setup.colorDeep.hex($props.pub) : "transparent", borderWidth: `${$props.border}px` }),
      width: $props.size,
      height: $props.size,
      src: $setup.avatar
    }, null, 12, _hoisted_2)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: "p-2",
      style: normalizeStyle({ fontSize: $props.size + "px" })
    }, [
      createVNode(_component_la_user)
    ], 4))
  ]);
}
const _sfc_main = {
  __name: "AccountAvatar",
  props: {
    pub: { type: String, default: "" },
    size: { type: Number, default: 42 },
    border: { type: Number, default: 2 }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorDeep = useColor("deep");
    const gun = useGun();
    const avatar = ref();
    watch(() => props.pub, () => {
      avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 });
    }, { immediate: true });
    gun.user(props.pub).get("avatar").on((hash) => {
      if (hash) {
        gun.get("#avatars").get(hash).once((d) => {
          avatar.value = d;
        });
      } else {
        avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 });
      }
    });
    const blink = ref();
    gun.user(props.pub).get("pulse").on((d) => {
      blink.value = !blink.value;
    });
    const __returned__ = { props, colorDeep, gun, avatar, blink, useGun, useUser, gunAvatar, useColor, computed, ref, watch };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/account/AccountAvatar.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/account/AccountAvatar.vue"]]);
export { __unplugin_components_0 as default };
