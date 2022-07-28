import { resolveComponent$1 as resolveComponent, openBlock$1 as openBlock, createBlock$1 as createBlock, withCtx$1 as withCtx, createVNode$1 as createVNode, createBaseVNode$1 as createBaseVNode, defineAsyncComponent$1 as defineAsyncComponent, onMounted$1 as onMounted, reactive$1 as reactive, ref$1 as ref, watch$1 as watch, watchEffect$1 as watchEffect, computedAsync } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Gift/List" }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["GiftList"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "GiftList.story",
  setup(__props, { expose }) {
    expose();
    const GiftList = defineAsyncComponent(() => import("./GiftList.es.js"));
    const __returned__ = { GiftList, defineAsyncComponent, onMounted, reactive, ref, watch, watchEffect, computedAsync };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftList.story.vue";
var GiftList_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftList.story.vue"]]);
export { GiftList_story as default };
