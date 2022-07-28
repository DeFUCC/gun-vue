import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, createCommentVNode$1 as createCommentVNode, renderSlot$1 as renderSlot, createVNode$1 as createVNode, normalizeClass$1 as normalizeClass, withCtx$1 as withCtx, computed$1 as computed, ref$1 as ref, watch$1 as watch } from "./vendor.es.js";
import "./useDraw.es.js";
import { usePictureUpload } from "./useFile.es.js";
import { __unplugin_components_3 } from "./UiLayer.es.js";
import { __unplugin_components_5 } from "./check.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M15 4c-.523 0-1.059.184-1.438.563C13.184 4.94 13 5.476 13 6v1H7v2h1v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V9h1V7h-6V6c0-.523-.184-1.059-.563-1.438C20.06 4.184 19.523 4 19 4zm0 2h4v1h-4zm-5 3h14v16c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1zm2 3v11h2V12zm4 0v11h2V12zm4 0v11h2V12z"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
var __unplugin_components_1 = { name: "la-trash-alt", render: render$3 };
const _hoisted_1$2 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M2 5v22h28V5zm2 2h24v13.906l-5.281-5.312l-.719-.719l-4.531 4.531l-5.75-5.812l-.719-.719l-7 7zm20 2a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm-13 6.719L20.188 25H4v-2.281zm11 2l6 6V25h-4.969l-4.156-4.188z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
var __unplugin_components_0$1 = { name: "la-image", render: render$2 };
const _hoisted_1$1 = { class: "flex flex-wrap" };
const _hoisted_2$1 = ["id"];
const _hoisted_3$1 = ["for"];
const _hoisted_4 = { class: "button fixed text-2xl opacity-40 hover_opacity-100 m-4" };
const _hoisted_5 = { class: "button fixed text-2xl opacity-40 hover_opacity-100 mt-4 ml-18" };
const _hoisted_6 = ["src"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_image = __unplugin_components_0$1;
  const _component_la_check = __unplugin_components_5;
  const _component_la_trash_alt = __unplugin_components_1;
  const _component_ui_layer = __unplugin_components_3;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    !$setup.picture ? (openBlock(), createElementBlock("input", {
      key: 0,
      class: "hidden",
      type: "file",
      id: $setup.id,
      onChange: _cache[0] || (_cache[0] = (...args) => $setup.handleChange && $setup.handleChange(...args)),
      accept: "image/*"
    }, null, 40, _hoisted_2$1)) : createCommentVNode("v-if", true),
    createBaseVNode("label", {
      class: normalizeClass(["m-1 button cursor-pointer", { active: $setup.picture }]),
      onClick: _cache[1] || (_cache[1] = ($event) => $setup.add = true),
      for: $setup.id
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createVNode(_component_la_image)
      ], true)
    ], 10, _hoisted_3$1),
    createVNode(_component_ui_layer, {
      class: "max-h-60vh mt-20",
      open: $setup.add,
      onClose: _cache[4] || (_cache[4] = ($event) => $setup.add = false)
    }, {
      default: withCtx(() => [
        createBaseVNode("button", _hoisted_4, [
          createVNode(_component_la_check, {
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.add = false)
          })
        ]),
        createBaseVNode("button", _hoisted_5, [
          createVNode(_component_la_trash_alt, {
            onClick: _cache[3] || (_cache[3] = ($event) => {
              $setup.picture = "";
              $setup.add = false;
            })
          })
        ]),
        createBaseVNode("img", { src: $setup.picture }, null, 8, _hoisted_6)
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
var FormPicture_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  __name: "FormPicture",
  props: {
    field: { type: String, default: "cover" },
    options: {
      type: Object,
      default: {
        picSize: 800,
        preserveRatio: true
      }
    }
  },
  emits: ["update"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const id = computed(() => `${props.field}_upload`);
    const add = ref(false);
    const picture = ref();
    const { state, handleChange } = usePictureUpload(props.options);
    watch(() => state.output, (file) => {
      if (file == null ? void 0 : file.content) {
        add.value = true;
        picture.value = file.content;
      }
    });
    watch(picture, (pic) => {
      emit("update", pic);
    });
    const __returned__ = { props, emit, id, add, picture, state, handleChange, ref, watch, computed, usePictureUpload };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/form/FormPicture.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render$1], ["__scopeId", "data-v-5686c708"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/form/FormPicture.vue"]]);
const _hoisted_1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "m11.5 6l-.313.406L10 8H3v18h26V8h-7l-1.188-1.594L20.5 6zm1 2h7l1.188 1.594L21 10h6v14H5V10h6l.313-.406zM8 11c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1zm8 0c-3.3 0-6 2.7-6 6s2.7 6 6 6s6-2.7 6-6s-2.7-6-6-6zm0 2c2.223 0 4 1.777 4 4s-1.777 4-4 4s-4-1.777-4-4s1.777-4 4-4z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var __unplugin_components_0 = { name: "la-camera", render };
export { __unplugin_components_0, __unplugin_components_1, __unplugin_components_2 };
