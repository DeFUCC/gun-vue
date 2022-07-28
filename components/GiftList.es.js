import "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, Fragment, renderList, createBlock } from "./vendor.es.js";
import { useGifts } from "./useGifts.es.js";
import __unplugin_components_0 from "./GiftCard.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
const _hoisted_1 = { class: "flex flex-wrap gap-2" };
const _hoisted_2 = { class: "flex flex-col gap-2" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-lg font-bold" }, "MY", -1);
const _hoisted_4 = { class: "flex flex-col gap-2" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-lg font-bold" }, "COMPLETE", -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_gift_card = __unplugin_components_0;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.my, (gift, hash) => {
        return openBlock(), createBlock(_component_gift_card, {
          key: hash,
          gift,
          hash
        }, null, 8, ["gift", "hash"]);
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_4, [
      _hoisted_5,
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.gifts, (gift, hash) => {
        return openBlock(), createBlock(_component_gift_card, {
          key: hash,
          gift,
          hash
        }, null, 8, ["gift", "hash"]);
      }), 128))
    ])
  ]);
}
const _sfc_main = {
  __name: "GiftList",
  setup(__props, { expose }) {
    expose();
    const { gifts, my, proposed } = useGifts();
    const __returned__ = { gifts, my, proposed, useGifts };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftList.vue";
var GiftList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftList.vue"]]);
export { GiftList as default };
