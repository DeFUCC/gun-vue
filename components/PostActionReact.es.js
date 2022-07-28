import { useColor, useUser } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, withModifiers, createVNode, createCommentVNode, withDirectives, vModelText, toDisplayString, normalizeStyle, computed, ref, withCtx, Fragment, renderList, TransitionGroup, vShow, createBlock } from "./vendor.es.js";
import { useReaction, useReactions, countRating } from "./useReactions.es.js";
import __unplugin_components_0$2 from "./AccountBadge.es.js";
import { __unplugin_components_0 as __unplugin_components_0$1 } from "./times.es.js";
import { __unplugin_components_1 as __unplugin_components_1$1 } from "./plus.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$2 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M5 15v2h22v-2z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$1);
}
var __unplugin_components_2 = { name: "la-minus", render: render$2 };
const _hoisted_1$1 = {
  key: 1,
  class: "flex items-center"
};
const _hoisted_2$1 = { class: "px-2 py-1 text-xl w-36px" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_plus = __unplugin_components_1$1;
  const _component_la_times = __unplugin_components_0$1;
  const _component_la_minus = __unplugin_components_2;
  return $setup.user.pub ? (openBlock(), createElementBlock("button", {
    key: 0,
    class: "rounded-2xl text-lg bg-light-200 flex items-center pl-1 pr-1 mr-1",
    style: normalizeStyle({ backgroundColor: $props.isMy ? $setup.colorDeep.hex($setup.user.pub) : "" })
  }, [
    !$props.isMy ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "flex items-center px-2 py-1 text-xl",
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.emit("react", "\u{1F44D}"), ["stop", "prevent"]))
    }, [
      createVNode(_component_la_plus)
    ])) : createCommentVNode("v-if", true),
    !$props.isMy ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      !$props.isMy ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        class: "py-1 px-2 w-36px rounded-xl mx-1 text-center",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.reaction = $event),
        onInput: _cache[2] || (_cache[2] = ($event) => $event.target.value && $setup.emit("react", $props.reaction)),
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop", "prevent"]))
      }, null, 544)), [
        [vModelText, $props.reaction]
      ]) : createCommentVNode("v-if", true)
    ])) : (openBlock(), createElementBlock("div", {
      key: 2,
      class: "flex items-center",
      onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $setup.emit("react", $props.reaction), ["stop", "prevent"]))
    }, [
      createBaseVNode("div", _hoisted_2$1, toDisplayString($props.reaction), 1),
      createVNode(_component_la_times)
    ])),
    !$props.isMy ? (openBlock(), createElementBlock("button", {
      key: 3,
      class: "rounded-2xl flex items-center pl-1 pr-1 mr-1",
      onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $setup.emit("react", "\u{1F5D1}"), ["stop", "prevent"]))
    }, [
      createVNode(_component_la_minus)
    ])) : createCommentVNode("v-if", true)
  ], 4)) : createCommentVNode("v-if", true);
}
const _sfc_main$1 = {
  __name: "PostReactionButton",
  props: {
    isMy: [Boolean, String],
    reaction: [Boolean, String]
  },
  emits: ["react", "user"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const colorDeep = useColor("deep");
    const { user } = useUser();
    const __returned__ = { props, emit, colorDeep, user, useUser, useColor, computed, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/post/reaction/PostReactionButton.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/post/reaction/PostReactionButton.vue"]]);
const _hoisted_1 = { class: "p-1 flex flex-wrap gap-2 items-center" };
const _hoisted_2 = { class: "p-2 font-bold" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  class: "pl-2 text-xl"
};
const _hoisted_5 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_post_reaction_button = __unplugin_components_0;
  const _component_account_badge = __unplugin_components_0$2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, toDisplayString($setup.rating > 0 ? "+" : "") + toDisplayString($setup.rating), 1),
    createVNode(_component_post_reaction_button, {
      onReact: _cache[0] || (_cache[0] = ($event) => $setup.react($event)),
      isMy: (_a = $props.authors) == null ? void 0 : _a[$setup.user.pub],
      reaction: $setup.reaction
    }, null, 8, ["isMy", "reaction"]),
    createVNode(TransitionGroup, { name: "fade" }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.reactions, (list, emoji) => {
          return openBlock(), createElementBlock("div", {
            class: "p-2px flex items-center rounded-3xl bg-light-500 gap-1",
            onClick: withModifiers(($event) => $setup.react(emoji), ["stop", "prevent"]),
            key: emoji
          }, [
            emoji !== "true" ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(emoji), 1)) : createCommentVNode("v-if", true),
            createBaseVNode("div", {
              class: "font-bold px-1",
              onClick: withModifiers(($event) => $setup.selected = $setup.selected ? null : emoji, ["stop", "prevent"])
            }, toDisplayString(list.length), 9, _hoisted_5),
            createVNode(TransitionGroup, { name: "fade" }, {
              default: withCtx(() => [
                list.length < 4 || $setup.selected == emoji ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(list, (author) => {
                  return withDirectives((openBlock(), createBlock(_component_account_badge, {
                    class: "rounded-full shadow-md min-w-6",
                    onClick: withModifiers(($event) => _ctx.$emit("user", author), ["stop", "prevent"]),
                    key: author,
                    size: 20,
                    selectable: true,
                    pub: author,
                    showName: false
                  }, null, 8, ["onClick", "pub"])), [
                    [vShow, author]
                  ]);
                }), 128)) : createCommentVNode("v-if", true)
              ]),
              _: 2
            }, 1024)
          ], 8, _hoisted_3);
        }), 128))
      ]),
      _: 1
    })
  ]);
}
const _sfc_main = {
  __name: "PostActionReact",
  props: {
    authors: Object,
    hash: String,
    tag: String,
    back: Boolean
  },
  emits: ["react", "user"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorDeep = useColor("deep");
    const { user } = useUser();
    const { reaction, react } = useReaction({ ...props });
    const reactions = computed(() => useReactions(props.authors));
    const rating = computed(() => countRating(props.authors));
    const selected = ref();
    const __returned__ = { props, colorDeep, user, reaction, react, reactions, rating, selected, useReaction, useUser, useColor, useReactions, countRating, computed, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/post/action/PostActionReact.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/post/action/PostActionReact.vue"]]);
export { __unplugin_components_1 };
