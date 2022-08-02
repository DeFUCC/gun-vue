import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, toDisplayString$1 as toDisplayString, createVNode$1 as createVNode, createCommentVNode$1 as createCommentVNode, ref$1 as ref, computed$1 as computed } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M18 5v2h5.563L11.28 19.281l1.438 1.438L25 8.437V14h2V5zM5 9v18h18V14l-2 2v9H7V11h9l2-2z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
}
var __unplugin_components_0$1 = { name: "la-external-link-alt", render: render$3 };
const _hoisted_1$2 = ["href"];
const _hoisted_2$2 = { class: "mr-1px ml-8px" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_external_link_alt = __unplugin_components_0$1;
  return $setup.domain ? (openBlock(), createElementBlock("a", {
    key: 0,
    class: "underline flex items-center bg-light-300 rounded-xl p-1 shadow-sm hover_shadow-lg transition duration-200ms hover_bg-light-5",
    href: $setup.valid,
    target: "_blank"
  }, [
    createBaseVNode("div", _hoisted_2$2, toDisplayString($setup.domain), 1),
    createVNode(_component_la_external_link_alt, { class: "mx-1" })
  ], 8, _hoisted_1$2)) : createCommentVNode("v-if", true);
}
const _sfc_main = {
  __name: "UiLink",
  props: {
    url: { type: String, default: "" },
    icon: { type: [Boolean, String], default: true }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const valid = ref(false);
    const domain = computed(() => {
      if (props.url) {
        try {
          let url = new URL(props.url);
          valid.value = url;
          return url.hostname;
        } catch {
          valid.value = null;
          return "incorrect link";
        }
      } else {
        return "";
      }
    });
    const __returned__ = { props, valid, domain, computed, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/ui/UiLink.vue";
var __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render$2], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/ui/UiLink.vue"]]);
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M4 5h16v2H4V5m0 4h16v2H4V9m0 4h16v2H4v-2m0 4h10v2H4v-2Z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_1 = { name: "mdi-text-long", render: render$1 };
const _hoisted_1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 6c-3.766 0-7.094.39-9.125.688c-1.68.246-3.035 1.511-3.344 3.187C3.27 11.301 3 13.387 3 16s.27 4.7.531 6.125c.309 1.676 1.664 2.945 3.344 3.188c2.04.296 5.379.687 9.125.687c3.746 0 7.086-.39 9.125-.688c1.68-.242 3.035-1.511 3.344-3.187c.261-1.43.531-3.52.531-6.125s-.266-4.695-.531-6.125c-.309-1.676-1.664-2.941-3.344-3.188C23.094 6.391 19.765 6 16 6zm0 2c3.633 0 6.879.371 8.844.656A1.966 1.966 0 0 1 26.5 10.25c.242 1.32.5 3.277.5 5.75c0 2.469-.258 4.43-.5 5.75a1.957 1.957 0 0 1-1.656 1.594C22.87 23.629 19.609 24 16 24c-3.61 0-6.875-.371-8.844-.656A1.962 1.962 0 0 1 5.5 21.75C5.258 20.43 5 18.477 5 16c0-2.48.258-4.43.5-5.75a1.962 1.962 0 0 1 1.656-1.594C9.117 8.371 12.367 8 16 8zm-3 2.281V21.72l1.5-.844l7-4L23 16l-1.5-.875l-7-4zm2 3.438L18.969 16L15 18.281z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var __unplugin_components_0 = { name: "la-youtube", render };
export { __unplugin_components_0, __unplugin_components_1, __unplugin_components_4 };
