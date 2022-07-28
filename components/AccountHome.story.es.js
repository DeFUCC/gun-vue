import { resolveComponent, openBlock, createBlock, withCtx, createBaseVNode, createVNode, defineAsyncComponent, __vitePreload, reactive, computed, onMounted, watchOnce } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = { class: "p-2 flex flex-col gap-4" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Account/Home",
    icon: "la:home",
    "setup-app": $setup.mySetup
  }, {
    controls: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode($setup["AccountSelect"], {
          pub: $setup.state.pub,
          "onUpdate:pub": _cache[0] || (_cache[0] = ($event) => $setup.state.pub = $event)
        }, null, 8, ["pub"])
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          (openBlock(), createBlock($setup["AccountHome"], {
            pub: $setup.state.pub,
            key: $setup.state.pub
          }, null, 8, ["pub"]))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var block0 = (Comp) => {
  Comp.doc = "<p>Currently it's important to set the <code>:key=&quot;pub&quot;</code> attribute for the component to correctly update with changing pub key.</p>\n";
};
const _sfc_main = {
  __name: "AccountHome.story",
  setup(__props, { expose }) {
    expose();
    const AccountHome = defineAsyncComponent(() => __vitePreload(() => import("./AccountHome.es.js"), true ? ["AccountHome.es.js","useDraw.es.js","vendor.es.js","useBackground.es.js","useReactions.es.js","useMates.es.js","PostCard.es.js","useZip.es.js","useFile.es.js","useMd.es.js","PostActionReact.es.js","AccountBadge.es.js","AccountAvatar.es.js","plugin-vue_export-helper.es.js","times.es.js","plus.es.js","youtube.es.js","trash.es.js","angle-up.es.js","ChatPrivateCount.es.js","usePrivate.es.js","MateButton.es.js"] : void 0));
    const AccountSelect = defineAsyncComponent(() => __vitePreload(() => import("./AccountSelect.es.js"), true ? ["AccountSelect.es.js","useDraw.es.js","vendor.es.js","useGuests.es.js","times.es.js","AccountBadge.es.js","AccountAvatar.es.js","plugin-vue_export-helper.es.js"] : void 0));
    const state = reactive({
      pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8"
    });
    function mySetup() {
      onMounted(async () => {
        const { useGuests } = await __vitePreload(() => import("./index.es.js"), true ? ["index.es.js","useDraw.es.js","vendor.es.js","useChat.es.js","usePrivate.es.js","useLog.es.js","useFile.es.js","useZip.es.js","useMd.es.js","useGifts.es.js","useReactions.es.js","useMates.es.js","useGuests.es.js","useSpace.es.js","useBackground.es.js","useProjects.es.js"] : void 0);
        const { guests } = useGuests();
        watchOnce(guests, (g) => {
          state.pub = Object.keys(guests)[0];
        });
      });
    }
    const __returned__ = { AccountHome, AccountSelect, state, mySetup, computed, defineAsyncComponent, onMounted, reactive, watchOnce };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
if (typeof block0 === "function")
  block0(_sfc_main);
_sfc_main.__file = "src/account/AccountHome.story.vue";
var AccountHome_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/account/AccountHome.story.vue"]]);
export { AccountHome_story as default };
