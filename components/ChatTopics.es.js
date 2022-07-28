import { openBlock, createElementBlock, toDisplayString, createCommentVNode, createVNode, withCtx, createBaseVNode, Transition, createBlock, withDirectives, vModelText, withKeys, Fragment, renderList, ref, useMediaQuery, onClickOutside, computed, watch, nextTick } from "./vendor.es.js";
import { useUser, currentRoom } from "./useDraw.es.js";
import { useChat } from "./useChat.es.js";
import { useBackground } from "./useBackground.es.js";
import __unplugin_components_0$1 from "./AccountAvatar.es.js";
import { __unplugin_components_0 } from "./times.es.js";
import { __unplugin_components_1 } from "./plus.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = {
  key: 0,
  class: "px-1 py-4 flex flex-col bg-dark-50 bg-opacity-95 gap-2 min-h-full overflow-y-scroll scroll-smooth absolute sm_static z-20 w-220px max-w-full max-h-full text-light-900 backdrop-filter backdrop-blur-xl",
  style: { "flex": "0 1 320px" },
  ref: "chatsPanel"
};
const _hoisted_2 = { class: "flex flex-wrap" };
const _hoisted_3 = { class: "text-xl font-bold p-2" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_5 = {
  key: 0,
  class: "flex flex-wrap"
};
const _hoisted_6 = { class: "flex flex-col p-2 gap-2 h-full" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "flex-1" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_plus = __unplugin_components_1;
  const _component_la_times = __unplugin_components_0;
  const _component_account_avatar = __unplugin_components_0$1;
  return openBlock(), createElementBlock(Fragment, null, [
    !$setup.panelOpen && !$setup.isLarge ? (openBlock(), createElementBlock("button", {
      key: 0,
      class: "button absolute z-200 top-4 left-4",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.panelOpen = true)
    }, toDisplayString($props.title), 1)) : createCommentVNode("v-if", true),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        $setup.isLarge || $setup.panelOpen && !$setup.isLarge ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, toDisplayString($props.title), 1),
            _hoisted_4,
            createBaseVNode("div", {
              class: "cursor-pointer self-center text-2xl p-2",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.adding = !$setup.adding)
            }, [
              createVNode(Transition, {
                name: "fade",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  !$setup.adding ? (openBlock(), createBlock(_component_la_plus, { key: 0 })) : (openBlock(), createBlock(_component_la_times, { key: 1 }))
                ]),
                _: 1
              })
            ])
          ]),
          $setup.adding ? (openBlock(), createElementBlock("div", _hoisted_5, [
            withDirectives(createBaseVNode("input", {
              class: "p-2 m-2 w-full rounded-xl text-dark-800",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newChat = $event),
              onKeyup: _cache[3] || (_cache[3] = withKeys(($event) => {
                $setup.addChat($setup.newChat);
                $setup.newChat = "";
                $setup.adding = false;
              }, ["enter"])),
              placeholder: "New chat"
            }, null, 544), [
              [vModelText, $setup.newChat]
            ])
          ])) : createCommentVNode("v-if", true),
          createBaseVNode("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.chats, (authors, topic) => {
              return openBlock(), createElementBlock("div", {
                class: "font-bold bg-light-100 bg-opacity-10 rounded-xl px-2 cursor-pointer flex",
                key: topic,
                onClick: ($event) => {
                  _ctx.$emit("topic", topic);
                  $setup.panelOpen = false;
                }
              }, [
                createBaseVNode("div", _hoisted_8, toDisplayString(topic), 1),
                (openBlock(true), createElementBlock(Fragment, null, renderList(authors, (isAuthor, author) => {
                  return openBlock(), createBlock(_component_account_avatar, {
                    key: author,
                    size: 20,
                    pub: author
                  }, null, 8, ["pub"]);
                }), 128))
              ], 8, _hoisted_7);
            }), 128))
          ])
        ], 512)) : createCommentVNode("v-if", true)
      ]),
      _: 1
    })
  ], 64);
}
const _sfc_main = {
  __name: "ChatTopics",
  props: {
    title: { type: String, default: "Topics" },
    topic: { type: String, default: "general" }
  },
  emits: ["topic"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const { addChat, chats } = useChat();
    const newChat = ref("");
    const adding = ref(false);
    const chatsPanel = ref();
    const panelOpen = ref(true);
    const isLarge = useMediaQuery("(min-width: 640px)");
    onClickOutside(chatsPanel, (event) => !isLarge.value ? panelOpen.value = false : null);
    const __returned__ = { props, emit, user, addChat, chats, newChat, adding, chatsPanel, panelOpen, isLarge, ref, computed, watch, nextTick, useMediaQuery, onClickOutside, useChat, useUser, useBackground, currentRoom };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/chat/ChatTopics.vue";
var ChatTopics = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatTopics.vue"]]);
export { ChatTopics as default };
