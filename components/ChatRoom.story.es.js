import { resolveComponent$1 as resolveComponent, openBlock$1 as openBlock, createBlock$1 as createBlock, withCtx$1 as withCtx, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, normalizeProps, guardReactiveProps, defineAsyncComponent$1 as defineAsyncComponent, reactive$1 as reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Chat/Room",
    icon: "la:home"
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode($setup["ChatTopics"], {
          onTopic: _cache[0] || (_cache[0] = ($event) => $setup.state.topic = $event)
        })
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["ChatRoom"], normalizeProps(guardReactiveProps($setup.state)), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "ChatRoom.story",
  setup(__props, { expose }) {
    expose();
    const ChatRoom = defineAsyncComponent(() => import("./ChatMessage.es.js").then(function(n) {
      return n.ChatRoom;
    }));
    const ChatTopics = defineAsyncComponent(() => import("./ChatTopics.es.js"));
    const state = reactive({
      topic: "general"
    });
    const __returned__ = { ChatRoom, ChatTopics, state, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/chat/ChatRoom.story.vue";
var ChatRoom_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatRoom.story.vue"]]);
export { ChatRoom_story as default };
