import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createBaseVNode, defineAsyncComponent, __vitePreload } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "User/Panel",
    icon: "la:address-book"
  }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["UserPanel"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "UserPanel.story",
  setup(__props, { expose }) {
    expose();
    const UserPanel = defineAsyncComponent(() => __vitePreload(() => import("./UserPanel.es.js"), true ? ["UserPanel.es.js","vendor.es.js","useDraw.es.js","useBackground.es.js","exit-outline.es.js","lock.es.js","plugin-vue_export-helper.es.js","MateButton.es.js","useMates.es.js","times.es.js","plus.es.js","AccountBadge.es.js","AccountAvatar.es.js","UserAvatar.es.js","useFile.es.js","UiLayer.es.js","check.es.js"] : void 0));
    const __returned__ = { UserPanel, defineAsyncComponent };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserPanel.story.vue";
var UserPanel_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserPanel.story.vue"]]);
export { UserPanel_story as default };
