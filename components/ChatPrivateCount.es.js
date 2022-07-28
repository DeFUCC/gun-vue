import { openBlock, createElementBlock, toDisplayString, createCommentVNode, createVNode, withCtx, normalizeStyle, computed, createBaseVNode, createBlock, TransitionGroup, Fragment, renderList, Transition, ref } from "./vendor.es.js";
import { useColor, user } from "./useDraw.es.js";
import { isEmoji, useMates } from "./useMates.es.js";
import __unplugin_components_0$1 from "./AccountBadge.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import { __unplugin_components_0 as __unplugin_components_0$2, __unplugin_components_1 as __unplugin_components_1$1 } from "./angle-up.es.js";
import { usePrivateChatCount } from "./usePrivate.es.js";
const _hoisted_1$3 = {
  key: 0,
  class: "px-2 text-2xl"
};
const _hoisted_2$2 = {
  key: 0,
  class: "pr-2 text-xl"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_badge = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", {
    class: "flex cursor-pointer items-center rounded-full m-1 shadow-sm hover_shadow-md transition duration-200ms ease-out filter grayscale-10 hover_grayscale-0 justify-between",
    style: normalizeStyle({ backgroundColor: $setup.colorDeep.hex($props.from) + "33" })
  }, [
    $setup.isEmoji($props.emoji) ? (openBlock(), createElementBlock("div", _hoisted_1$3, toDisplayString($props.emoji), 1)) : createCommentVNode("v-if", true),
    createVNode(_component_account_badge, {
      class: "shadow-md",
      selectable: true,
      pub: $props.to
    }, {
      default: withCtx(() => [
        $props.back ? (openBlock(), createElementBlock("div", _hoisted_2$2, toDisplayString($props.back), 1)) : createCommentVNode("v-if", true)
      ]),
      _: 1
    }, 8, ["pub"])
  ], 4);
}
const _sfc_main$2 = {
  __name: "MateLink",
  props: {
    emoji: String,
    from: String,
    to: String,
    back: String
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorDeep = useColor("deep");
    const __returned__ = { colorDeep, props, isEmoji, useColor, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$2.__file = "src/mate/MateLink.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", render$3], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/mate/MateLink.vue"]]);
const _hoisted_1$2 = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_2$1 = { class: "text-lg font-bold" };
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_4 = { class: "mr-2 font-bold" };
const _hoisted_5 = {
  key: 0,
  class: "flex flex-wrap bg-light-500 rounded-xl p-2"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_angle_down = __unplugin_components_0$2;
  const _component_la_angle_up = __unplugin_components_1$1;
  const _component_mate_link = __unplugin_components_2;
  return Object.keys($setup.mates).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", {
      class: "flex p-4 bg-light-900 rounded-xl mb-2 items-center cursor-pointer shadow-sm hover_shadow-md transition",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.open = !$setup.open)
    }, [
      createBaseVNode("div", _hoisted_2$1, toDisplayString($props.pub == $setup.user.pub ? "My mates" : "Mates"), 1),
      _hoisted_3$1,
      createBaseVNode("div", _hoisted_4, toDisplayString(Object.keys($setup.mates).length), 1),
      !$setup.open ? (openBlock(), createBlock(_component_la_angle_down, { key: 0 })) : (openBlock(), createBlock(_component_la_angle_up, { key: 1 }))
    ]),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        $setup.open ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createVNode(TransitionGroup, { name: "fade" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.mates, (link, linkPub) => {
                return openBlock(), createBlock(_component_mate_link, {
                  key: linkPub,
                  emoji: link.emoji,
                  back: link.back,
                  to: linkPub,
                  from: $props.pub,
                  onClick: ($event) => _ctx.$emit("browse", linkPub)
                }, null, 8, ["emoji", "back", "to", "from", "onClick"]);
              }), 128))
            ]),
            _: 1
          })
        ])) : createCommentVNode("v-if", true)
      ]),
      _: 1
    })
  ])) : createCommentVNode("v-if", true);
}
const _sfc_main$1 = {
  __name: "MateList",
  props: {
    pub: { type: String, default: "" }
  },
  emits: ["browse"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorDeep = useColor("pale");
    const mates = useMates(props.pub);
    const open = ref(true);
    const __returned__ = { props, colorDeep, mates, open, computed, ref, useColor, useMates, isEmoji, user };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/mate/MateList.vue";
var __unplugin_components_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$2], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/mate/MateList.vue"]]);
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M230 96a14 14 0 0 0-14-14h-34V48a14 14 0 0 0-14-14H40a14 14 0 0 0-14 14v128a6 6 0 0 0 3.4 5.4a5.8 5.8 0 0 0 2.6.6a6.7 6.7 0 0 0 3.8-1.3L73.7 150h.3v34a14 14 0 0 0 14 14h94.3l37.9 30.7a6.7 6.7 0 0 0 3.8 1.3a5.8 5.8 0 0 0 2.6-.6a6 6 0 0 0 3.4-5.4ZM71.6 138a6.5 6.5 0 0 0-3.8 1.3L38 163.4V48a2 2 0 0 1 2-2h128a2 2 0 0 1 2 2v88a2 2 0 0 1-2 2Zm116.6 49.3a6.5 6.5 0 0 0-3.8-1.3H88a2 2 0 0 1-2-2v-34h82a14 14 0 0 0 14-14V94h34a2 2 0 0 1 2 2v115.4Z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3);
}
var __unplugin_components_0 = { name: "ph-chats-light", render: render$1 };
const _hoisted_1 = { class: "font-bold text-lg mx-2" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ph_chats_light = __unplugin_components_0;
  return openBlock(), createElementBlock("div", {
    class: "pl-2 flex items-center bg-light-200 rounded-xl cursor-pointer",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("chat")),
    style: normalizeStyle({ opacity: $setup.available ? 1 : 0.1 })
  }, [
    createVNode(_component_ph_chats_light, { class: "text-xl" }),
    createBaseVNode("div", _hoisted_1, toDisplayString($setup.count), 1)
  ], 4);
}
const _sfc_main = {
  __name: "ChatPrivateCount",
  props: {
    pub: String
  },
  emits: ["chat"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { count, available } = usePrivateChatCount(props.pub);
    const __returned__ = { props, emit, count, available, usePrivateChatCount };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/chat/private/ChatPrivateCount.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/private/ChatPrivateCount.vue"]]);
export { __unplugin_components_1, __unplugin_components_6 };
