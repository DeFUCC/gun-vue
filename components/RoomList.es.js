import { useUser, createRoom, enterRoom, useRooms } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createCommentVNode, withDirectives, vModelText, createVNode, withCtx, Transition, normalizeStyle, reactive, computed, SEA, ref, Fragment, renderList, createBlock } from "./vendor.es.js";
import { __unplugin_components_2 } from "./RoomCard.es.js";
import { __unplugin_components_1 } from "./PostActionReact.es.js";
import { useBackground } from "./useBackground.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
import "./useReactions.es.js";
import "./useMates.es.js";
import "./AccountBadge.es.js";
import "./times.es.js";
import "./plus.es.js";
const _hoisted_1$1 = { class: "flex" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.user.pub ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "flex flex-col bg-cover rounded-2xl p-8 max-w-620px bg-light-800 justify-center",
    style: normalizeStyle({ ...$setup.bg })
  }, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("button", {
        class: "button m-2 flex-1",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.genPair())
      }, "Generate a new room"),
      $setup.create.pair ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "button m-2",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.reset())
      }, "Reset")) : createCommentVNode("v-if", true)
    ]),
    $setup.create.pair ? withDirectives((openBlock(), createElementBlock("input", {
      key: 0,
      class: "p-2 m-2 rounded-xl",
      type: "text",
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.create.name = $event),
      placeholder: "New room name"
    }, null, 512)), [
      [vModelText, $setup.create.name]
    ]) : createCommentVNode("v-if", true),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        $setup.create.pair && $setup.create.name ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "button m-2 flex-1",
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.createIt())
        }, "Add room")) : createCommentVNode("v-if", true)
      ]),
      _: 1
    })
  ], 4)) : createCommentVNode("v-if", true);
}
const _sfc_main$1 = {
  __name: "RoomForm",
  emits: ["room"],
  setup(__props, { expose, emit }) {
    expose();
    const { user } = useUser();
    const create = reactive({
      pair: null,
      name: ""
    });
    async function genPair() {
      let pair = await SEA.pair();
      create.pair = pair;
    }
    function reset() {
      create.pair = null;
      create.name = "";
    }
    function createIt() {
      createRoom({ pair: { ...create.pair }, name: create.name });
      reset();
    }
    const bg = computed(() => {
      var _a;
      return useBackground({ pub: (_a = create.pair) == null ? void 0 : _a.pub, size: 620 });
    });
    const __returned__ = { emit, user, create, genPair, reset, createIt, bg, useUser, SEA, createRoom, useBackground, enterRoom, reactive, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/room/RoomForm.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomForm.vue"]]);
const _hoisted_1 = { class: "flex flex-col mb-4" };
const _hoisted_2 = { class: "flex flex-wrap gap-4 my-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_room_form = __unplugin_components_0;
  const _component_post_action_react = __unplugin_components_1;
  const _component_room_card = __unplugin_components_2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_room_form, {
        onRoom: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("browse", $event))
      }),
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.rooms, (authors, pub) => {
        return openBlock(), createBlock(_component_room_card, {
          style: { "flex": "1 1 200px" },
          key: pub,
          pub,
          onClick: ($event) => _ctx.$emit("browse", pub)
        }, {
          default: withCtx(() => [
            createVNode(_component_post_action_react, {
              authors,
              hash: pub,
              tag: "rooms"
            }, null, 8, ["authors", "hash"])
          ]),
          _: 2
        }, 1032, ["pub", "onClick"]);
      }), 128))
    ])
  ]);
}
const _sfc_main = {
  __name: "RoomList",
  emits: ["browse"],
  setup(__props, { expose }) {
    expose();
    const { rooms } = useRooms();
    const __returned__ = { rooms, useRooms, reactive, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/room/RoomList.vue";
var RoomList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomList.vue"]]);
export { RoomList as default };
