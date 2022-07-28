import { useColor, useGun } from "./useDraw.es.js";
import { openBlock, createElementBlock, Fragment, renderList, normalizeStyle, createBaseVNode, createBlock, createCommentVNode, toDisplayString, createVNode, withCtx, withDirectives, vShow, Transition, ref, onBeforeUnmount } from "./vendor.es.js";
import __unplugin_components_0 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "overflow-hidden m-4 rounded-xl break-all" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "item" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "font-bold" };
const _hoisted_6 = { class: "content" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_avatar = __unplugin_components_0;
  return openBlock(), createElementBlock("article", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.graph, (g, i) => {
      return openBlock(), createElementBlock("div", {
        class: "p-2px text-sm",
        style: normalizeStyle({ backgroundColor: $setup.colorLight.hex(i) }),
        key: i
      }, [
        createBaseVNode("div", {
          class: "flex cursor-pointer",
          onClick: ($event) => g.show = !g.show
        }, [
          i[0] == "~" ? (openBlock(), createBlock(_component_account_avatar, {
            key: 0,
            pub: i.slice(1, 88),
            size: 20
          }, null, 8, ["pub"])) : createCommentVNode("v-if", true),
          createBaseVNode("div", _hoisted_3, toDisplayString(i[0] == "~" ? i.slice(88) : i), 1)
        ], 8, _hoisted_2),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            g.show ? (openBlock(), createElementBlock("section", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(g, (r, j) => {
                return withDirectives((openBlock(), createElementBlock("div", {
                  class: "p-2",
                  key: j
                }, [
                  createBaseVNode("div", _hoisted_5, toDisplayString(j), 1),
                  createBaseVNode("div", _hoisted_6, toDisplayString(r), 1)
                ])), [
                  [vShow, j != "_" && j != "show"]
                ]);
              }), 128))
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 2
        }, 1024)
      ], 4);
    }), 128))
  ]);
}
const _sfc_main = {
  __name: "UtilGraph",
  setup(__props, { expose }) {
    expose();
    const graph = ref({});
    const colorLight = useColor("light");
    const gun = useGun();
    const timer = setInterval(() => {
      graph.value = { ...gun._.graph };
    }, 1e3);
    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    const __returned__ = { graph, colorLight, gun, timer, useGun, useColor, ref, onBeforeUnmount };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/util/UtilGraph.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/util/UtilGraph.vue"]]);
export { __unplugin_components_2 as default };
