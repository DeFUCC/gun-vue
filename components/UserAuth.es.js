import { parseLink, safeJSONParse, useUser } from "./useDraw.es.js";
import { openBlock, createElementBlock, createBaseVNode, createVNode, withDirectives, vModelText, createCommentVNode, withCtx, Transition, ref, watch, SEA } from "./vendor.es.js";
import { uploadText } from "./useFile.es.js";
import __unplugin_components_4 from "./QrLoad.es.js";
import { __unplugin_components_6, __unplugin_components_8 } from "./qrcode.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1$2 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 4C10.422 4 5.742 7.832 4.406 13H6.47C7.746 8.945 11.53 6 16 6c5.516 0 10 4.484 10 10s-4.484 10-10 10c-4.469 0-8.254-2.945-9.531-7H4.406c1.336 5.168 6.016 9 11.594 9c6.617 0 12-5.383 12-12S22.617 4 16 4zm-.656 7.281l-1.438 1.438L16.187 15H4v2h12.188l-2.282 2.281l1.438 1.438l4-4L20.03 16l-.687-.719z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
var __unplugin_components_3 = { name: "la-sign-in-alt", render: render$2 };
const _hoisted_1$1 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M20 3c-4.945 0-9 4.055-9 9c0 .52.086.977.156 1.438L3.281 21.28L3 21.594V29h7v-3h3v-3h3v-2.969c1.18.578 2.555.969 4 .969c4.945 0 9-4.055 9-9s-4.055-9-9-9zm0 2c3.855 0 7 3.145 7 7s-3.145 7-7 7a7.356 7.356 0 0 1-3.406-.875l-.25-.125H14v3h-3v3H8v3H5v-4.563l7.906-7.937l.375-.344l-.094-.531C13.086 13.023 13 12.488 13 12c0-3.855 3.145-7 7-7zm2 3a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z"
}, null, -1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
var __unplugin_components_0$1 = { name: "la-key", render: render$1 };
const _hoisted_1 = { class: "flex flex-col my-4 flex-1 items-center bg-light-700 rounded-3xl p-4 shadow-lg" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "font-bold text-xl" }, "I already have an account", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-md" }, "Login with a saved key", -1);
const _hoisted_4 = { class: "flex" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "p-1 ml-1 font-bold" }, "Paste", -1);
const _hoisted_6 = {
  class: "button m-2 cursor-pointer flex items-center",
  for: "qr-input"
};
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "p-1 ml-1 font-bold" }, "QR", -1);
const _hoisted_8 = {
  class: "button m-2 cursor-pointer flex items-center",
  for: "json-input"
};
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { class: "p-1 ml-1 font-bold" }, "JSON", -1);
const _hoisted_10 = {
  key: 0,
  class: "flex"
};
const _hoisted_11 = { class: "hidden" };
const _hoisted_12 = { class: "flex flex-wrap" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_key = __unplugin_components_0$1;
  const _component_la_qrcode = __unplugin_components_6;
  const _component_la_file_code = __unplugin_components_8;
  const _component_la_sign_in_alt = __unplugin_components_3;
  const _component_qr_load = __unplugin_components_4;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _hoisted_3,
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("button", {
        class: "button m-2 cursor-pointer flex items-center",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.show("key"))
      }, [
        createVNode(_component_la_key, { class: "text-xl" }),
        _hoisted_5
      ]),
      createBaseVNode("label", _hoisted_6, [
        createVNode(_component_la_qrcode, { class: "text-xl" }),
        _hoisted_7
      ]),
      createBaseVNode("label", _hoisted_8, [
        createVNode(_component_la_file_code, { class: "text-xl" }),
        _hoisted_9
      ])
    ]),
    $setup.passphrase !== null ? (openBlock(), createElementBlock("form", _hoisted_10, [
      withDirectives(createBaseVNode("input", {
        class: "py-1 px-4 m-1 rounded-xl",
        autofocus: "",
        type: "text",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.passphrase = $event),
        placeholder: "Enter the password"
      }, null, 512), [
        [vModelText, $setup.passphrase]
      ]),
      createBaseVNode("button", {
        class: "button text-2xl",
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.decode()),
        type: "submit"
      }, [
        createVNode(_component_la_sign_in_alt)
      ])
    ])) : createCommentVNode("v-if", true),
    createBaseVNode("div", _hoisted_11, [
      createVNode(_component_qr_load, {
        onLoaded: _cache[3] || (_cache[3] = ($event) => $setup.pair = $event)
      }),
      createBaseVNode("input", {
        id: "json-input",
        tabindex: "-1",
        type: "file",
        accept: "application/json",
        ref: "file",
        onChange: _cache[4] || (_cache[4] = ($event) => $setup.uploadText($event, (file) => $setup.pair = file))
      }, null, 544)
    ]),
    createBaseVNode("div", _hoisted_12, [
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          $setup.current == "key" ? withDirectives((openBlock(), createElementBlock("textarea", {
            class: "p-2 text-sm flex-1 w-full",
            rows: "6",
            cols: "40",
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.pair = $event),
            key: "text",
            placeholder: "Paste your key pair here"
          }, null, 512)), [
            [vModelText, $setup.pair]
          ]) : createCommentVNode("v-if", true)
        ]),
        _: 1
      })
    ])
  ]);
}
const _sfc_main = {
  __name: "UserAuth",
  setup(__props, { expose }) {
    expose();
    const current = ref("pass");
    const pair = ref();
    const passphrase = ref(null);
    function show(option) {
      if (current.value != option) {
        current.value = option;
      } else {
        current.value = null;
      }
    }
    watch(pair, (p) => {
      console.log(p);
      if (p && typeof p == "string" && p.substring(0, 3) == "SEA") {
        passphrase.value = "";
      }
      if (typeof p == "string" && p.includes("#/auth/")) {
        p = parseLink(p);
      }
      let obj = safeJSONParse(p);
      if (obj.pub && obj.priv) {
        auth(obj);
        pair.value = "";
      } else {
        console.log("No valid pair");
      }
    });
    const { auth } = useUser();
    async function decode() {
      pair.value = await SEA.decrypt(pair.value, passphrase.value);
    }
    const __returned__ = { current, pair, passphrase, show, auth, decode, useUser, safeJSONParse, uploadText, SEA, parseLink, ref, watch };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserAuth.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserAuth.vue"]]);
export { __unplugin_components_0 as default };
