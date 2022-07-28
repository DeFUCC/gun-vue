import { useUser } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, toDisplayString$1 as toDisplayString, withDirectives$1 as withDirectives, vModelText$1 as vModelText } from "./vendor.es.js";
import { useGift } from "./useGifts.es.js";
import { useGuests } from "./useGuests.es.js";
import __unplugin_components_1 from "./AccountSelect.es.js";
import __unplugin_components_0 from "./UserIcon.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./times.es.js";
import "./AccountBadge.es.js";
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
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "font-mono text-sm m-4 opacity-50 break-all" }, null, -1);
const _hoisted_6 = { class: "p-4 bg-light-300 bg-opacity-30 flex flex-wrap gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_user_icon = __unplugin_components_0;
  const _component_account_select = __unplugin_components_1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_user_icon, {
        class: "pointer-events-none",
        size: 150
      }),
      createBaseVNode("div", _hoisted_3, toDisplayString($setup.user.name), 1)
    ]),
    createBaseVNode("div", _hoisted_4, [
      _hoisted_5,
      createVNode(_component_account_select, {
        pub: $setup.gift.to,
        "onUpdate:pub": _cache[0] || (_cache[0] = ($event) => $setup.gift.to = $event)
      }, null, 8, ["pub"]),
      createBaseVNode("div", _hoisted_6, [
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
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.propose())
      }, "Propose")
    ])
  ]);
}
const _sfc_main = {
  __name: "GiftForm",
  setup(__props, { expose }) {
    expose();
    const { user } = useUser();
    const { gift, propose } = useGift();
    const { guests, count } = useGuests();
    const __returned__ = { user, gift, propose, guests, count, useGuests, useGift, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftForm.vue";
var GiftForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftForm.vue"]]);
export { GiftForm as default };
