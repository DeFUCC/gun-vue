import { resolveComponent, openBlock, createBlock, withCtx, createBaseVNode, createVNode, normalizeProps, guardReactiveProps, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Room/List",
    layout: { type: "single", iframe: false }
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("button", {
          class: "p-2 border-1 rounded-lg",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.generate())
        }, "Generate Key Pair")
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["RoomList"], normalizeProps(guardReactiveProps($setup.state)), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "RoomList.story",
  setup(__props, { expose }) {
    expose();
    const RoomList = defineAsyncComponent(() => __vitePreload(() => import("./RoomList.es.js"), true ? ["RoomList.es.js","useDraw.es.js","vendor.es.js","RoomCard.es.js","useBackground.es.js","AccountAvatar.es.js","plugin-vue_export-helper.es.js","PostActionReact.es.js","useReactions.es.js","useMates.es.js","AccountBadge.es.js","times.es.js","plus.es.js"] : void 0));
    const state = reactive({
      pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8"
    });
    async function generate() {
      const { SEA } = await __vitePreload(() => import("./index.es.js"), true ? ["index.es.js","useDraw.es.js","vendor.es.js","useChat.es.js","usePrivate.es.js","useLog.es.js","useFile.es.js","useZip.es.js","useMd.es.js","useGifts.es.js","useReactions.es.js","useMates.es.js","useGuests.es.js","useSpace.es.js","useBackground.es.js","useProjects.es.js"] : void 0);
      const pair = await SEA.pair();
      state.pub = pair.pub;
    }
    const __returned__ = { RoomList, state, generate, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/room/RoomList.story.vue";
var RoomList_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomList.story.vue"]]);
export { RoomList_story as default };
