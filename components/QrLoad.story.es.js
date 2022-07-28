import { resolveComponent, openBlock, createBlock, withCtx, createBaseVNode, toDisplayString, createVNode, mergeProps, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-4 flex flex-col gap-4" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "font-bold" }, "Output", -1);
const _hoisted_3 = { class: "text-xs" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Qr/Load",
    icon: "la:qrcode"
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("pre", _hoisted_3, toDisplayString($setup.state.data), 1)
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["QrLoad"], mergeProps($setup.state, {
            onLoaded: _cache[0] || (_cache[0] = ($event) => $setup.state.data = $event)
          }), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "QrLoad.story",
  setup(__props, { expose }) {
    expose();
    const QrLoad = defineAsyncComponent(() => __vitePreload(() => import("./QrLoad.es.js"), true ? ["QrLoad.es.js","vendor.es.js","plugin-vue_export-helper.es.js"] : void 0));
    const state = reactive({
      data: ""
    });
    const __returned__ = { QrLoad, state, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/qr/QrLoad.story.vue";
var QrLoad_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/qr/QrLoad.story.vue"]]);
export { QrLoad_story as default };
