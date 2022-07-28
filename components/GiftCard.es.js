import { useUser, useColor } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createVNode, toDisplayString, createCommentVNode, normalizeStyle, computed, useTimeAgo } from "./vendor.es.js";
import { acceptGift } from "./useGifts.es.js";
import __unplugin_components_0$1 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M18.719 6.781L17.28 8.22L24.063 15H4v2h20.063l-6.782 6.781l1.438 1.438l8.5-8.5l.687-.719l-.687-.719z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_1 = { name: "la-arrow-right", render: render$1 };
const _hoisted_1 = {
  class: "flex items-center gap-2",
  style: { "flex": "1 1 100px" }
};
const _hoisted_2 = {
  class: "flex gap-2 p-2 items-center flex-wrap",
  style: { "flex": "1 1 300px" }
};
const _hoisted_3 = { class: "flex flex-col" };
const _hoisted_4 = { class: "text-xl font-bold" };
const _hoisted_5 = { class: "flex flex-col" };
const _hoisted_6 = { class: "text-lg font-bold" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_8 = {
  key: 0,
  class: "flex-auto"
};
const _hoisted_9 = {
  key: 1,
  class: "p-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_account_avatar = __unplugin_components_0$1;
  const _component_la_arrow_right = __unplugin_components_1;
  return openBlock(), createElementBlock("div", {
    class: "p-2 rounded-xl bg-light-200 bg-opacity-90 flex shadow-lg flex-wrap items-center border-2",
    style: normalizeStyle({ backgroundColor: $setup.complete ? $setup.color.hex($props.hash) : "#ccc3", borderColor: !$setup.complete ? $setup.color.hex($props.hash) : "transparent" })
  }, [
    createBaseVNode("div", _hoisted_1, [
      createVNode(_component_account_avatar, {
        pub: $props.gift.from
      }, null, 8, ["pub"]),
      createVNode(_component_la_arrow_right, { class: "flex-auto" }),
      createVNode(_component_account_avatar, {
        pub: $props.gift.to
      }, null, 8, ["pub"])
    ]),
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, toDisplayString($props.gift.qn), 1)
      ]),
      createBaseVNode("div", _hoisted_5, [
        createBaseVNode("div", _hoisted_6, toDisplayString($props.gift.ql), 1)
      ]),
      _hoisted_7,
      $props.gift.wish ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString($props.gift.wish), 1)) : createCommentVNode("v-if", true),
      $props.gift.date ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString($setup.time), 1)) : createCommentVNode("v-if", true),
      $props.gift.to == ((_a = $setup.user) == null ? void 0 : _a.pub) && !$setup.complete ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "button",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.acceptGift($props.hash))
      }, "Accept")) : createCommentVNode("v-if", true)
    ])
  ], 4);
}
const _sfc_main = {
  __name: "GiftCard",
  props: {
    hash: String,
    gift: {
      type: Object,
      default: {
        qn: 0,
        ql: "",
        wish: "",
        from: "",
        to: ""
      }
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const color = useColor();
    const complete = computed(() => props.gift.sent && props.gift.received);
    const time = useTimeAgo(props.gift.date);
    const __returned__ = { props, user, color, complete, time, acceptGift, useColor, useUser, computed, useTimeAgo };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftCard.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftCard.vue"]]);
export { __unplugin_components_0 as default };
