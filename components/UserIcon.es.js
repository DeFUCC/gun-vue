import { useUser, selectedUser, safeHash } from "./useDraw.es.js";
import { openBlock, createElementBlock, createVNode, withCtx, createBlock } from "./vendor.es.js";
import { __unplugin_components_3 as __unplugin_components_3$1 } from "./UiLayer.es.js";
import __unplugin_components_3 from "./AccountHome.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1 } from "./UiPanel.es.js";
import __unplugin_components_1 from "./UserHome.es.js";
import __unplugin_components_0$1 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./times.es.js";
import "./useBackground.es.js";
import "./useReactions.es.js";
import "./useMates.es.js";
import "./PostCard.es.js";
import "./useZip.es.js";
import "./useFile.es.js";
import "./useMd.es.js";
import "./PostActionReact.es.js";
import "./AccountBadge.es.js";
import "./plus.es.js";
import "./youtube.es.js";
import "./trash.es.js";
import "./angle-up.es.js";
import "./ChatPrivateCount.es.js";
import "./usePrivate.es.js";
import "./MateButton.es.js";
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
const _hoisted_1 = { class: "z-1000" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_avatar = __unplugin_components_0$1;
  const _component_user_home = __unplugin_components_1;
  const _component_ui_panel = __unplugin_components_1$1;
  const _component_account_home = __unplugin_components_3;
  const _component_ui_layer = __unplugin_components_3$1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_account_avatar, {
      class: "cursor-pointer",
      size: $props.size,
      border: 2,
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.user.auth = true),
      pub: $setup.user.pub
    }, null, 8, ["size", "pub"]),
    createVNode(_component_ui_panel, {
      open: $setup.user.auth,
      onClose: _cache[6] || (_cache[6] = ($event) => $setup.user.auth = false)
    }, {
      default: withCtx(() => [
        createVNode(_component_user_home, {
          class: "max-w-600px",
          onRoom: _cache[1] || (_cache[1] = ($event) => {
            _ctx.$emit("room", $event);
            $setup.user.auth = false;
          }),
          onUser: _cache[2] || (_cache[2] = ($event) => {
            _ctx.$emit("user", $event);
            $setup.user.auth = false;
          }),
          onChat: _cache[3] || (_cache[3] = ($event) => {
            _ctx.$emit("chat", $event);
            $setup.user.auth = false;
          }),
          onClose: _cache[4] || (_cache[4] = ($event) => $setup.user.auth = false),
          onPost: _cache[5] || (_cache[5] = ($event) => {
            _ctx.$emit("post", $setup.safeHash($event));
            $setup.user.auth = false;
          })
        })
      ]),
      _: 1
    }, 8, ["open"]),
    createVNode(_component_ui_layer, {
      open: $setup.selectedUser.pub,
      onClose: _cache[11] || (_cache[11] = ($event) => $setup.selectedUser.pub = null)
    }, {
      default: withCtx(() => [
        (openBlock(), createBlock(_component_account_home, {
          class: "max-w-600px",
          pub: $setup.selectedUser.pub,
          onUser: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("user", $event)),
          onPost: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("post", $setup.safeHash($event))),
          onChat: _cache[9] || (_cache[9] = ($event) => _ctx.$emit("chat", $setup.selectedUser.pub)),
          onClose: _cache[10] || (_cache[10] = ($event) => $setup.selectedUser.pub = null),
          key: $setup.selectedUser.pub
        }, null, 8, ["pub"]))
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const _sfc_main = {
  __name: "UserIcon",
  props: {
    size: { type: Number, default: 42 }
  },
  emits: ["room", "user", "post", "chat"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const __returned__ = { props, user, useUser, selectedUser, safeHash };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserIcon.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserIcon.vue"]]);
export { __unplugin_components_0 as default };
