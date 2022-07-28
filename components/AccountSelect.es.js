import "./useDraw.es.js";
import { openBlock, createElementBlock, createVNode, createBaseVNode, toDisplayString, withCtx, Fragment, renderList, TransitionGroup, createBlock } from "./vendor.es.js";
import { useGuests } from "./useGuests.es.js";
import { __unplugin_components_0 as __unplugin_components_0$1 } from "./times.es.js";
import __unplugin_components_0 from "./AccountBadge.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
const _hoisted_1 = { class: "p-4" };
const _hoisted_2 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_4 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_5 = { class: "flex items-center p-2" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "font-bold" }, "SELECT A USER", -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_8 = { class: "p-0" };
const _hoisted_9 = { class: "flex flex-wrap gap-3" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_badge = __unplugin_components_0;
  const _component_la_times = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $props.pub ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode(_component_account_badge, { pub: $props.pub }, null, 8, ["pub"]),
      _hoisted_3,
      createVNode(_component_la_times, {
        class: "mr-2 cursor-pointer",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:pub", ""))
      })
    ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
      createBaseVNode("div", _hoisted_5, [
        _hoisted_6,
        _hoisted_7,
        createBaseVNode("div", _hoisted_8, toDisplayString($setup.count.total), 1)
      ]),
      createBaseVNode("div", _hoisted_9, [
        createVNode(TransitionGroup, { name: "fade" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.guests, (guest) => {
              return openBlock(), createBlock(_component_account_badge, {
                key: guest,
                onClick: ($event) => _ctx.$emit("update:pub", guest.pub),
                pub: guest.pub
              }, null, 8, ["onClick", "pub"]);
            }), 128))
          ]),
          _: 1
        })
      ])
    ]))
  ]);
}
const _sfc_main = {
  __name: "AccountSelect",
  props: {
    pub: { type: String, default: "" }
  },
  emits: ["update:pub"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { guests, count } = useGuests();
    const __returned__ = { guests, count, emit, props, useGuests };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/account/AccountSelect.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/account/AccountSelect.vue"]]);
export { __unplugin_components_1 as default };
