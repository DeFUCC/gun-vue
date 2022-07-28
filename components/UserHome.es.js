import { openBlock, createElementBlock, createBaseVNode, toDisplayString, Fragment, renderList, createVNode, withCtx, createBlock, renderSlot, normalizeStyle, createTextVNode, computed, ref } from "./vendor.es.js";
import { useUser } from "./useDraw.es.js";
import __unplugin_components_7 from "./UserRooms.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1, __unplugin_components_6 } from "./ChatPrivateCount.es.js";
import { usePrivateChatList } from "./usePrivate.es.js";
import __unplugin_components_0 from "./AccountBadge.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import __unplugin_components_4 from "./UserProfile.es.js";
import __unplugin_components_3$1 from "./UserPanel.es.js";
import __unplugin_components_2 from "./UserLogin.es.js";
import { __unplugin_components_3 } from "./UiLayer.es.js";
import __unplugin_components_0$1 from "./UserCredentials.es.js";
import "./RoomCard.es.js";
import "./useBackground.es.js";
import "./AccountAvatar.es.js";
import "./enter-outline.es.js";
import "./eye.es.js";
import "./angle-up.es.js";
import "./useMates.es.js";
import "./plus.es.js";
import "./times.es.js";
import "./check.es.js";
import "./pen.es.js";
import "./exit-outline.es.js";
import "./lock.es.js";
import "./MateButton.es.js";
import "./UserAvatar.es.js";
import "./useFile.es.js";
import "./UserCreate.es.js";
import "./UserAuth.es.js";
import "./QrLoad.es.js";
import "./qrcode.es.js";
import "./QrShow.es.js";
import "./UserPass.es.js";
const _hoisted_1$1 = { class: "flex flex-col p-4 gap-2" };
const _hoisted_2$1 = { class: "font-bold text-xl" };
const _hoisted_3$1 = { class: "flex flex-wrap gap-2" };
const _hoisted_4$1 = ["onClick"];
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_badge = __unplugin_components_0;
  const _component_chat_private_count = __unplugin_components_1$1;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, toDisplayString($props.title), 1),
    createBaseVNode("div", _hoisted_3$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.list, (chat, pub) => {
        return openBlock(), createElementBlock("div", {
          class: "p-2 rounded-xl flex items-center bg-light-900 cursor-pointer",
          key: pub,
          onClick: ($event) => _ctx.$emit("chat", pub)
        }, [
          createVNode(_component_account_badge, { pub }, null, 8, ["pub"]),
          _hoisted_5,
          createVNode(_component_chat_private_count, { pub }, null, 8, ["pub"])
        ], 8, _hoisted_4$1);
      }), 128))
    ])
  ]);
}
const _sfc_main$1 = {
  __name: "ChatPrivateList",
  props: {
    title: { type: String, default: "Private chats" }
  },
  emits: ["chat"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { list } = usePrivateChatList();
    const __returned__ = { props, list, emit, usePrivateChatList };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/chat/private/ChatPrivateList.vue";
var __unplugin_components_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/private/ChatPrivateList.vue"]]);
const _hoisted_1 = { class: "flex flex-col items-center w-full" };
const _hoisted_2 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_3 = { class: "p-4 flex flex-col items-start" };
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" My public profile");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_user_credentials = __unplugin_components_0$1;
  const _component_ui_layer = __unplugin_components_3;
  const _component_user_login = __unplugin_components_2;
  const _component_user_panel = __unplugin_components_3$1;
  const _component_user_profile = __unplugin_components_4;
  const _component_chat_private_list = __unplugin_components_5;
  const _component_mate_list = __unplugin_components_6;
  const _component_user_rooms = __unplugin_components_7;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_ui_layer, {
      open: $setup.user.is && !((_a = $setup.user.safe) == null ? void 0 : _a.saved),
      closeButton: "",
      onClose: _cache[1] || (_cache[1] = ($event) => $setup.isSafe())
    }, {
      default: withCtx(() => [
        createVNode(_component_user_credentials, {
          onClose: _cache[0] || (_cache[0] = ($event) => $setup.isSafe())
        })
      ]),
      _: 1
    }, 8, ["open"]),
    !$setup.user.is ? (openBlock(), createBlock(_component_user_login, { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode(_component_user_panel, {
        onBrowse: _cache[2] || (_cache[2] = ($event) => {
          _ctx.$emit("browse", $event);
          _ctx.$emit("close");
        })
      }),
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_user_profile),
        createVNode(_component_chat_private_list, {
          onChat: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("chat", $event))
        }),
        createVNode(_component_mate_list, {
          pub: $setup.user.pub,
          onBrowse: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("user", $event))
        }, null, 8, ["pub"]),
        createVNode(_component_user_rooms, {
          onBrowse: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("room", $event))
        })
      ]),
      createBaseVNode("button", {
        class: "p-4 m-4 rounded-xl font-bold text-lg shadow-md",
        onClick: _cache[6] || (_cache[6] = ($event) => {
          _ctx.$emit("user", $setup.user.pub);
          _ctx.$emit("close");
        }),
        style: normalizeStyle({ backgroundColor: $setup.user.color })
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_4
        ])
      ], 4)
    ]))
  ]);
}
const _sfc_main = {
  __name: "UserHome",
  emits: ["user", "room", "close", "chat"],
  setup(__props, { expose, emit }) {
    expose();
    const { user } = useUser();
    function isSafe() {
      user.db.get("safe").get("saved").put(true);
    }
    const __returned__ = { emit, user, isSafe, computed, ref, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserHome.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserHome.vue"]]);
export { __unplugin_components_1 as default };
