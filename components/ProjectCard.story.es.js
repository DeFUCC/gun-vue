import { resolveComponent, openBlock, createBlock, withCtx, createVNode, normalizeProps, guardReactiveProps, createBaseVNode, defineAsyncComponent, __vitePreload, reactive } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-4 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Project/Card",
    icon: "la:toolbox"
  }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["ProjectCard"], normalizeProps(guardReactiveProps($setup.state)), null, 16)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "ProjectCard.story",
  setup(__props, { expose }) {
    expose();
    const ProjectCard = defineAsyncComponent(() => __vitePreload(() => import("./ProjectCard.es.js"), true ? ["ProjectCard.es.js","useDraw.es.js","vendor.es.js","youtube.es.js","plugin-vue_export-helper.es.js","AccountBadge.es.js","AccountAvatar.es.js","trash.es.js"] : void 0));
    const state = reactive({
      hash: "123"
    });
    const __returned__ = { ProjectCard, state, defineAsyncComponent, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/project/ProjectCard.story.vue";
var ProjectCard_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/project/ProjectCard.story.vue"]]);
export { ProjectCard_story as default };
