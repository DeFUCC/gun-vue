import { useRelay, useRelays } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createVNode, Fragment, renderList, normalizeClass, normalizeStyle, toDisplayString, pushScopeId, popScopeId, onMounted, createCommentVNode, withCtx, withDirectives, vModelText, createTextVNode, ref } from "./vendor.es.js";
import { __unplugin_components_3 } from "./UiLayer.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./times.es.js";
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13h-2c0 6.086-4.914 11-11 11S5 22.086 5 16S9.914 5 16 5c3.875 0 7.262 1.984 9.219 5H20v2h8V4h-2v3.719C23.617 4.844 20.02 3 16 3z"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
var __unplugin_components_0$1 = { name: "la-redo-alt", render: render$3 };
const _withScopeId = (n) => (pushScopeId("data-v-1d385d19"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "flex flex-col" };
const _hoisted_2$2 = { class: "flex items-center" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-lg text-left" }, "Volunteer relay peers:", -1));
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "flex-auto" }, null, -1));
const _hoisted_5$2 = { class: "flex flex-col font-normal items-start" };
const _hoisted_6$1 = ["onClick"];
const _hoisted_7$1 = { class: "flex-1 underline" };
const _hoisted_8$1 = { class: "font-bold" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_redo_alt = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      _hoisted_3$2,
      _hoisted_4$2,
      createBaseVNode("button", {
        class: "button m-1",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.loadRelays())
      }, [
        createVNode(_component_la_redo_alt)
      ])
    ]),
    createBaseVNode("ul", _hoisted_5$2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.relays, (link) => {
        return openBlock(), createElementBlock("li", {
          class: normalizeClass(["flex w-full text-left p-1 hover_bg-light-500 cursor-pointer", { active: link.url == $setup.relay.peer }]),
          key: link.host,
          onClick: ($event) => $setup.setPeer(link.url),
          style: normalizeStyle({ order: link.ping })
        }, [
          createBaseVNode("div", _hoisted_7$1, toDisplayString(link.host), 1),
          createBaseVNode("div", _hoisted_8$1, toDisplayString(link.ping) + " ms", 1)
        ], 14, _hoisted_6$1);
      }), 128))
    ])
  ]);
}
var UtilRelayList_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  __name: "UtilRelayList",
  setup(__props, { expose }) {
    expose();
    const { relay, setPeer, resetPeer } = useRelay();
    const { relays, loadRelays } = useRelays();
    onMounted(() => {
      loadRelays();
    });
    const __returned__ = { relay, setPeer, resetPeer, relays, loadRelays, useRelay, useRelays, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/util/UtilRelayList.vue";
var __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$2], ["__scopeId", "data-v-1d385d19"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/util/UtilRelayList.vue"]]);
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M17 28v-6h-2v6H5v2h22v-2H17z"
}, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "9",
  cy: "16",
  r: "1",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M26 20H6a2.002 2.002 0 0 1-2-2v-4a2.002 2.002 0 0 1 2-2h20a2.002 2.002 0 0 1 2 2v4a2.002 2.002 0 0 1-2 2ZM6 14v4h20v-4Z"
}, null, -1);
const _hoisted_5$1 = [
  _hoisted_2$1,
  _hoisted_3$1,
  _hoisted_4$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_5$1);
}
var __unplugin_components_0 = { name: "carbon-bare-metal-server01", render: render$1 };
const _hoisted_1 = { class: "cursor-pointer relative text-left" };
const _hoisted_2 = {
  key: 0,
  class: "ml-2 font-bold"
};
const _hoisted_3 = { class: "p-4 min-w-60vw max-w-full" };
const _hoisted_4 = { class: "flex flex-col items-start" };
const _hoisted_5 = { class: "p-0 flex items-center flex-wrap w-full" };
const _hoisted_6 = /* @__PURE__ */ createTextVNode(" Host: ");
const _hoisted_7 = {
  key: 0,
  class: "info"
};
const _hoisted_8 = { class: "p-0" };
const _hoisted_9 = { class: "num p-0" };
const _hoisted_10 = { class: "num p-0" };
const _hoisted_11 = { class: "num p-0" };
const _hoisted_12 = { class: "p-0" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_carbon_bare_metal_server_01 = __unplugin_components_0;
  const _component_util_relay_list = __unplugin_components_1$1;
  const _component_ui_layer = __unplugin_components_3;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("button", {
      class: "flex",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.open = true)
    }, [
      createVNode(_component_carbon_bare_metal_server_01, { class: "text-xl -mt-1" }),
      $props.text ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($props.text), 1)) : createCommentVNode("v-if", true),
      createBaseVNode("div", {
        class: "p-1 bottom-0 left-2 rounded-full transition duration-300ms ease-in-out opacity-50 absolute",
        style: normalizeStyle({ backgroundColor: $setup.relay.blink ? "white" : "black" })
      }, null, 4)
    ]),
    createVNode(_component_ui_layer, {
      open: $setup.open,
      onClose: _cache[4] || (_cache[4] = ($event) => $setup.open = false)
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", {
            class: "h-2 w-full mb-2 rounded-full transition-all duration-300 ease-in-out opacity-40",
            style: normalizeStyle({ backgroundColor: $setup.relay.blink ? "white" : "black" })
          }, null, 4),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              _hoisted_6,
              withDirectives(createBaseVNode("input", {
                class: "mx-1 p-2 rounded-lg flex-auto",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.relay.peer = $event)
              }, null, 512), [
                [vModelText, $setup.relay.peer]
              ]),
              createBaseVNode("button", {
                class: "button m-1",
                onClick: _cache[2] || (_cache[2] = ($event) => $setup.setPeer($setup.relay.peer))
              }, "Set"),
              createBaseVNode("button", {
                class: "button m-1",
                onClick: _cache[3] || (_cache[3] = ($event) => $setup.resetPeer())
              }, "Reset")
            ]),
            $setup.relay.status != "offline" ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, "Relay server is " + toDisplayString($setup.relay.status) + " for " + toDisplayString($setup.relay.age), 1),
              createBaseVNode("div", _hoisted_9, "Delay: " + toDisplayString($setup.relay.delay) + " ms", 1),
              createBaseVNode("div", _hoisted_10, "Pulse drift: " + toDisplayString($setup.relay.lag) + " ms", 1),
              createBaseVNode("div", _hoisted_11, "Active wires: " + toDisplayString($setup.relay.activeWires) + " / " + toDisplayString($setup.relay.totalConnections), 1),
              createBaseVNode("div", _hoisted_12, "Data storage is " + toDisplayString($setup.relay.store ? "enabled" : "disabled"), 1)
            ])) : createCommentVNode("v-if", true)
          ]),
          createVNode(_component_util_relay_list)
        ])
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
var UtilRelay_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "UtilRelay",
  props: {
    text: { type: String }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { relay, setPeer, resetPeer } = useRelay();
    const open = ref(false);
    const { relays, loadRelays } = useRelays();
    const __returned__ = { props, relay, setPeer, resetPeer, open, relays, loadRelays, useRelay, useRelays, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/util/UtilRelay.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-03c7a0db"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/util/UtilRelay.vue"]]);
export { __unplugin_components_1 as default };
