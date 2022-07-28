import { resolveComponent, openBlock, createBlock, withCtx, createBaseVNode, withDirectives, vModelText, createVNode, normalizeProps, guardReactiveProps, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
const _hoisted_2 = { class: "flex gap-2" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("label", { for: "size" }, "Size", -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Qr/Show",
    icon: "la:qrcode"
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          withDirectives(createBaseVNode("input", {
            id: "size",
            type: "range",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.state.size = $event),
            min: 40,
            max: 500
          }, null, 512), [
            [vModelText, $setup.state.size]
          ])
        ]),
        createBaseVNode("button", {
          class: "p-2 border-1 rounded-lg",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.generate())
        }, "Generate Key Pair")
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["QrShow"], normalizeProps(guardReactiveProps($setup.state)), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "QrShow.story",
  setup(__props, { expose }) {
    expose();
    const QrShow = defineAsyncComponent(() => __vitePreload(() => import("./QrShow.es.js"), true ? ["QrShow.es.js","vendor.es.js","plugin-vue_export-helper.es.js"] : void 0));
    const state = reactive({
      data: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
      size: 200,
      margin: 6
    });
    async function generate() {
      const { SEA } = await __vitePreload(() => import("./index.es.js"), true ? ["index.es.js","useDraw.es.js","vendor.es.js","useChat.es.js","usePrivate.es.js","useLog.es.js","useFile.es.js","useZip.es.js","useMd.es.js","useGifts.es.js","useReactions.es.js","useMates.es.js","useGuests.es.js","useSpace.es.js","useBackground.es.js","useProjects.es.js"] : void 0);
      state.data = (await SEA.pair()).pub;
    }
    const __returned__ = { QrShow, state, generate, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/qr/QrShow.story.vue";
var QrShow_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/qr/QrShow.story.vue"]]);
export { QrShow_story as default };
