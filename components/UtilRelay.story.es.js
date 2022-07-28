import { resolveComponent$1 as resolveComponent, openBlock$1 as openBlock, createBlock$1 as createBlock, withCtx$1 as withCtx, createVNode$1 as createVNode, defineAsyncComponent$1 as defineAsyncComponent } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Util/Relay",
    icon: "carbon:bare-metal-server-01"
  }, {
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["UtilRelay"], { class: "h-full" })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "UtilRelay.story",
  setup(__props, { expose }) {
    expose();
    const UtilRelay = defineAsyncComponent(() => import("./UtilRelay.es.js"));
    const __returned__ = { UtilRelay, defineAsyncComponent };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/util/UtilRelay.story.vue";
var UtilRelay_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/util/UtilRelay.story.vue"]]);
export { UtilRelay_story as default };
