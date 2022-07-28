import { useUser, useGun, hashText } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createVNode$1 as createVNode, withCtx$1 as withCtx, createBaseVNode$1 as createBaseVNode, createBlock$1 as createBlock, withModifiers$1 as withModifiers, ref$1 as ref } from "./vendor.es.js";
import { __unplugin_components_2, __unplugin_components_0 as __unplugin_components_0$2, __unplugin_components_1 } from "./camera.es.js";
import __unplugin_components_0$1 from "./AccountAvatar.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./useFile.es.js";
import "./UiLayer.es.js";
import "./times.es.js";
import "./check.es.js";
const _hoisted_1 = { class: "flex flex-col relative items-center justify-center" };
const _hoisted_2 = { class: "text-2xl" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_avatar = __unplugin_components_0$1;
  const _component_la_camera = __unplugin_components_0$2;
  const _component_la_trash_alt = __unplugin_components_1;
  const _component_form_picture = __unplugin_components_2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_account_avatar, {
      pub: $setup.user.pub,
      size: $props.size
    }, null, 8, ["pub", "size"]),
    createVNode(_component_form_picture, {
      class: "absolute",
      options: { picSize: $setup.props.pic, preserveRatio: false },
      onUpdate: _cache[1] || (_cache[1] = ($event) => $setup.uploadAvatar($event))
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          !$setup.avatar ? (openBlock(), createBlock(_component_la_camera, { key: 0 })) : (openBlock(), createBlock(_component_la_trash_alt, {
            key: 1,
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.removeAvatar(), ["stop", "prevent"]))
          }))
        ])
      ]),
      _: 1
    }, 8, ["options"])
  ]);
}
const _sfc_main = {
  __name: "UserAvatar",
  props: {
    size: { type: Number, default: 120 },
    pic: { type: Number, default: 200 }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const gun = useGun();
    const avatar = ref(null);
    user.db.get("avatar").on((hash) => {
      if (hash) {
        gun.get("#avatars").get(hash).once((d) => {
          avatar.value = d;
        });
      } else {
        avatar.value = null;
      }
    });
    async function uploadAvatar(file) {
      if (file) {
        const hash = await hashText(file);
        gun.get("#avatars").get(hash).put(file);
        user.db.get("avatar").put(hash);
      } else {
        removeAvatar();
      }
    }
    function removeAvatar() {
      user.db.get("avatar").put(null);
    }
    const __returned__ = { user, gun, props, avatar, uploadAvatar, removeAvatar, useUser, useGun, hashText, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserAvatar.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserAvatar.vue"]]);
export { __unplugin_components_0 as default };
