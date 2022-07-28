import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createBaseVNode, defineAsyncComponent, __vitePreload, onMounted, reactive, ref, watch, nextTick, computedAsync } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 flex flex-col gap-4" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Variant = resolveComponent("Variant");
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, { title: "Gift/Form" }, {
    controls: withCtx(() => [
      _hoisted_1
    ]),
    default: withCtx(() => [
      createVNode(_component_Variant, { title: "Round" }, {
        default: withCtx(() => [
          createVNode($setup["GiftForm"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const _sfc_main = {
  __name: "GiftForm.story",
  setup(__props, { expose }) {
    expose();
    const GiftForm = defineAsyncComponent(() => __vitePreload(() => import("./GiftForm.es.js"), true ? ["GiftForm.es.js","useDraw.es.js","vendor.es.js","useGifts.es.js","useGuests.es.js","AccountSelect.es.js","times.es.js","AccountBadge.es.js","AccountAvatar.es.js","plugin-vue_export-helper.es.js","UserIcon.es.js","UiLayer.es.js","AccountHome.es.js","useBackground.es.js","useReactions.es.js","useMates.es.js","PostCard.es.js","useZip.es.js","useFile.es.js","useMd.es.js","PostActionReact.es.js","plus.es.js","youtube.es.js","trash.es.js","angle-up.es.js","ChatPrivateCount.es.js","usePrivate.es.js","MateButton.es.js","UiPanel.es.js","UserHome.es.js","UserRooms.es.js","RoomCard.es.js","enter-outline.es.js","eye.es.js","UserProfile.es.js","check.es.js","pen.es.js","UserPanel.es.js","exit-outline.es.js","lock.es.js","UserAvatar.es.js","UserLogin.es.js","UserCreate.es.js","UserAuth.es.js","QrLoad.es.js","qrcode.es.js","UserCredentials.es.js","QrShow.es.js","UserPass.es.js"] : void 0));
    const __returned__ = { GiftForm, defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, computedAsync };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftForm.story.vue";
var GiftForm_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftForm.story.vue"]]);
export { GiftForm_story as default };
