import { useGun, currentRoom, useColor } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, toDisplayString$1 as toDisplayString, createCommentVNode$1 as createCommentVNode, reactive$1 as reactive, computed$1 as computed, createBaseVNode$1 as createBaseVNode, normalizeStyle$1 as normalizeStyle, createVNode$1 as createVNode, createBlock$1 as createBlock, renderSlot$1 as renderSlot, pushScopeId$1 as pushScopeId, popScopeId$1 as popScopeId, ref$1 as ref, watchEffect$1 as watchEffect } from "./vendor.es.js";
import { usePost } from "./useZip.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1 } from "./PostActionReact.es.js";
import { __unplugin_components_0 as __unplugin_components_0$1, __unplugin_components_1, __unplugin_components_4 } from "./youtube.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$1 = {
  key: 0,
  class: "m-1 flex items-center items-center px-2 py-1 bg-light-700 dark_bg-dark-50 rounded-lg"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.count > 0 ? (openBlock(), createElementBlock("button", _hoisted_1$1, toDisplayString($setup.count), 1)) : createCommentVNode("v-if", true);
}
const _sfc_main$1 = {
  __name: "PostLink",
  props: {
    hash: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const gun = useGun();
    const comments = reactive({});
    gun.user(currentRoom.pub).get("posts").map().once((d, k) => {
      if (k.indexOf(props.hash) == 0 && d) {
        comments[k.substring(45, 87)] = d;
      } else {
        delete comments[k];
      }
    });
    const count = computed(() => Object.keys(comments).length);
    const __returned__ = { props, gun, comments, count, useGun, currentRoom, reactive, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/post/PostLink.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/post/PostLink.vue"]]);
const _withScopeId = (n) => (pushScopeId("data-v-13e9a414"), n = n(), popScopeId(), n);
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
const _hoisted_11 = {
  key: 1,
  class: "flex gap-1 rounded-xl p-1 bg-dark-50 bg-opacity-20 flex-wrap items-center",
  style: { "flex": "1 1 130px" }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const _component_post_link = __unplugin_components_0;
  const _component_la_youtube = __unplugin_components_0$1;
  const _component_mdi_text_long = __unplugin_components_1;
  const _component_ui_link = __unplugin_components_4;
  const _component_post_action_react = __unplugin_components_1$1;
  return openBlock(), createElementBlock("div", {
    class: "card",
    style: normalizeStyle({ backgroundImage: `url(${((_a = $setup.post) == null ? void 0 : _a.cover) || ((_b = $setup.post) == null ? void 0 : _b.raw)})`, backgroundColor: $setup.colorDeep.hex($props.hash) })
  }, [
    createBaseVNode("div", {
      class: "p-0",
      style: normalizeStyle([{ "flex": "12 1 120px" }, { paddingTop: ((_c = $setup.post) == null ? void 0 : _c.cover) || ((_d = $setup.post) == null ? void 0 : _d.raw) ? "18em" : "0" }])
    }, null, 4),
    createBaseVNode("div", _hoisted_1, [
      ((_e = $setup.post) == null ? void 0 : _e.icon) ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("img", {
          class: "w-20 max-h-20 rounded-full m-2",
          src: $setup.post.icon,
          width: "40px"
        }, null, 8, _hoisted_3)
      ])) : createCommentVNode("v-if", true),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            ((_f = $setup.post) == null ? void 0 : _f.title) ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString($setup.post.title), 1)) : createCommentVNode("v-if", true),
            _hoisted_8,
            createVNode(_component_post_link, { hash: $props.hash }, null, 8, ["hash"])
          ]),
          ((_g = $setup.post) == null ? void 0 : _g.statement) ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString($setup.post.statement), 1)) : createCommentVNode("v-if", true)
        ]),
        createBaseVNode("div", _hoisted_10, [
          ((_h = $setup.post) == null ? void 0 : _h.youtube) ? (openBlock(), createBlock(_component_la_youtube, {
            key: 0,
            class: "mx-1"
          })) : createCommentVNode("v-if", true),
          ((_i = $setup.post) == null ? void 0 : _i.text) ? (openBlock(), createBlock(_component_mdi_text_long, {
            key: 1,
            class: "mx-1"
          })) : createCommentVNode("v-if", true),
          ((_j = $setup.post) == null ? void 0 : _j.link) ? (openBlock(), createBlock(_component_ui_link, {
            key: 2,
            url: (_k = $setup.post) == null ? void 0 : _k.link
          }, null, 8, ["url"])) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ]),
      $props.actions ? (openBlock(), createElementBlock("div", _hoisted_11, [
        createVNode(_component_post_action_react, {
          authors: $props.authors,
          onUser: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("user", $event)),
          hash: $props.hash,
          tag: $props.tag,
          back: $props.back
        }, null, 8, ["authors", "hash", "tag", "back"])
      ])) : createCommentVNode("v-if", true)
    ])
  ], 4);
}
var PostCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "PostCard",
  props: {
    hash: { type: String, default: "" },
    authors: Object,
    tag: [String, Boolean],
    back: Boolean,
    actions: { type: Boolean, default: true }
  },
  emits: ["user"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorLight = useColor("light");
    const colorDeep = useColor("deep");
    const { post } = usePost({ hash: props.hash });
    const __returned__ = { colorLight, colorDeep, props, post, useColor, usePost, computed, ref, watchEffect };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/post/PostCard.vue";
var __unplugin_components_9 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-13e9a414"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/post/PostCard.vue"]]);
export { __unplugin_components_9 };
