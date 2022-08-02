import { useUser, useProject, useColor, currentRoom } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, createBlock$1 as createBlock, createVNode$1 as createVNode, createCommentVNode$1 as createCommentVNode, withCtx$1 as withCtx, Fragment$1 as Fragment, renderList$1 as renderList, toDisplayString$1 as toDisplayString, withDirectives$1 as withDirectives, vModelText$1 as vModelText, normalizeStyle$1 as normalizeStyle, createTextVNode$1 as createTextVNode, toRef } from "./vendor.es.js";
import { useProjects } from "./useProjects.es.js";
import { useGuests } from "./useGuests.es.js";
import __unplugin_components_0$2 from "./ProjectCard.es.js";
import { __unplugin_components_2 as __unplugin_components_2$1 } from "./times.es.js";
import __unplugin_components_2 from "./RoomButton.es.js";
import __unplugin_components_0$3 from "./UserAuth.es.js";
import __unplugin_components_0$1 from "./AccountBadge.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import { useNewGift } from "./useGift.es.js";
import "./youtube.es.js";
import "./trash.es.js";
import "./useBackground.es.js";
import "./UiPanel.es.js";
import "./useMd.es.js";
import "./useFile.es.js";
import "./check.es.js";
import "./pen.es.js";
import "./exit-outline.es.js";
import "./tools.es.js";
import "./camera.es.js";
import "./UiLayer.es.js";
import "./AccountAvatar.es.js";
import "./QrLoad.es.js";
import "./qrcode.es.js";
const _hoisted_1 = { class: "flex flex-col max-w-140" };
const _hoisted_2 = {
  class: "grid p-4 gap-2 items-center",
  style: { "grid-template-columns": "1fr 10fr" }
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 text-right" }, "FROM", -1);
const _hoisted_4 = { class: "flex-1" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 text-right" }, "ROOM", -1);
const _hoisted_6 = { class: "p-2 text-right" };
const _hoisted_7 = /* @__PURE__ */ createTextVNode("PROJECT ");
const _hoisted_8 = {
  key: 0,
  class: "w-full"
};
const _hoisted_9 = {
  key: 1,
  class: "flex flex-wrap gap-1"
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "font-bold" };
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 text-right" }, "TO", -1);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_14 = {
  key: 3,
  class: "flex flex-col"
};
const _hoisted_15 = { class: "font-bold" };
const _hoisted_16 = { class: "flex flex-wrap gap-3" };
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 text-right" }, "Quantity", -1);
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("div", { class: "p-2 text-right" }, "Quality", -1);
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("div", { class: "px-2 text-right self-start" }, "Wish ", -1);
const _hoisted_20 = {
  key: 4,
  class: "flex"
};
const _hoisted_21 = { class: "flex flex-col" };
const _hoisted_22 = { class: "overflow-scroll font-mono text-xs m-4 opacity-50 break-all col-span-2" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_account_badge = __unplugin_components_0$1;
  const _component_user_auth = __unplugin_components_0$3;
  const _component_room_button = __unplugin_components_2;
  const _component_la_times = __unplugin_components_2$1;
  const _component_project_card = __unplugin_components_0$2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      createBaseVNode("div", _hoisted_4, [
        $setup.user.pub ? (openBlock(), createBlock(_component_account_badge, {
          key: 0,
          pub: $setup.user.pub
        }, null, 8, ["pub"])) : (openBlock(), createBlock(_component_user_auth, { key: 1 }))
      ]),
      _hoisted_5,
      createVNode(_component_room_button),
      createBaseVNode("div", _hoisted_6, [
        _hoisted_7,
        !$setup.newGift.project ? (openBlock(), createElementBlock("div", _hoisted_8, "SELECT")) : createCommentVNode("v-if", true)
      ]),
      $setup.newGift.project ? (openBlock(), createBlock(_component_project_card, {
        key: 0,
        project: $setup.project,
        path: $setup.newGift.project
      }, {
        default: withCtx(() => [
          createVNode(_component_la_times, {
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.newGift.project = null)
          })
        ]),
        _: 1
      }, 8, ["project", "path"])) : (openBlock(), createElementBlock("div", _hoisted_9, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.projects, (proj, p) => {
          return openBlock(), createElementBlock("div", {
            class: "p-2 rounded-xl cursor-pointer",
            key: p,
            style: normalizeStyle({ backgroundColor: proj.color }),
            onClick: ($event) => $setup.newGift.project = proj.path
          }, [
            createBaseVNode("div", _hoisted_11, toDisplayString(proj.title), 1)
          ], 12, _hoisted_10);
        }), 128))
      ])),
      _hoisted_12,
      $setup.newGift.to ? (openBlock(), createBlock(_component_account_badge, {
        key: 2,
        pub: $setup.newGift.to
      }, {
        default: withCtx(() => [
          _hoisted_13,
          createVNode(_component_la_times, {
            class: "mr-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.newGift.to = "")
          })
        ]),
        _: 1
      }, 8, ["pub"])) : (openBlock(), createElementBlock("div", _hoisted_14, [
        createBaseVNode("div", _hoisted_15, "USER SELECT OF " + toDisplayString($setup.count.total), 1),
        createBaseVNode("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.guests, (guest) => {
            return openBlock(), createBlock(_component_account_badge, {
              key: guest,
              onClick: ($event) => $setup.newGift.to = guest.pub,
              pub: guest.pub
            }, null, 8, ["onClick", "pub"]);
          }), 128))
        ])
      ])),
      _hoisted_17,
      withDirectives(createBaseVNode("input", {
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.newGift.qn = $event),
        placeholder: "Quantity"
      }, null, 512), [
        [vModelText, $setup.newGift.qn]
      ]),
      _hoisted_18,
      withDirectives(createBaseVNode("input", {
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newGift.ql = $event),
        placeholder: "Quality"
      }, null, 512), [
        [vModelText, $setup.newGift.ql]
      ]),
      _hoisted_19,
      withDirectives(createBaseVNode("textarea", {
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.newGift.wish = $event),
        placeholder: "Wish"
      }, null, 512), [
        [vModelText, $setup.newGift.wish]
      ]),
      $setup.valid ? (openBlock(), createElementBlock("div", _hoisted_20, [
        createBaseVNode("div", _hoisted_21, [
          createBaseVNode("button", {
            class: "button",
            onClick: _cache[5] || (_cache[5] = ($event) => {
              $setup.propose();
              _ctx.$emit("sent", $setup.hash);
            })
          }, "Propose")
        ])
      ])) : createCommentVNode("v-if", true)
    ]),
    createBaseVNode("pre", _hoisted_22, toDisplayString($setup.cleanGift), 1),
    createBaseVNode("div", {
      class: "font-mono text-xs col-span-2 text-center rounded-lg m-2 transition",
      style: normalizeStyle({ backgroundColor: $setup.color.hex($setup.hash || "") })
    }, toDisplayString($setup.hash), 5)
  ]);
}
const _sfc_main = {
  __name: "GiftForm",
  props: {
    gift: {
      type: Object,
      default: {}
    }
  },
  emits: ["sent", "update:gift"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const { gift: newGift, cleanGift, propose, proposed, hash, valid } = useNewGift(props.gift);
    const { guests, count } = useGuests();
    const { project } = useProject(toRef(newGift, "project"));
    const { projects } = useProjects();
    const color = useColor();
    const __returned__ = { props, emit, user, newGift, cleanGift, propose, proposed, hash, valid, guests, count, project, projects, color, useGuests, useNewGift, useUser, useProject, useProjects, currentRoom, useColor, toRef };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/gift/GiftForm.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/gift/GiftForm.vue"]]);
export { __unplugin_components_0 as default };
