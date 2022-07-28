import { updateProject, newProject } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, withDirectives, vModelText, createVNode, withCtx, Fragment, renderList, TransitionGroup, toDisplayString, createCommentVNode, createBlock, normalizeStyle } from "./vendor.es.js";
import { useProjects } from "./useProjects.es.js";
import __unplugin_components_0 from "./ProjectCard.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./youtube.es.js";
import "./AccountBadge.es.js";
import "./AccountAvatar.es.js";
import "./trash.es.js";
const _hoisted_1 = { class: "flex flex-col" };
const _hoisted_2 = { class: "p-2 flex flex-col gap-2" };
const _hoisted_3 = { class: "flex flex-wrap gap-2 p-2" };
const _hoisted_4 = { class: "p-2 flex flex-col gap-2" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_project_card = __unplugin_components_0;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      withDirectives(createBaseVNode("input", {
        class: "p-2 rounded-xl shadow",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.newProject.title = $event),
        placeholder: "Start typing a project title"
      }, null, 512), [
        [vModelText, $setup.newProject.title]
      ])
    ]),
    createBaseVNode("div", _hoisted_3, [
      createVNode(TransitionGroup, { name: "list" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.candidates, (proj, path) => {
            return openBlock(), createBlock(_component_project_card, {
              onClick: ($event) => _ctx.$emit("open", proj.item.path),
              key: path,
              project: proj.item,
              path: proj.item.path,
              style: normalizeStyle({ opacity: 1 - proj.score })
            }, null, 8, ["onClick", "project", "path", "style"]);
          }), 128))
        ]),
        _: 1
      })
    ]),
    createBaseVNode("div", _hoisted_4, [
      $setup.newProject.title ? (openBlock(), createElementBlock("button", {
        class: "button",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.updateProject()),
        key: "button"
      }, "Add Project " + toDisplayString($setup.newProject.title), 1)) : createCommentVNode("v-if", true)
    ])
  ]);
}
const _sfc_main = {
  __name: "ProjectList",
  emits: ["open"],
  setup(__props, { expose }) {
    expose();
    const { search, projects, candidates } = useProjects();
    const __returned__ = { search, projects, candidates, useProjects, updateProject, newProject };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/project/ProjectList.vue";
var ProjectList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/project/ProjectList.vue"]]);
export { ProjectList as default };
