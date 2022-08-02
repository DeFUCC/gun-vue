import { useUser, useColor, useGun } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBlock$1 as createBlock, toDisplayString$1 as toDisplayString, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, Fragment$1 as Fragment, withModifiers$1 as withModifiers, createCommentVNode$1 as createCommentVNode, normalizeStyle$1 as normalizeStyle, computed$1 as computed, ref$1 as ref, useTimeAgo } from "./vendor.es.js";
import { __unplugin_components_2 } from "./times.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1 } from "./check.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import __unplugin_components_0$1 from "./AccountBadge.es.js";
import { useGift, giftState } from "./useGift.es.js";
import "./AccountAvatar.es.js";
const _hoisted_1$1 = { class: "py-1 rounded-lg flex justify-center text-center text-sm bg-dark-50 bg-opacity-20" };
const _hoisted_2$1 = {
  key: 2,
  class: "p-1"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_check = __unplugin_components_1$1;
  const _component_la_times = __unplugin_components_2;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    $props.state === true ? (openBlock(), createBlock(_component_la_check, { key: 0 })) : $props.state === false ? (openBlock(), createBlock(_component_la_times, { key: 1 })) : (openBlock(), createElementBlock("div", _hoisted_2$1, toDisplayString($props.state), 1))
  ]);
}
const _sfc_main$1 = {
  __name: "GiftStatus",
  props: {
    state: {
      type: [String, Boolean],
      default: ""
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/gift/GiftStatus.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftStatus.vue"]]);
const _hoisted_1 = { class: "flex items-center gap-2 w-full" };
const _hoisted_2 = { class: "flex flex-col gap-2" };
const _hoisted_3 = { class: "flex-auto flex items-center flex flex-col" };
const _hoisted_4 = { class: "flex flex-col" };
const _hoisted_5 = { class: "text-xl font-bold" };
const _hoisted_6 = { class: "flex flex-col" };
const _hoisted_7 = { class: "text-lg font-bold" };
const _hoisted_8 = { class: "flex flex-col gap-2" };
const _hoisted_9 = {
  key: 0,
  class: "flex flex-1 gap-2 p-2 items-center flex-wrap"
};
const _hoisted_10 = { class: "flex gap-2 flex-wrap" };
const _hoisted_11 = {
  key: 0,
  class: "flex flex-col gap-1"
};
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "text-xs" }, "ROOM ", -1);
const _hoisted_13 = { class: "p-0" };
const _hoisted_14 = {
  key: 1,
  class: "flex flex-col gap-1"
};
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("div", { class: "text-xs" }, "PROJECT", -1);
const _hoisted_16 = { class: "p-0" };
const _hoisted_17 = {
  key: 2,
  class: "flex flex-col gap-1"
};
const _hoisted_18 = { class: "text-xs" };
const _hoisted_19 = { class: "p-0" };
const _hoisted_20 = { class: "font-mono text-8px mb-0 mt-2" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_account_badge = __unplugin_components_0$1;
  const _component_gift_status = __unplugin_components_1;
  return openBlock(), createElementBlock("div", {
    class: "p-2 rounded-xl bg-light-200 bg-opacity-90 flex shadow-lg flex-col items-center border-2",
    style: normalizeStyle([{ "flex": "1 1 200px" }, { backgroundColor: $setup.state.complete ? $setup.color.hex($props.hash) : "#ccc3", borderColor: !$setup.state.complete ? $setup.color.hex($props.hash) : "transparent" }])
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createVNode(_component_account_badge, {
          pub: $setup.gift.from
        }, null, 8, ["pub"]),
        createVNode(_component_gift_status, {
          state: $setup.state.from
        }, null, 8, ["state"]),
        $setup.gift.from == $setup.user.pub ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          !$setup.state.from ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "button",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.giftState($props.hash, true), ["stop", "prevent"]))
          }, "Propose")) : (openBlock(), createElementBlock("button", {
            key: 1,
            class: "button",
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $setup.giftState($props.hash, false), ["stop", "prevent"]))
          }, "Cancel"))
        ], 64)) : createCommentVNode("v-if", true)
      ]),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, toDisplayString($setup.gift.qn), 1)
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, toDisplayString($setup.gift.ql), 1)
        ])
      ]),
      createBaseVNode("div", _hoisted_8, [
        createVNode(_component_account_badge, {
          pub: $setup.gift.to
        }, null, 8, ["pub"]),
        createVNode(_component_gift_status, {
          state: $setup.state.to
        }, null, 8, ["state"]),
        $setup.gift.to == ((_a = $setup.user) == null ? void 0 : _a.pub) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          !$setup.state.to ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "button",
            onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $setup.giftState($props.hash, true), ["stop", "prevent"]))
          }, "Accept")) : createCommentVNode("v-if", true),
          $setup.state.to ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "button",
            onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $setup.giftState($props.hash, false), ["stop", "prevent"]))
          }, "Reject")) : createCommentVNode("v-if", true)
        ], 64)) : createCommentVNode("v-if", true)
      ])
    ]),
    $setup.gift.wish ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString($setup.gift.wish), 1)) : createCommentVNode("v-if", true),
    createBaseVNode("div", _hoisted_10, [
      $setup.gift.room ? (openBlock(), createElementBlock("div", _hoisted_11, [
        _hoisted_12,
        createBaseVNode("div", _hoisted_13, toDisplayString($setup.roomTitle), 1)
      ])) : createCommentVNode("v-if", true),
      $setup.gift.project ? (openBlock(), createElementBlock("div", _hoisted_14, [
        _hoisted_15,
        createBaseVNode("div", _hoisted_16, toDisplayString($setup.gift.project.slice(0, -88)), 1)
      ])) : createCommentVNode("v-if", true),
      $setup.gift.date ? (openBlock(), createElementBlock("div", _hoisted_17, [
        createBaseVNode("div", _hoisted_18, toDisplayString($setup.date), 1),
        createBaseVNode("div", _hoisted_19, toDisplayString($setup.time), 1)
      ])) : createCommentVNode("v-if", true)
    ]),
    createBaseVNode("div", _hoisted_20, toDisplayString($props.hash), 1)
  ], 4);
}
const _sfc_main = {
  __name: "GiftCard",
  props: {
    hash: String
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const color = useColor();
    const { gift, state } = useGift(props.hash);
    const time = computed(() => new Date(gift.date).toLocaleTimeString("en-GB"));
    const date = computed(() => new Date(gift.date).toLocaleDateString("en-GB"));
    const roomTitle = computed(() => {
      const title = ref();
      const gun = useGun();
      gun.user(gift.room).get("profile").get("name").on((d) => title.value = d);
      return title.value;
    });
    const __returned__ = { props, user, color, gift, state, time, date, roomTitle, giftState, useColor, useUser, useGift, useGun, computed, ref, useTimeAgo };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftCard.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftCard.vue"]]);
export { __unplugin_components_0 as default };
