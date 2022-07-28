import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createBaseVNode, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "User/Credentials",
    icon: "la:suitcase"
  }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["UserCredentials"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "UserCredentials.story",
  setup(__props, { expose }) {
    expose();
    const UserCredentials = defineAsyncComponent(() => __vitePreload(() => import("./UserCredentials.es.js"), true ? ["UserCredentials.es.js","useDraw.es.js","vendor.es.js","useFile.es.js","check.es.js","QrShow.es.js","plugin-vue_export-helper.es.js","qrcode.es.js","lock.es.js","UserPass.es.js","eye.es.js"] : void 0));
    const __returned__ = { UserCredentials, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserCredentials.story.vue";
var UserCredentials_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserCredentials.story.vue"]]);
export { UserCredentials_story as default };
