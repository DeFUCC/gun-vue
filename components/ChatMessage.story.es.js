import { resolveComponent$1 as resolveComponent, openBlock$1 as openBlock, createBlock$1 as createBlock, withCtx$1 as withCtx, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, withDirectives$1 as withDirectives, vModelText$1 as vModelText, normalizeProps, guardReactiveProps, defineAsyncComponent$1 as defineAsyncComponent, reactive$1 as reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Chat/Message",
    icon: "la:envelope"
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode($setup["AccountSelect"], {
          pub: $setup.state.author,
          "onUpdate:pub": _cache[0] || (_cache[0] = ($event) => $setup.state.author = $event)
        }, null, 8, ["pub"]),
        withDirectives(createBaseVNode("textarea", {
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.text = $event)
        }, null, 512), [
          [vModelText, $setup.state.text]
        ])
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["ChatMessage"], normalizeProps(guardReactiveProps($setup.state)), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "ChatMessage.story",
  setup(__props, { expose }) {
    expose();
    const ChatMessage = defineAsyncComponent(() => import("./ChatMessage.es.js").then(function(n) {
      return n.ChatMessage;
    }));
    const AccountSelect = defineAsyncComponent(() => import("./AccountSelect.es.js"));
    const state = reactive({
      author: "",
      timestamp: Date.now(),
      text: "message text"
    });
    const __returned__ = { ChatMessage, AccountSelect, state, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/chat/ChatMessage.story.vue";
var ChatMessage_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatMessage.story.vue"]]);
export { ChatMessage_story as default };
