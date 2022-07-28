import { __unplugin_components_0 } from "./times.es.js";
import { openBlock, createBlock, withCtx, withDirectives, vShow, createBaseVNode, createVNode, createElementBlock, createCommentVNode, renderSlot, normalizeStyle, TransitionGroup, Transition } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "fixed w-full h-full top-0 left-0 z-500 flex flex-col items-center" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_times = __unplugin_components_0;
  return openBlock(), createBlock(Transition, {
    name: "fade",
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createBaseVNode("div", _hoisted_1, [
        createVNode(TransitionGroup, { name: "fade" }, {
          default: withCtx(() => [
            $props.open && $props.back ? (openBlock(), createElementBlock("div", {
              class: "bg-dark-200 bg-opacity-30 w-full h-full absolute z-2 cursor-pointer backdrop-filter backdrop-blur-sm",
              key: "bg",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("v-if", true),
            $props.open ? (openBlock(), createElementBlock("div", {
              class: "layer",
              style: normalizeStyle({ top: $props.offset || "10vh" }),
              key: "layer"
            }, [
              $props.closeButton ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "button fixed right-4 top-4",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close"))
              }, [
                createVNode(_component_la_times)
              ])) : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4)) : createCommentVNode("v-if", true)
          ]),
          _: 3
        })
      ], 512), [
        [vShow, $props.open]
      ])
    ]),
    _: 3
  });
}
var UiLayer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "UiLayer",
  props: {
    open: { default: false },
    offset: { default: "" },
    closeButton: { type: Boolean, default: true },
    back: { type: Boolean, default: true }
  },
  emits: ["close"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const __returned__ = { props, emit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/ui/UiLayer.vue";
var __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-b67603ca"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/ui/UiLayer.vue"]]);
export { __unplugin_components_3 };
