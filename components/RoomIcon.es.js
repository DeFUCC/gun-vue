import { useRoom, useUser, currentRoom, useColor, rootRoom, recreateRoom } from "./useDraw.es.js";
import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, createVNode$1 as createVNode, pushScopeId$1 as pushScopeId, popScopeId$1 as popScopeId, ref$1 as ref, computed$1 as computed, nextTick$1 as nextTick, reactive$1 as reactive, onMounted$1 as onMounted, watch$1 as watch, toDisplayString$1 as toDisplayString, createBlock$1 as createBlock, createCommentVNode$1 as createCommentVNode, withDirectives$1 as withDirectives, vModelText$1 as vModelText, withKeys$1 as withKeys, Fragment$1 as Fragment, renderList$1 as renderList, normalizeStyle$1 as normalizeStyle, withCtx$1 as withCtx } from "./vendor.es.js";
import { useBackground } from "./useBackground.es.js";
import { __unplugin_components_1 as __unplugin_components_1$2 } from "./UiPanel.es.js";
import { parseMd, useMd } from "./useMd.es.js";
import { uploadText } from "./useFile.es.js";
import { __unplugin_components_0 as __unplugin_components_0$3 } from "./trash.es.js";
import { __unplugin_components_5 as __unplugin_components_5$2 } from "./check.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import { __unplugin_components_6 as __unplugin_components_6$1 } from "./pen.es.js";
import { __unplugin_components_4 as __unplugin_components_4$1 } from "./exit-outline.es.js";
import { __unplugin_components_2 as __unplugin_components_2$1, __unplugin_components_3 as __unplugin_components_3$1 } from "./enter-outline.es.js";
import __unplugin_components_0$5 from "./AccountBadge.es.js";
import { __unplugin_components_0 as __unplugin_components_0$4 } from "./times.es.js";
import "./AccountAvatar.es.js";
const _hoisted_1$d = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$d = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M2.875 6C1.32 6 0 7.254 0 8.813v14.374C0 24.747 1.32 26 2.875 26h26.25C30.68 26 32 24.746 32 23.187V8.813C32 7.255 30.68 6 29.125 6zm0 2h26.25c.516 0 .875.383.875.813v14.374c0 .43-.36.813-.875.813H2.875C2.359 24 2 23.617 2 23.187V8.813c0-.43.36-.812.875-.812zM5 11v10h3v-6.656l3 3.969l3-3.97V21h3V11h-3l-3 4l-3-4zm17 0v5h-3l4.5 5l4.5-5h-3v-5z"
}, null, -1);
const _hoisted_3$d = [
  _hoisted_2$d
];
function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$d, _hoisted_3$d);
}
var __unplugin_components_1$1 = { name: "la-markdown", render: render$d };
const _withScopeId = (n) => (pushScopeId("data-v-83e1cfda"), n = n(), popScopeId(), n);
const _hoisted_1$c = { class: "flex flex-col" };
const _hoisted_2$c = { class: "flex flex-col text-left mb-30" };
const _hoisted_3$c = {
  id: "myMD",
  ref: "md",
  placeholder: "Main text content (with **markdown** support)"
};
const _hoisted_4$3 = { class: "flex flex-wrap bg-dark-100 p-4 fixed z-100 bottom-0 left-1 right-1" };
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Save", -1));
const _hoisted_6$1 = {
  class: "m-1 button cursor-pointer flex items-center",
  for: "import-post"
};
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Load", -1));
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1));
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Reset", -1));
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_check = __unplugin_components_5$2;
  const _component_la_markdown = __unplugin_components_1$1;
  const _component_la_trash = __unplugin_components_0$3;
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
    createBaseVNode("div", _hoisted_2$c, [
      createBaseVNode("textarea", _hoisted_3$c, null, 512)
    ]),
    createBaseVNode("div", _hoisted_4$3, [
      createBaseVNode("button", {
        class: "button m-1",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
      }, [
        createVNode(_component_la_check),
        _hoisted_5$2
      ]),
      createBaseVNode("label", _hoisted_6$1, [
        createVNode(_component_la_markdown),
        _hoisted_7$1
      ]),
      createBaseVNode("input", {
        class: "hidden",
        id: "import-post",
        tabindex: "-1",
        type: "file",
        accept: "text/markdown",
        ref: "file",
        onChange: _cache[1] || (_cache[1] = ($event) => $setup.importPostFile($event))
      }, null, 544),
      _hoisted_8$1,
      createBaseVNode("button", {
        class: "button m-1",
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.text = "")
      }, [
        createVNode(_component_la_trash),
        _hoisted_9$1
      ])
    ])
  ]);
}
var FormText_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  __name: "FormText",
  props: {
    text: { type: String }
  },
  emits: ["update:text", "frontmatter", "close"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    let simplemde;
    const add = ref(false);
    const text = computed({
      get() {
        return props.text;
      },
      set(value) {
        emit("update:text", value);
      }
    });
    nextTick(() => {
    });
    function importPostFile(event) {
      uploadText(event, (file) => {
        let { frontmatter, content } = parseMd(file);
        emit("frontmatter", frontmatter);
        if (content) {
          add.value = true;
          nextTick(() => {
          });
        }
      });
    }
    const __returned__ = { emit, props, simplemde, add, text, importPostFile, reactive, ref, onMounted, watch, computed, nextTick, uploadText, parseMd };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$4.__file = "src/form/FormText.vue";
var __unplugin_components_7$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", render$c], ["__scopeId", "data-v-83e1cfda"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/form/FormText.vue"]]);
const _hoisted_1$b = { class: "flex flex-col" };
const _hoisted_2$b = {
  key: 0,
  class: "flex items-center mr-4 mb-2"
};
const _hoisted_3$b = { class: "break-all" };
const _hoisted_4$2 = {
  key: 1,
  class: "flex items-center",
  action: "javascript:void(0);"
};
const _hoisted_5$1 = { class: "-ml-20 flex" };
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_pen = __unplugin_components_6$1;
  const _component_la_check = __unplugin_components_5$2;
  const _component_la_times = __unplugin_components_0$4;
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    !$setup.edit ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
      createBaseVNode("div", _hoisted_3$b, toDisplayString($props.text), 1),
      $props.editable && !$setup.edit ? (openBlock(), createBlock(_component_la_pen, {
        key: 0,
        class: "ml-2 cursor-pointer",
        onClick: _cache[0] || (_cache[0] = ($event) => {
          $setup.content = $props.text;
          $setup.edit = true;
        })
      })) : createCommentVNode("v-if", true)
    ])) : (openBlock(), createElementBlock("form", _hoisted_4$2, [
      $props.editable && $setup.edit ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        class: "my-2 p-2 shadow-lg rounded-lg w-full",
        type: "text",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.content = $event),
        onKeyup: [
          _cache[2] || (_cache[2] = withKeys(($event) => $setup.edit = false, ["escape"])),
          _cache[3] || (_cache[3] = withKeys(($event) => $setup.update(), ["enter"]))
        ]
      }, null, 544)), [
        [vModelText, $setup.content]
      ]) : createCommentVNode("v-if", true),
      createBaseVNode("div", _hoisted_5$1, [
        createBaseVNode("button", {
          class: "cursor-pointer",
          type: "submit",
          onClick: _cache[4] || (_cache[4] = ($event) => $setup.update())
        }, [
          createVNode(_component_la_check)
        ]),
        $setup.edit ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "ml-2 cursor-pointer",
          onClick: _cache[5] || (_cache[5] = ($event) => $setup.edit = false)
        }, [
          createVNode(_component_la_times)
        ])) : createCommentVNode("v-if", true)
      ])
    ]))
  ]);
}
const _sfc_main$3 = {
  __name: "FormTitle",
  props: {
    text: String,
    editable: Boolean
  },
  emits: ["update"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const content = ref("");
    const edit = ref(false);
    function update() {
      emit("update", content.value);
      edit.value = false;
    }
    const __returned__ = { props, emit, content, edit, update, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$3.__file = "src/form/FormTitle.vue";
var __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", render$b], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/form/FormTitle.vue"]]);
const _hoisted_1$a = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 3c-3.035 0-5.586 1.965-6.625 4.625l1.844.75C11.977 6.434 13.836 5 16 5c2.754 0 5 2.246 5 5v3H6v16h20V13h-3v-3c0-3.844-3.156-7-7-7zM8 15h16v12H8z"
}, null, -1);
const _hoisted_3$a = [
  _hoisted_2$a
];
function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _hoisted_3$a);
}
var __unplugin_components_7 = { name: "la-lock-open", render: render$a };
const _hoisted_1$9 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M13 5c-1.094 0-2 .906-2 2v2H2v18h28V9h-9V7c0-1.094-.906-2-2-2zm0 2h6v2h-6zm-9 4h24v5h-4v-1h-4v1h-8v-1H8v1H4zm0 7h4v1h4v-1h8v1h4v-1h4v7H4z"
}, null, -1);
const _hoisted_3$9 = [
  _hoisted_2$9
];
function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_3$9);
}
var __unplugin_components_6 = { name: "la-toolbox", render: render$9 };
const _hoisted_1$8 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$8 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m233.6 195.6l-8.3-30.9L192.2 41a16 16 0 0 0-19.6-11.3L141.7 38l-1 .3A16 16 0 0 0 128 32H96a15.8 15.8 0 0 0-8 2.2a15.8 15.8 0 0 0-8-2.2H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h32a15.8 15.8 0 0 0 8-2.2a15.8 15.8 0 0 0 8 2.2h32a16 16 0 0 0 16-16v-99.6l19.5 72.8l8.3 30.9a16 16 0 0 0 15.5 11.9a19.9 19.9 0 0 0 4.1-.5l30.9-8.3a15.9 15.9 0 0 0 9.7-7.5a15.6 15.6 0 0 0 1.6-12.1ZM156.2 92.1l30.9-8.3l20.7 77.3l-30.9 8.3Zm20.5-46.9l6.3 23.1l-30.9 8.3l-6.3-23.1ZM128 48v120H96V48Zm-48 0v24H48V48ZM48 208V88h32v120Zm80 0H96v-24h32v24Zm90.2-8.3l-30.9 8.3l-6.3-23.2l31-8.3l6.2 23.2Z"
}, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$8
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$8, _hoisted_3$8);
}
var __unplugin_components_5$1 = { name: "ph-books", render: render$8 };
const _hoisted_1$7 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M121.2 157.9a60 60 0 1 0-66.4 0a95.5 95.5 0 0 0-45.3 34.9a8 8 0 1 0 13 9.2a80.1 80.1 0 0 1 131 0a8 8 0 1 0 13-9.2a95.5 95.5 0 0 0-45.3-34.9ZM44 108a44 44 0 1 1 44 44a44 44 0 0 1-44-44Zm202.1 95.9A7.9 7.9 0 0 1 235 202a80.2 80.2 0 0 0-65.5-34a8 8 0 0 1 0-16a44 44 0 0 0 0-88a47.4 47.4 0 0 0-11.9 1.6a8 8 0 0 1-9.9-5.5a8.1 8.1 0 0 1 5.5-9.9a64 64 0 0 1 16.3-2.2a59.9 59.9 0 0 1 33.2 109.9a96.3 96.3 0 0 1 45.4 34.9a8 8 0 0 1-2 11.1Z"
}, null, -1);
const _hoisted_3$7 = [
  _hoisted_2$7
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$7, _hoisted_3$7);
}
var __unplugin_components_4 = { name: "ph-users", render: render$7 };
const _hoisted_1$6 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M7.188 4.188c-4.297 4.183-4.282 11.125 0 15.406l1.406-1.407c-3.52-3.519-3.504-9.148 0-12.562zm17.625.093L23.405 5.72c3.524 3.523 3.524 9.039 0 12.562l1.407 1.438a10.897 10.897 0 0 0 0-15.438zM9.905 7.188c-2.586 2.585-2.586 6.82 0 9.406l1.406-1.407a4.678 4.678 0 0 1 0-6.593zm12.188.093L20.687 8.72a4.64 4.64 0 0 1 0 6.562l1.407 1.438c2.586-2.586 2.586-6.852 0-9.438zM16 10a2 2 0 0 0-2 2c0 .625.3 1.164.75 1.531L10.312 26H9v2h4v-2h-.594L16 15.969L19.594 26H19v2h4v-2h-1.313L17.25 13.531c.45-.367.75-.906.75-1.531a2 2 0 0 0-2-2z"
}, null, -1);
const _hoisted_3$6 = [
  _hoisted_2$6
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_3$6);
}
var __unplugin_components_3 = { name: "la-broadcast-tower", render: render$6 };
const _hoisted_1$5 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M208 224h-48a16 16 0 0 1-16-16v-48h-32v48a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.5a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8V208a16 16 0 0 1-16 16Zm-96-80h32a16 16 0 0 1 16 16v48h48v-92.5l-80-72.7l-80 72.7V208h48v-48a16 16 0 0 1 16-16Z"
}, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$5
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
}
var __unplugin_components_2 = { name: "ph-house", render: render$5 };
const _hoisted_1$4 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M88 112a8 8 0 0 1 8-8h80a8 8 0 0 1 0 16H96a8 8 0 0 1-8-8Zm8 40h80a8 8 0 0 0 0-16H96a8 8 0 0 0 0 16Zm136-88v120a24.1 24.1 0 0 1-24 24H32a24 24 0 0 1-24-23.9V88a8 8 0 0 1 16 0v96a8 8 0 0 0 16 0V64a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16Zm-16 0H56v120a23.6 23.6 0 0 1-1.4 8H208a8 8 0 0 0 8-8Z"
}, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$4
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$4);
}
var __unplugin_components_1 = { name: "ph-newspaper", render: render$4 };
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M192 68.7a26 26 0 0 0-15.8-12.1a25.6 25.6 0 0 0-19.7 2.6a24.9 24.9 0 0 0-7.7 6.7l-14-24.2a26 26 0 0 0-35.5-9.6a27.1 27.1 0 0 0-8.4 7.7a25.2 25.2 0 0 0-11.1-6.1a25.6 25.6 0 0 0-19.7 2.6A26 26 0 0 0 48 52.1a25 25 0 0 0-.5 11.2a28.3 28.3 0 0 0-7.1 2.8a26.1 26.1 0 0 0-9.5 35.6l2 3.4a24.3 24.3 0 0 0-9.7 3.3a26 26 0 0 0-9.5 35.5l37 64.1A80.1 80.1 0 0 0 160 237.3a79 79 0 0 0 34.9-41.3A79.9 79.9 0 0 0 209 98.1ZM107.3 46a10 10 0 0 1 13.7 3.7l21.3 36.9a27 27 0 0 0-5.5 2.4a26.4 26.4 0 0 0-7.7 6.7l-14-24.2a25.6 25.6 0 0 0-10.4-10l-1.1-1.8a10.1 10.1 0 0 1 3.7-13.7Zm-39.2 4.1a10.1 10.1 0 0 1 13.7 3.7l3.3 5.8a29.6 29.6 0 0 0-5.5 2.4a25 25 0 0 0-8.4 7.7a25.4 25.4 0 0 0-5.7-4l-1-1.9a10 10 0 0 1 3.6-13.7ZM152 223.4A64 64 0 0 1 64.6 200l-37-64.1a10 10 0 0 1 11.2-14.7a10.3 10.3 0 0 1 6.1 4.7l24 41.6a8.2 8.2 0 0 0 6.9 4a8 8 0 0 0 6.9-12l-38-65.8a10 10 0 0 1 17.4-10l38 65.8a8 8 0 1 0 13.8-8l-30-52a10.1 10.1 0 0 1 3.7-13.7a10 10 0 0 1 13.6 3.7l42 72.8a8.2 8.2 0 0 0 7 4a8.6 8.6 0 0 0 4-1.1a8 8 0 0 0 2.9-10.9l-16-27.8a9.9 9.9 0 0 1-1-7.5a9.6 9.6 0 0 1 4.7-6.1a9.4 9.4 0 0 1 7.5-1a9.8 9.8 0 0 1 6.1 4.6l17 29.5a63.9 63.9 0 0 1-23.4 87.4Zm47.6-63a78.9 78.9 0 0 0-10.3-32.4l-17-29.5a26.3 26.3 0 0 0-10.4-10l-1.1-1.8a10.1 10.1 0 0 1-1-7.6a10.3 10.3 0 0 1 4.7-6.1a9.9 9.9 0 0 1 13.6 3.7l17 29.4a64.1 64.1 0 0 1 4.5 54.3ZM165 24.7l4.1-15.5a8 8 0 1 1 15.5 4.1l-4.2 15.5a7.9 7.9 0 0 1-7.7 5.9l-2.1-.2a8 8 0 0 1-5.6-9.8Zm26.3 9.2l9.2-13.1a8.1 8.1 0 0 1 11.2-2a8 8 0 0 1 1.9 11.2l-9.2 13.1a7.9 7.9 0 0 1-11.1 1.9a8 8 0 0 1-2-11.1Zm43.9 21.6l-13.1 9.2a8.6 8.6 0 0 1-4.6 1.4a8 8 0 0 1-4.6-14.5l13.1-9.2a8 8 0 0 1 11.2 1.9a8.1 8.1 0 0 1-2 11.2Z"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
var __unplugin_components_0$1 = { name: "ph-hands-clapping", render: render$3 };
const _hoisted_1$2 = { class: "flex flex-wrap items-center gap-4 p-4" };
const _hoisted_2$2 = ["title", "onClick"];
const _hoisted_3$2 = { class: "text-4xl" };
const _hoisted_4$1 = { class: "px-1 font-bold" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ph_hands_clapping = __unplugin_components_0$1;
  const _component_ph_newspaper = __unplugin_components_1;
  const _component_ph_house = __unplugin_components_2;
  const _component_la_broadcast_tower = __unplugin_components_3;
  const _component_ph_users = __unplugin_components_4;
  const _component_ph_books = __unplugin_components_5$1;
  const _component_la_toolbox = __unplugin_components_6;
  const _component_la_lock_open = __unplugin_components_7;
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    (openBlock(), createElementBlock(Fragment, null, renderList($setup.names, (cert, c) => {
      return createBaseVNode("div", {
        class: "cursor-pointer flex-1 flex flex-col items-center p-4 relative bg-light-700 rounded-lg shadow-sm transition hover_shadow-lg",
        key: c,
        title: cert,
        onClick: ($event) => _ctx.$emit("browse", c)
      }, [
        createBaseVNode("div", _hoisted_3$2, [
          c == "space" ? (openBlock(), createBlock(_component_ph_hands_clapping, { key: 0 })) : createCommentVNode("v-if", true),
          c == "posts" ? (openBlock(), createBlock(_component_ph_newspaper, { key: 1 })) : createCommentVNode("v-if", true),
          c == "rooms" ? (openBlock(), createBlock(_component_ph_house, { key: 2 })) : createCommentVNode("v-if", true),
          c == "topics" ? (openBlock(), createBlock(_component_la_broadcast_tower, { key: 3 })) : createCommentVNode("v-if", true),
          c == "users" ? (openBlock(), createBlock(_component_ph_users, { key: 4 })) : createCommentVNode("v-if", true),
          c == "dict" ? (openBlock(), createBlock(_component_ph_books, { key: 5 })) : createCommentVNode("v-if", true),
          c == "projects" ? (openBlock(), createBlock(_component_la_toolbox, { key: 6 })) : createCommentVNode("v-if", true)
        ]),
        createBaseVNode("div", _hoisted_4$1, toDisplayString($setup.names[c]), 1),
        $props.features[c] || c == "users" && $props.features.space || c == "topics" && $props.features.chat ? (openBlock(), createBlock(_component_la_lock_open, {
          key: 0,
          class: "text-xs absolute top-2 right-2 opacity-30"
        })) : createCommentVNode("v-if", true)
      ], 8, _hoisted_2$2);
    }), 64))
  ]);
}
const _sfc_main$2 = {
  __name: "RoomFeatures",
  props: {
    features: { type: Object, default: {} }
  },
  emits: ["browse"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const names = {
      space: "Space",
      topics: "Topics",
      posts: "Posts",
      users: "Users",
      rooms: "Rooms",
      projects: "Projects",
      dict: "Dictionary"
    };
    const __returned__ = { props, names, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$2.__file = "src/room/RoomFeatures.vue";
var __unplugin_components_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", render$2], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomFeatures.vue"]]);
const _hoisted_1$1 = { class: "flex flex-col items-stretch" };
const _hoisted_2$1 = { class: "w-200 max-w-full flex flex-col items-stretche bg-light-100 bg-opacity-20 p-4 md_p-12 shadow-xl backdrop-blur-md backdrop-filter rounded-t-xl" };
const _hoisted_3$1 = { class: "flex flex-wrap items-center" };
const _hoisted_4 = { class: "flex flex-col" };
const _hoisted_5 = { class: "text-md" };
const _hoisted_6 = { class: "flex items-center flex-wrap" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "font-bold mr-2" }, "Hosts: ", -1);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_9 = { class: "flex flex-wrap items-center gap-2" };
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Renew", -1);
const _hoisted_11 = {
  key: 1,
  class: "flex flex-wrap py-4"
};
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Enter", -1);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "ml-2" }, "Leave", -1);
const _hoisted_14 = { class: "flex flex-col items-center bg-light-300" };
const _hoisted_15 = { class: "max-w-200 relative" };
const _hoisted_16 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_17 = ["innerHTML"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_form_title = __unplugin_components_0$2;
  const _component_account_badge = __unplugin_components_0$5;
  const _component_la_tools = __unplugin_components_2$1;
  const _component_ion_enter_outline = __unplugin_components_3$1;
  const _component_ion_exit_outline = __unplugin_components_4$1;
  const _component_room_features = __unplugin_components_5;
  const _component_la_pen = __unplugin_components_6$1;
  const _component_form_text = __unplugin_components_7$1;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", {
      class: "pt-32 px-2 md_px-8 bg-cover relative flex flex-col items-center",
      style: normalizeStyle({ ...$setup.bg })
    }, [
      createBaseVNode("div", _hoisted_2$1, [
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_form_title, {
              class: "font-bold text-2xl",
              text: $setup.room.profile.name || $setup.roomPub.substring(0, 12),
              editable: $setup.room.hosts[$setup.user.pub] && $setup.roomPub == $setup.currentRoom.pub && !$setup.edit.name,
              onUpdate: _cache[0] || (_cache[0] = ($event) => $setup.updateRoomProfile("name", $event))
            }, null, 8, ["text", "editable"]),
            createBaseVNode("div", _hoisted_5, toDisplayString($setup.room.profile.description), 1),
            createBaseVNode("div", _hoisted_6, [
              _hoisted_7,
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.room.hosts, (enc, host) => {
                return openBlock(), createElementBlock("div", {
                  class: "p-2 flex flex-col items-start gap-2",
                  key: host
                }, [
                  createVNode(_component_account_badge, {
                    pub: host,
                    selectable: true
                  }, null, 8, ["pub"])
                ]);
              }), 128))
            ])
          ]),
          _hoisted_8
        ]),
        createBaseVNode("div", _hoisted_9, [
          ((_a = $setup.room.hosts) == null ? void 0 : _a[$setup.user.pub]) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "button",
            onClick: _cache[1] || (_cache[1] = ($event) => {
              var _a2, _b2;
              return $setup.recreateRoom((_b2 = (_a2 = $setup.room.hosts) == null ? void 0 : _a2[$setup.user.pub]) == null ? void 0 : _b2.enc);
            })
          }, [
            createVNode(_component_la_tools),
            _hoisted_10
          ])) : createCommentVNode("v-if", true),
          $setup.roomPub != $setup.rootRoom.pub ? (openBlock(), createElementBlock("div", _hoisted_11, [
            $setup.currentRoom.pub !== $setup.roomPub ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "button",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.enterRoom($setup.roomPub))
            }, [
              createVNode(_component_ion_enter_outline),
              _hoisted_12
            ])) : (openBlock(), createElementBlock("button", {
              key: 1,
              class: "button",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.leaveRoom())
            }, [
              createVNode(_component_ion_exit_outline),
              _hoisted_13
            ]))
          ])) : createCommentVNode("v-if", true)
        ])
      ])
    ], 4),
    createBaseVNode("div", _hoisted_14, [
      createVNode(_component_room_features, {
        class: "my-4",
        features: $setup.room.features,
        onBrowse: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("browse", $event))
      }, null, 8, ["features"]),
      createBaseVNode("div", _hoisted_15, [
        $setup.edit.text === false ? (openBlock(), createElementBlock("div", _hoisted_16, [
          createBaseVNode("div", {
            class: "p-8 markdown-body",
            innerHTML: $setup.md.render(((_b = $setup.room.profile) == null ? void 0 : _b.text) || "")
          }, null, 8, _hoisted_17),
          ((_c = $setup.room.hosts) == null ? void 0 : _c[$setup.user.pub]) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "button absolute top-4 right-4 z-200",
            onClick: _cache[5] || (_cache[5] = ($event) => {
              var _a2;
              return $setup.edit.text = ((_a2 = $setup.room.profile) == null ? void 0 : _a2.text) || "";
            })
          }, [
            createVNode(_component_la_pen)
          ])) : createCommentVNode("v-if", true)
        ])) : (openBlock(), createBlock(_component_form_text, {
          key: 1,
          text: $setup.edit.text,
          "onUpdate:text": _cache[6] || (_cache[6] = ($event) => $setup.edit.text = $event),
          onClose: _cache[7] || (_cache[7] = ($event) => {
            $setup.updateRoomProfile("text", $setup.edit.text);
            $setup.edit.text = false;
          })
        }, null, 8, ["text"]))
      ])
    ])
  ]);
}
const _sfc_main$1 = {
  __name: "RoomPage",
  props: {
    pub: String
  },
  emits: ["rooms", "browse"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { room, leaveRoom, updateRoomProfile, enterRoom } = useRoom(props.pub);
    const { user } = useUser();
    const roomPub = computed(() => {
      if (props.pub) {
        return props.pub;
      } else {
        return currentRoom.pub;
      }
    });
    const md = useMd();
    const edit = reactive({
      name: false,
      description: false,
      text: false
    });
    const colorDeep = useColor("deep");
    const bg = computed(() => useBackground({ pub: roomPub.value, size: 1200, attachment: "local" }));
    const __returned__ = { props, room, leaveRoom, updateRoomProfile, enterRoom, user, roomPub, md, edit, colorDeep, bg, useRoom, currentRoom, rootRoom, recreateRoom, useColor, useUser, useBackground, useMd, ref, computed, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/room/RoomPage.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomPage.vue"]]);
const _hoisted_1 = { class: "mx-2" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-2xl font-normal" }, "@", -1);
const _hoisted_3 = {
  key: 0,
  class: "ml-1 text-sm"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  const _component_room_page = __unplugin_components_0;
  const _component_ui_panel = __unplugin_components_1$2;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("button", {
      class: "button",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.open = true),
      style: normalizeStyle({ ...$setup.bg })
    }, [
      _hoisted_2,
      ((_c = (_b = (_a = $setup.current) == null ? void 0 : _a.room) == null ? void 0 : _b.profile) == null ? void 0 : _c.name) ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString((_d = $setup.current) == null ? void 0 : _d.room.profile.name.substring(0, 15)), 1)) : createCommentVNode("v-if", true)
    ], 4),
    createVNode(_component_ui_panel, {
      class: "break-all",
      open: $setup.open,
      closeButton: false,
      onClose: _cache[4] || (_cache[4] = ($event) => $setup.open = false)
    }, {
      default: withCtx(() => [
        (openBlock(), createBlock(_component_room_page, {
          onRoom: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("room", $event)),
          key: $setup.currentRoom.pub,
          onRooms: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("rooms"))
        }, {
          default: withCtx(() => [
            createBaseVNode("button", {
              class: "button m-4",
              onClick: _cache[1] || (_cache[1] = ($event) => {
                _ctx.$emit("rooms");
                $setup.open = false;
              })
            }, "Browse rooms")
          ]),
          _: 1
        }))
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const _sfc_main = {
  __name: "RoomIcon",
  emits: ["room", "rooms"],
  setup(__props, { expose }) {
    expose();
    const open = ref(false);
    const current = computed(() => useRoom(currentRoom.pub));
    const colorDeep = useColor("deep");
    const bg = computed(() => useBackground({
      pub: currentRoom.pub,
      size: 200,
      attachment: "local"
    }));
    const __returned__ = { open, current, colorDeep, bg, useRoom, useColor, currentRoom, useBackground, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/room/RoomIcon.vue";
var RoomIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/room/RoomIcon.vue"]]);
export { RoomIcon as default };
