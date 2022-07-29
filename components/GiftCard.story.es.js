import { resolveComponent$1 as resolveComponent, openBlock$1 as openBlock, createBlock$1 as createBlock, withCtx$1 as withCtx, createBaseVNode$1 as createBaseVNode, withDirectives$1 as withDirectives, vModelText$1 as vModelText, createVNode$1 as createVNode, defineAsyncComponent$1 as defineAsyncComponent, reactive$1 as reactive, ref$1 as ref, onMounted$1 as onMounted, nextTick$1 as nextTick, watch$1 as watch, computedAsync } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
const _hoisted_2 = { class: "flex gap-2" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("label", { for: "qn" }, "Quantity", -1);
const _hoisted_4 = { class: "flex gap-2" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("label", { for: "qn" }, "Quality", -1);
const _hoisted_6 = { class: "flex gap-2" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("label", { for: "wish" }, "Wish", -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Gift/Card" }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          withDirectives(createBaseVNode("input", {
            id: "qn",
            type: "range",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.gift.qn = $event),
            min: 1,
            max: 1e4
          }, null, 512), [
            [vModelText, $setup.gift.qn]
          ])
        ]),
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          withDirectives(createBaseVNode("input", {
            class: "flex-1 bg-transparent shadow border-1 rounded",
            id: "qn",
            type: "text",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.gift.ql = $event)
          }, null, 512), [
            [vModelText, $setup.gift.ql]
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          _hoisted_7,
          withDirectives(createBaseVNode("textarea", {
            class: "flex-1 bg-transparent shadow border-1 rounded",
            id: "wish",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.gift.wish = $event)
          }, null, 512), [
            [vModelText, $setup.gift.wish]
          ])
        ]),
        createBaseVNode("button", {
          class: "p-2 border-1 rounded-lg",
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.generate())
        }, "Generate Key Pairs")
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => {
          var _a;
          return [
            createVNode($setup["GiftCard"], {
              gift: $setup.gift,
              hash: (_a = $setup.hashed) == null ? void 0 : _a.hash
            }, null, 8, ["gift", "hash"])
          ];
        }),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "GiftCard.story",
  setup(__props, { expose }) {
    expose();
    const GiftCard = defineAsyncComponent(() => import("./GiftCard.es.js"));
    const gift = reactive({
      from: "",
      to: "",
      qn: 10,
      ql: "USD",
      wish: "",
      date: Date.now()
    });
    const hashed = ref({
      hash: ""
    });
    const state = reactive({
      size: 40
    });
    async function generate() {
      const { SEA } = await import("./index.es.js");
      gift.from = (await SEA.pair()).pub;
      gift.to = (await SEA.pair()).pub;
    }
    onMounted(() => {
      nextTick(() => {
        generate();
      });
    });
    watch(gift, async () => {
      const { hashObj } = await import("./index.es.js");
      hashed.value = await hashObj(gift);
    });
    const __returned__ = { GiftCard, gift, hashed, state, generate, defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, computedAsync };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftCard.story.vue";
var GiftCard_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftCard.story.vue"]]);
export { GiftCard_story as default };
