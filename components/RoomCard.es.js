import { useUser, useRoom, currentRoom } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, toDisplayString, Fragment, renderList, createBlock, renderSlot, normalizeStyle, computed } from "./vendor.es.js";
import { useBackground } from "./useBackground.es.js";
import __unplugin_components_0 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-4 font-bold text-xl flex flex-wrap items-center flex w-full" };
const _hoisted_2 = { class: "text-lg" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_4 = {
  class: "bg-light-200 bg-opacity-40 backdrop-filter backdrop-blur-md flex flex-wrap relative flex gap-2 items-center",
  style: { "flex": "1 1 140px" }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_avatar = __unplugin_components_0;
  return openBlock(), createElementBlock("div", {
    class: "rounded-xl shadow-md text-sm bg-cover cursor-pointer hover_shadow-lg transition duration-300ms filter brightness-95 hover_brightness-100 flex flex-wrap overflow-hidden",
    style: normalizeStyle({ ...$setup.bg, border: $setup.room.pub == $setup.currentRoom.pub ? "2px solid currentColor" : "" })
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, toDisplayString($setup.room.profile.name), 1),
      _hoisted_3,
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.room.hosts, (enc, host) => {
        return openBlock(), createBlock(_component_account_avatar, {
          class: "m-2",
          key: host,
          pub: host,
          size: 40
        }, null, 8, ["pub"]);
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_4, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 4);
}
const _sfc_main = {
  __name: "RoomCard",
  props: {
    pub: { type: String },
    authors: { type: Object, default: {} }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const { room } = useRoom(props.pub);
    const bg = computed(() => useBackground({ pub: props.pub, size: 400 }));
    const __returned__ = { props, user, room, bg, useUser, useRoom, useBackground, currentRoom, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/room/RoomCard.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomCard.vue"]]);
export { __unplugin_components_2 };
