import { useUser, useColor, removeProject, currentRoom } from "./useDraw.es.js";
import { openBlock, createElementBlock, withModifiers, createVNode, createCommentVNode, createBaseVNode, normalizeStyle, toDisplayString, createBlock, renderSlot, pushScopeId, popScopeId } from "./vendor.es.js";
import { __unplugin_components_4, __unplugin_components_2, __unplugin_components_3 } from "./youtube.es.js";
import __unplugin_components_0$2 from "./AccountBadge.es.js";
import { __unplugin_components_0 as __unplugin_components_0$1 } from "./trash.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./AccountAvatar.es.js";
const _withScopeId = (n) => (pushScopeId("data-v-db89602c"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  class: "flex flex-wrap items-center max-w-full w-full backdrop-blur-lg rounded-2xl bg-light-100 backdrop-blur-sm backdrop-filter shadow-md",
  style: { "flex": "14 1 620px" }
};
const _hoisted_2 = {
  key: 0,
  class: "p-0",
  style: { "flex": "1 1 40px" }
};
const _hoisted_3 = ["src"];
const _hoisted_4 = {
  class: "flex flex-col p-2 overflow-hidden",
  style: { "flex": "10 1 280px" }
};
const _hoisted_5 = { class: "px-2" };
const _hoisted_6 = { class: "flex items-center" };
const _hoisted_7 = {
  key: 0,
  class: "text-xl font-bold my-2"
};
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1));
const _hoisted_9 = {
  key: 0,
  class: "statement"
};
const _hoisted_10 = { class: "flex items-center flex-wrap items-center mt-2 gap-2" };
const _hoisted_11 = { class: "text-xs" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const _component_la_trash = __unplugin_components_0$1;
  const _component_account_badge = __unplugin_components_0$2;
  const _component_la_youtube = __unplugin_components_2;
  const _component_mdi_text_long = __unplugin_components_3;
  const _component_ui_link = __unplugin_components_4;
  return openBlock(), createElementBlock("div", {
    class: "card",
    style: normalizeStyle({ backgroundImage: `url(${((_a = $props.project) == null ? void 0 : _a.cover) || ((_b = $props.project) == null ? void 0 : _b.raw)})`, backgroundColor: $props.project.color })
  }, [
    $props.path.includes($setup.user.pub) || $setup.currentRoom.hosts[$setup.user.pub] ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "absolute top-2 right-2",
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.removeProject($props.path), ["stop", "prevent"]))
    }, [
      createVNode(_component_la_trash)
    ])) : createCommentVNode("v-if", true),
    createBaseVNode("div", {
      class: "p-0",
      style: normalizeStyle([{ "flex": "12 1 120px" }, { paddingTop: ((_c = $props.project) == null ? void 0 : _c.cover) || ((_d = $props.project) == null ? void 0 : _d.raw) ? "18em" : "0" }])
    }, null, 4),
    createBaseVNode("div", _hoisted_1, [
      ((_e = $props.project) == null ? void 0 : _e.icon) ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("img", {
          class: "w-20 max-h-20 rounded-full m-2",
          src: $props.project.icon,
          width: "40px"
        }, null, 8, _hoisted_3)
      ])) : createCommentVNode("v-if", true),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            ((_f = $props.project) == null ? void 0 : _f.title) ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString($props.project.title), 1)) : createCommentVNode("v-if", true),
            _hoisted_8,
            createVNode(_component_account_badge, {
              pub: $props.path.slice(-87)
            }, null, 8, ["pub"])
          ]),
          ((_g = $props.project) == null ? void 0 : _g.statement) ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString($props.project.statement), 1)) : createCommentVNode("v-if", true)
        ]),
        createBaseVNode("div", _hoisted_10, [
          ((_h = $props.project) == null ? void 0 : _h.youtube) ? (openBlock(), createBlock(_component_la_youtube, {
            key: 0,
            class: "mx-1"
          })) : createCommentVNode("v-if", true),
          ((_i = $props.project) == null ? void 0 : _i.text) ? (openBlock(), createBlock(_component_mdi_text_long, {
            key: 1,
            class: "mx-1"
          })) : createCommentVNode("v-if", true),
          ((_j = $props.project) == null ? void 0 : _j.link) ? (openBlock(), createBlock(_component_ui_link, {
            key: 2,
            url: (_k = $props.project) == null ? void 0 : _k.link
          }, null, 8, ["url"])) : createCommentVNode("v-if", true),
          createBaseVNode("div", _hoisted_11, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ])
      ])
    ])
  ], 4);
}
var ProjectCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "ProjectCard",
  props: {
    path: { type: String, default: "" },
    project: {
      type: Object,
      default: {
        title: "",
        statement: "",
        color: "",
        cover: null,
        icon: null,
        link: "",
        goals: [],
        objects: [],
        events: [],
        text: ""
      }
    }
  },
  emits: ["user"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const colorLight = useColor("light");
    const colorDeep = useColor("deep");
    const __returned__ = { user, colorLight, colorDeep, props, useColor, useUser, removeProject, currentRoom };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/project/ProjectCard.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-db89602c"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/project/ProjectCard.vue"]]);
export { __unplugin_components_0 as default };
