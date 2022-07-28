import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createBaseVNode, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Room/Icon",
    layout: { type: "single" }
  }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["RoomIcon"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "RoomIcon.story",
  setup(__props, { expose }) {
    expose();
    const RoomIcon = defineAsyncComponent(() => __vitePreload(() => import("./RoomIcon.es.js"), true ? ["RoomIcon.es.js","useDraw.es.js","vendor.es.js","useBackground.es.js","UiPanel.es.js","times.es.js","plugin-vue_export-helper.es.js","useMd.es.js","useFile.es.js","trash.es.js","check.es.js","pen.es.js","exit-outline.es.js","enter-outline.es.js","AccountBadge.es.js","AccountAvatar.es.js"] : void 0));
    const __returned__ = { RoomIcon, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/room/RoomIcon.story.vue";
var RoomIcon_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomIcon.story.vue"]]);
export { RoomIcon_story as default };
