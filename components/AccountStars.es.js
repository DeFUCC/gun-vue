import { openBlock, createElementBlock, Fragment, renderList, createCommentVNode, createBaseVNode, createVNode, withCtx, toDisplayString, TransitionGroup, createBlock, reactive } from "./vendor.es.js";
import { useGun, safeHash } from "./useDraw.es.js";
import { usePost } from "./useZip.es.js";
import { __unplugin_components_9 } from "./PostCard.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./useFile.es.js";
import "./useMd.es.js";
import "./PostActionReact.es.js";
import "./useReactions.es.js";
import "./useMates.es.js";
import "./AccountBadge.es.js";
import "./AccountAvatar.es.js";
import "./times.es.js";
import "./plus.es.js";
import "./youtube.es.js";
const _hoisted_1 = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-lg ml-2 mb-2 font-bold" }, "Stars", -1);
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "flex flex-wrap" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_post_card = __unplugin_components_9;
  return Object.keys($setup.posts).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.posts, (feed, tag) => {
      return openBlock(), createElementBlock("div", {
        class: "p-2",
        key: tag
      }, [
        createVNode(TransitionGroup, { name: "list" }, {
          default: withCtx(() => [
            Object.values(feed).length > 0 ? (openBlock(), createElementBlock("div", {
              class: "text-lg font-bold cursor-pointer",
              key: tag,
              onClick: ($event) => _ctx.$emit("feed", tag)
            }, "# " + toDisplayString(tag), 9, _hoisted_3)) : createCommentVNode("v-if", true)
          ]),
          _: 2
        }, 1024),
        createBaseVNode("div", _hoisted_4, [
          createVNode(TransitionGroup, { name: "list" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(feed, (post, hash) => {
                return openBlock(), createBlock(_component_post_card, {
                  class: "my-2",
                  key: hash,
                  post: post == null ? void 0 : post.data,
                  hash,
                  tag,
                  timestamp: post.timestamp,
                  onClick: ($event) => _ctx.$emit("feed", `${tag}/${$setup.safeHash(hash)}`)
                }, null, 8, ["post", "hash", "tag", "timestamp", "onClick"]);
              }), 128))
            ]),
            _: 2
          }, 1024)
        ])
      ]);
    }), 128))
  ])) : createCommentVNode("v-if", true);
}
const _sfc_main = {
  __name: "AccountStars",
  props: {
    pub: { type: String, default: "" }
  },
  emits: ["feed"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const posts = reactive({});
    const gun = useGun();
    gun.user(props.pub).get("feeds").map().once(function(list, tag) {
      this.map().on((d, k) => {
        var _a;
        if (!d) {
          (_a = posts == null ? void 0 : posts[tag]) == null ? true : delete _a[k];
        } else {
          posts[tag] = posts[tag] || {};
          let { post } = usePost({ tag, hash: k });
          posts[tag][k] = post;
        }
      });
    });
    const __returned__ = { props, emit, posts, gun, reactive, useGun, safeHash, usePost };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/account/AccountStars.vue";
var AccountStars = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/account/AccountStars.vue"]]);
export { AccountStars as default };
