import { openBlock, createElementBlock, createBaseVNode, toDisplayString, createBlock, createVNode, withCtx, Fragment, renderList, createCommentVNode, Transition, computed, ref, SEA } from "./vendor.es.js";
import { useUser, createRoom, enterRoom, recreateRoom } from "./useDraw.es.js";
import { __unplugin_components_2 as __unplugin_components_2$1 } from "./RoomCard.es.js";
import { __unplugin_components_3, __unplugin_components_2 } from "./enter-outline.es.js";
import { __unplugin_components_4 } from "./eye.es.js";
import { __unplugin_components_0, __unplugin_components_1 } from "./angle-up.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./useBackground.es.js";
import "./AccountAvatar.es.js";
const _hoisted_1 = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-lg font-bold" }, "My rooms", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_4 = { class: "text-md font-bold mr-2" };
const _hoisted_5 = {
  key: 0,
  class: "flex flex-wrap gap-2 mb-8"
};
const _hoisted_6 = { class: "p-4 flex flex-wrap gap-1" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "View", -1);
const _hoisted_9 = ["onClick"];
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Enter", -1);
const _hoisted_11 = ["onClick"];
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Renew", -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_angle_down = __unplugin_components_0;
  const _component_la_angle_up = __unplugin_components_1;
  const _component_la_eye = __unplugin_components_4;
  const _component_ion_enter_outline = __unplugin_components_3;
  const _component_la_tools = __unplugin_components_2;
  const _component_room_card = __unplugin_components_2$1;
  return Object.keys($setup.rooms).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: "flex p-4 bg-light-900 rounded-xl mb-2 items-center cursor-pointer shadow-sm hover_shadow-md transition",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.open = !$setup.open)
    }, [
      _hoisted_2,
      _hoisted_3,
      createBaseVNode("div", _hoisted_4, toDisplayString(Object.keys($setup.rooms).length), 1),
      !$setup.open ? (openBlock(), createBlock(_component_la_angle_down, { key: 0 })) : (openBlock(), createBlock(_component_la_angle_up, { key: 1 }))
    ]),
    createVNode(Transition, {
      name: "fade",
      mode: "out-in"
    }, {
      default: withCtx(() => [
        $setup.open ? (openBlock(), createElementBlock("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.rooms, (enc, room) => {
            return openBlock(), createBlock(_component_room_card, {
              style: { "flex": "1 1 200px" },
              key: room,
              pub: room
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("button", {
                    class: "button",
                    onClick: ($event) => _ctx.$emit("browse", room)
                  }, [
                    createVNode(_component_la_eye),
                    _hoisted_8
                  ], 8, _hoisted_7),
                  createBaseVNode("button", {
                    class: "button",
                    onClick: ($event) => $setup.enterRoom(room)
                  }, [
                    createVNode(_component_ion_enter_outline),
                    _hoisted_10
                  ], 8, _hoisted_9),
                  createBaseVNode("button", {
                    class: "button",
                    onClick: ($event) => $setup.recreateRoom(enc)
                  }, [
                    createVNode(_component_la_tools),
                    _hoisted_12
                  ], 8, _hoisted_11)
                ])
              ]),
              _: 2
            }, 1032, ["pub"]);
          }), 128))
        ])) : createCommentVNode("v-if", true)
      ]),
      _: 1
    })
  ])) : createCommentVNode("v-if", true);
}
const _sfc_main = {
  __name: "UserRooms",
  emits: ["browse"],
  setup(__props, { expose, emit }) {
    expose();
    const { user } = useUser();
    const rooms = computed(() => {
      let list = user.safe.rooms;
      if (list) {
        delete list["_"];
        return list;
      } else {
        return {};
      }
    });
    const open = ref(false);
    const __returned__ = { emit, user, rooms, open, computed, ref, useUser, createRoom, SEA, enterRoom, recreateRoom };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserRooms.vue";
var __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserRooms.vue"]]);
export { __unplugin_components_7 as default };
