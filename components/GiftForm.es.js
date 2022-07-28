import { useUser } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, toDisplayString$1 as toDisplayString, createBlock$1 as createBlock, withCtx$1 as withCtx, Fragment$1 as Fragment, renderList$1 as renderList, withDirectives$1 as withDirectives, vModelText$1 as vModelText } from "./vendor.es.js";
import { useNewGift } from "./index.es2.js";
import { useGuests } from "./useGuests.es.js";
import __unplugin_components_0$1 from "./AccountBadge.es.js";
import { __unplugin_components_0 as __unplugin_components_0$2 } from "./times.es.js";
import __unplugin_components_0 from "./UserIcon.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
import "./UiLayer.es.js";
import "./AccountHome.es.js";
import "./useBackground.es.js";
import "./useReactions.es.js";
import "./useMates.es.js";
import "./PostCard.es.js";
import "./useZip.es.js";
import "./useFile.es.js";
import "./useMd.es.js";
import "./PostActionReact.es.js";
import "./plus.es.js";
import "./youtube.es.js";
import "./trash.es.js";
import "./angle-up.es.js";
import "./ChatPrivateCount.es.js";
import "./usePrivate.es.js";
import "./MateButton.es.js";
import "./UiPanel.es.js";
import "./UserHome.es.js";
import "./UserRooms.es.js";
import "./RoomCard.es.js";
import "./enter-outline.es.js";
import "./eye.es.js";
import "./UserProfile.es.js";
import "./check.es.js";
import "./pen.es.js";
import "./UserPanel.es.js";
import "./exit-outline.es.js";
import "./lock.es.js";
import "./UserAvatar.es.js";
import "./camera.es.js";
import "./UserLogin.es.js";
import "./UserCreate.es.js";
import "./UserAuth.es.js";
import "./QrLoad.es.js";
import "./qrcode.es.js";
import "./UserCredentials.es.js";
import "./QrShow.es.js";
import "./UserPass.es.js";
const _hoisted_1 = { class: "flex" };
const _hoisted_2 = { class: "w-160px p-4 text-center" };
const _hoisted_3 = { class: "text-lg" };
const _hoisted_4 = { class: "flex-1" };
const _hoisted_5 = { class: "font-mono text-sm m-4 opacity-50 break-all" };
const _hoisted_6 = { class: "p-4" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_8 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_9 = { class: "font-bold" };
const _hoisted_10 = { class: "flex flex-wrap gap-3" };
const _hoisted_11 = { class: "p-4 bg-light-300 bg-opacity-30 flex flex-wrap gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_user_icon = __unplugin_components_0;
  const _component_la_times = __unplugin_components_0$2;
  const _component_account_badge = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_user_icon, {
        class: "pointer-events-none",
        size: 150
      }),
      createBaseVNode("div", _hoisted_3, toDisplayString($setup.user.name), 1)
    ]),
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("div", _hoisted_5, toDisplayString($setup.gift), 1),
      createBaseVNode("div", _hoisted_6, [
        $setup.gift.to ? (openBlock(), createBlock(_component_account_badge, {
          key: 0,
          pub: $setup.gift.to
        }, {
          default: withCtx(() => [
            _hoisted_7,
            createVNode(_component_la_times, {
              class: "mr-2",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.gift.to = "")
            })
          ]),
          _: 1
        }, 8, ["pub"])) : (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, "USER SELECT OF " + toDisplayString($setup.count.total), 1),
          createBaseVNode("div", _hoisted_10, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.guests, (guest) => {
              return openBlock(), createBlock(_component_account_badge, {
                key: guest,
                onClick: ($event) => $setup.gift.to = guest.pub,
                pub: guest.pub
              }, null, 8, ["onClick", "pub"]);
            }), 128))
          ])
        ]))
      ]),
      createBaseVNode("div", _hoisted_11, [
        withDirectives(createBaseVNode("input", {
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.gift.qn = $event),
          placeholder: "Quantity"
        }, null, 512), [
          [vModelText, $setup.gift.qn]
        ]),
        withDirectives(createBaseVNode("input", {
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.gift.ql = $event),
          placeholder: "Quality"
        }, null, 512), [
          [vModelText, $setup.gift.ql]
        ]),
        withDirectives(createBaseVNode("textarea", {
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.gift.wish = $event),
          placeholder: "Wish"
        }, null, 512), [
          [vModelText, $setup.gift.wish]
        ])
      ]),
      createBaseVNode("button", {
        class: "button",
        onClick: _cache[4] || (_cache[4] = ($event) => {
          $setup.propose();
          _ctx.$emit("sent");
        })
      }, "Propose")
    ])
  ]);
}
const _sfc_main = {
  __name: "GiftForm",
  emits: ["sent"],
  setup(__props, { expose, emit }) {
    expose();
    const { user } = useUser();
    const { gift, propose } = useNewGift();
    const { guests, count } = useGuests();
    const __returned__ = { user, gift, propose, guests, count, emit, useGuests, useNewGift, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftForm.vue";
var GiftForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftForm.vue"]]);
export { GiftForm as default };
