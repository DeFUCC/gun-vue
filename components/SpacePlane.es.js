import { openBlock, createElementBlock, createBaseVNode, normalizeStyle, computed, ref, gunAvatar, watch, withModifiers, toDisplayString, watchEffect, useDraggable, createVNode, normalizeClass, createCommentVNode, Fragment, renderList, withDirectives, vShow, pushScopeId, popScopeId, createBlock, mergeProps, useDrag, onMounted, onBeforeUnmount, usePinch } from "./vendor.es.js";
import { useColor, useGun, useDraw, useUser, useRoom, selectedUser } from "./useDraw.es.js";
import { useSpace } from "./useSpace.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import "./useMates.es.js";
const _hoisted_1$e = ["opacity"];
const _hoisted_2$e = ["fill", "stroke"];
const _hoisted_3$e = ["xlink:href"];
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("g", {
    class: "guest",
    opacity: $setup.isOffline ? 0.1 : 1
  }, [
    createBaseVNode("circle", {
      class: "transition duration-1000 ease-out",
      style: normalizeStyle({ filter: `url(#shadowButton)` }),
      r: 26,
      fill: $setup.color,
      "stroke-width": "8",
      "stroke-opacity": "0.5",
      stroke: $props.blink ? $setup.color : "transparent"
    }, null, 12, _hoisted_2$e),
    createBaseVNode("image", {
      "xlink:href": $setup.avatar,
      x: "-25",
      y: "-25",
      height: "50",
      width: "50",
      "clip-path": "url(#mask)"
    }, null, 8, _hoisted_3$e)
  ], 8, _hoisted_1$e);
}
const _sfc_main$3 = {
  __name: "SpaceGuest",
  props: {
    pub: { type: String, default: "" },
    pos: { type: Object, default: { x: 0, y: 0 } },
    mouse: { type: Object, default: { x: 0, y: 0 } },
    pulse: { type: Number, default: 0 },
    blink: { type: Boolean, default: false },
    size: { type: Number, default: 100 }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const TIMEOUT = 1e4;
    const age = computed(() => Date.now() - Number(props.pulse));
    const isOffline = computed(() => age > TIMEOUT);
    const colorDeep = useColor();
    const color = computed(() => colorDeep.hex(props.pub));
    const avatar = ref(gunAvatar({ pub: props.pub, size: props.size * 4 }));
    const gun = useGun();
    gun.user(props.pub).get("avatar").on((hash) => {
      if (hash) {
        gun.get("#avatars").get(hash).once((d) => {
          avatar.value = d;
        });
      } else {
        avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 });
      }
    });
    const __returned__ = { props, TIMEOUT, age, isOffline, colorDeep, color, avatar, gun, useColor, gunAvatar, useGun, computed, ref, watch };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$3.__file = "src/space/SpaceGuest.vue";
var __unplugin_components_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", render$e], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/space/SpaceGuest.vue"]]);
const _hoisted_1$d = {
  class: "arrow",
  ref: "handle"
};
const _hoisted_2$d = ["x1", "y1", "x2", "y2", "stroke"];
const _hoisted_3$d = ["d", "stroke"];
const _hoisted_4$4 = ["points", "transform", "fill"];
const _hoisted_5$2 = { class: "handle" };
const _hoisted_6$2 = ["cx", "cy", "stroke", "fill"];
const _hoisted_7$1 = ["transform"];
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("g", _hoisted_1$d, [
    createBaseVNode("line", {
      x1: $props.link.arrow.sx,
      y1: $props.link.arrow.sy,
      x2: $props.link.arrow.c1x,
      y2: $props.link.arrow.c1y,
      stroke: $setup.colorDeep.hex($props.link.user),
      "stroke-width": "1"
    }, null, 8, _hoisted_2$d),
    createBaseVNode("path", {
      d: `M ${$props.link.arrow.sx} ${$props.link.arrow.sy} C ${$props.link.arrow.c1x} ${$props.link.arrow.c1y}, ${$props.link.arrow.c2x} ${$props.link.arrow.c2y}, ${$props.link.arrow.ex} ${$props.link.arrow.ey}`,
      stroke: $setup.colorDeep.hex($props.link.user),
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round"
    }, null, 8, _hoisted_3$d),
    createBaseVNode("polygon", {
      points: `0,${-$props.head} ${$props.head * 2},0, 0,${$props.head}`,
      transform: `translate(${$props.link.arrow.ex}, ${$props.link.arrow.ey}) rotate(${$props.link.arrow.ae})`,
      fill: $setup.colorDeep.hex($props.link.user)
    }, null, 8, _hoisted_4$4),
    createBaseVNode("g", _hoisted_5$2, [
      createBaseVNode("circle", {
        class: "cursor-pointer",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("user", $props.link.mate), ["prevent", "stop"])),
        cx: $props.link.arrow.c1x,
        cy: $props.link.arrow.c1y,
        r: 18,
        "stroke-width": "2",
        stroke: $setup.colorDeep.hex($props.link.user),
        fill: $setup.colorDeep.hex($props.link.mate)
      }, null, 8, _hoisted_6$2),
      createBaseVNode("text", {
        class: "text-2xl pointer-events-none",
        transform: `translate(${$props.link.arrow.c1x}, ${$props.link.arrow.c1y}) rotate(${0})`
      }, toDisplayString($props.link.emoji), 9, _hoisted_7$1)
    ])
  ], 512);
}
var SpaceArrow_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  __name: "SpaceArrow",
  props: {
    link: Object,
    head: { type: Number, default: 6 },
    randomness: { type: Number, default: 0.1 }
  },
  emits: ["user"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const colorDeep = useColor("deep");
    const __returned__ = { emit, props, colorDeep, ref, watchEffect, useColor, useDraggable };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$2.__file = "src/space/SpaceArrow.vue";
var __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", render$d], ["__scopeId", "data-v-5faf9545"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/space/SpaceArrow.vue"]]);
const _hoisted_1$c = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"
}, null, -1);
const _hoisted_3$c = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
}, null, -1);
const _hoisted_4$3 = [
  _hoisted_2$c,
  _hoisted_3$c
];
function render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$c, _hoisted_4$3);
}
var __unplugin_components_11 = { name: "carbon-close-outline", render: render$c };
const _hoisted_1$b = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$b = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M2 16A14 14 0 1 0 16 2A14 14 0 0 0 2 16Zm23.15 7.75L8.25 6.85a12 12 0 0 1 16.9 16.9ZM8.24 25.16a12 12 0 0 1-1.4-16.89l16.89 16.89a12 12 0 0 1-15.49 0Z"
}, null, -1);
const _hoisted_3$b = [
  _hoisted_2$b
];
function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, _hoisted_3$b);
}
var __unplugin_components_10 = { name: "carbon-error", render: render$b };
const _hoisted_1$a = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M28.59 13.31L30 11.9L20 2l-1.31 1.42l1.18 1.18l-11.49 9.72l-1.72-1.71L5.25 14l5.66 5.68L2 28.58L3.41 30l8.91-8.91L18 26.75l1.39-1.42l-1.71-1.71l9.72-11.49ZM16.26 22.2L9.8 15.74L21.29 6L26 10.71Z"
}, null, -1);
const _hoisted_3$a = [
  _hoisted_2$a
];
function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _hoisted_3$a);
}
var __unplugin_components_9 = { name: "carbon-pin", render: render$a };
const _hoisted_1$9 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M28.586 13.314L30 11.9L20 2l-1.314 1.415l1.186 1.186L8.38 14.322l-1.716-1.715L5.25 14l5.657 5.677L2 28.583L3.41 30l8.911-8.909L18 26.748l1.393-1.414l-1.716-1.716l9.724-11.49Z"
}, null, -1);
const _hoisted_3$9 = [
  _hoisted_2$9
];
function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_3$9);
}
var __unplugin_components_8 = { name: "carbon-pin-filled", render: render$9 };
const _hoisted_1$8 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$8 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M12 12h2v12h-2zm6 0h2v12h-2z"
}, null, -1);
const _hoisted_3$8 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"
}, null, -1);
const _hoisted_4$2 = [
  _hoisted_2$8,
  _hoisted_3$8
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$8, _hoisted_4$2);
}
var __unplugin_components_7 = { name: "carbon-delete", render: render$8 };
const _hoisted_1$7 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M12 10h12.185l-3.587-3.586L22 5l6 6l-6 6l-1.402-1.415L24.182 12H12a6 6 0 0 0 0 12h8v2h-8a8 8 0 0 1 0-16Z"
}, null, -1);
const _hoisted_3$7 = [
  _hoisted_2$7
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$7, _hoisted_3$7);
}
var __unplugin_components_6 = { name: "carbon-redo", render: render$7 };
const _hoisted_1$6 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M20 10H7.815l3.587-3.586L10 5l-6 6l6 6l1.402-1.415L7.818 12H20a6 6 0 0 1 0 12h-8v2h8a8 8 0 0 0 0-16Z"
}, null, -1);
const _hoisted_3$6 = [
  _hoisted_2$6
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_3$6);
}
var __unplugin_components_5 = { name: "carbon-undo", render: render$6 };
const _hoisted_1$5 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 26V6h20v20Z"
}, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$5
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
}
var __unplugin_components_4 = { name: "carbon-checkbox", render: render$5 };
const _hoisted_1$4 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
}, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$4
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$4);
}
var __unplugin_components_3 = { name: "carbon-radio-button", render: render$4 };
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6H10z"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
var __unplugin_components_2 = { name: "carbon-arrow-up-right", render: render$3 };
const _hoisted_1$2 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M27.307 6.107L30 3.414L28.586 2l-2.693 2.693L24.8 3.6a1.933 1.933 0 0 0-2.8 0l-18 18V28h6.4l18-18a1.933 1.933 0 0 0 0-2.8ZM9.6 26H6v-3.6L23.4 5L27 8.6ZM9 11.586L16.586 4L18 5.414L10.414 13z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
var __unplugin_components_1 = { name: "carbon-pen", render: render$2 };
const _withScopeId = (n) => (pushScopeId("data-v-2e8c0e38"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "z-400 absolute top-4 left-4 right-4" };
const _hoisted_2$1 = { class: "is-group flex gap-2 px-2 py-1" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("svg", {
  class: "-mt-1",
  width: "1em",
  height: "1em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42z",
    fill: "currentColor"
  })
], -1));
const _hoisted_4$1 = [
  _hoisted_3$1
];
const _hoisted_5$1 = { class: "is-group flex flex-wrap" };
const _hoisted_6$1 = ["onClick"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_carbon_pen = __unplugin_components_1;
  const _component_carbon58pen = __unplugin_components_1;
  const _component_carbon58arrow_up_right = __unplugin_components_2;
  const _component_carbon58radio_button = __unplugin_components_3;
  const _component_carbon58checkbox = __unplugin_components_4;
  const _component_carbon58undo = __unplugin_components_5;
  const _component_carbon58redo = __unplugin_components_6;
  const _component_carbon58delete = __unplugin_components_7;
  const _component_carbon58pin_filled = __unplugin_components_8;
  const _component_carbon58pin = __unplugin_components_9;
  const _component_carbon58error = __unplugin_components_10;
  const _component_carbon58close_outline = __unplugin_components_11;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("button", {
      class: normalizeClass(["text-6xl absolute", { active: $setup.draw.enabled }]),
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.draw.enabled = !$setup.draw.enabled),
      style: normalizeStyle({ opacity: $setup.draw.enabled ? 0.2 : 1 })
    }, [
      createVNode(_component_carbon_pen)
    ], 6),
    $setup.draw.enabled ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["flex flex-wrap text-xl p-2 gap-2 justify-center rounded-md bg-main shadow transition-opacity duration-200 dark_border dark_border-gray-400 dark_border-opacity-10 bg-light-300 dark_bg-dark-300 bg-opacity-30", $setup.draw.enabled ? "" : $setup.draw.pinned ? "opacity-40 hover_opacity-90" : "opacity-0 pointer-events-none"]),
      "storage-key": "slidev-drawing-pos",
      "initial-x": 10,
      "initial-y": 10
    }, [
      createBaseVNode("button", {
        class: "w-6 flex items-center justify-center",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.brush.size = $setup.draw.sizes.next())
      }, [
        createBaseVNode("div", {
          class: "bg-current rounded-full",
          style: normalizeStyle({ width: $setup.brush.size + 4 + "px", height: $setup.brush.size + 4 + "px", backgroundColor: $setup.brush.color })
        }, null, 4)
      ]),
      createBaseVNode("div", _hoisted_2$1, [
        createBaseVNode("button", {
          class: normalizeClass({ active: $setup.draw.mode == "stylus" }),
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.setDrawingMode("stylus"))
        }, [
          createVNode(_component_carbon58pen)
        ], 2),
        createBaseVNode("button", {
          class: normalizeClass({ active: $setup.draw.mode == "line" }),
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.setDrawingMode("line"))
        }, _hoisted_4$1, 2),
        createBaseVNode("button", {
          class: normalizeClass({ active: $setup.draw.mode == "arrow" }),
          onClick: _cache[4] || (_cache[4] = ($event) => $setup.setDrawingMode("arrow"))
        }, [
          createVNode(_component_carbon58arrow_up_right)
        ], 2),
        createBaseVNode("button", {
          class: normalizeClass({ active: $setup.draw.mode == "ellipse" }),
          onClick: _cache[5] || (_cache[5] = ($event) => $setup.setDrawingMode("ellipse"))
        }, [
          createVNode(_component_carbon58radio_button)
        ], 2),
        createBaseVNode("button", {
          class: normalizeClass({ active: $setup.draw.mode == "rectangle" }),
          onClick: _cache[6] || (_cache[6] = ($event) => $setup.setDrawingMode("rectangle"))
        }, [
          createVNode(_component_carbon58checkbox)
        ], 2)
      ]),
      createCommentVNode("  TODO: not sure why it's not working! "),
      createCommentVNode(`<button class="icon-btn" :class="{ shallow: draw.mode != 'eraseLine' }" @click="setDrawingMode('eraseLine')">
  <carbon:erase />
  </button> 
`),
      createBaseVNode("div", _hoisted_5$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.draw.colors, (color) => {
          return openBlock(), createElementBlock("button", {
            key: color,
            class: normalizeClass($setup.brush.color === color ? "active" : "shallow"),
            onClick: ($event) => $setup.setBrushColor(color)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["w-6 h-6 transition-all transform border border-gray-400 border-opacity-50", $setup.brush.color !== color ? "rounded-1/2 scale-85" : "rounded-md"]),
              style: normalizeStyle($setup.draw.enabled ? { background: color } : { borderColor: color })
            }, null, 6)
          ], 10, _hoisted_6$1);
        }), 128))
      ]),
      createBaseVNode("button", {
        class: normalizeClass({ disabled: !$setup.draw.canUndo }),
        onClick: _cache[7] || (_cache[7] = ($event) => $setup.drauu.undo())
      }, [
        createVNode(_component_carbon58undo)
      ], 2),
      createBaseVNode("button", {
        class: normalizeClass({ disabled: !$setup.draw.canRedo }),
        onClick: _cache[8] || (_cache[8] = ($event) => $setup.drauu.redo())
      }, [
        createVNode(_component_carbon58redo)
      ], 2),
      createBaseVNode("button", {
        class: normalizeClass({ disabled: !$setup.draw.canClear }),
        onClick: _cache[9] || (_cache[9] = ($event) => $setup.draw.clear())
      }, [
        createVNode(_component_carbon58delete)
      ], 2),
      createBaseVNode("button", {
        class: normalizeClass({ shallow: !$setup.draw.pinned }),
        onClick: _cache[10] || (_cache[10] = ($event) => $setup.draw.pinned = !$setup.draw.pinned)
      }, [
        withDirectives(createVNode(_component_carbon58pin_filled, { class: "transform -rotate-45" }, null, 512), [
          [vShow, $setup.draw.pinned]
        ]),
        withDirectives(createVNode(_component_carbon58pin, null, null, 512), [
          [vShow, !$setup.draw.pinned]
        ])
      ], 2),
      $setup.draw.enabled ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: normalizeClass({ shallow: !$setup.draw.enabled }),
        onClick: _cache[11] || (_cache[11] = ($event) => $setup.draw.enabled = !$setup.draw.enabled)
      }, [
        withDirectives(createVNode(_component_carbon58error, null, null, 512), [
          [vShow, $setup.draw.pinned]
        ]),
        withDirectives(createVNode(_component_carbon58close_outline, null, null, 512), [
          [vShow, !$setup.draw.pinned]
        ])
      ], 2)) : createCommentVNode("v-if", true)
    ], 2)) : createCommentVNode("v-if", true)
  ]);
}
var SpaceDraw_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  __name: "SpaceDraw",
  setup(__props, { expose }) {
    expose();
    const { brush, drauu, draw } = useDraw();
    function setDrawingMode(mode) {
      draw.mode = mode;
      draw.enabled = true;
    }
    function setBrushColor(color) {
      brush.color = color;
      draw.enabled = true;
    }
    const __returned__ = { brush, drauu, draw, setDrawingMode, setBrushColor, useDraw };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/space/SpaceDraw.vue";
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", render$1], ["__scopeId", "data-v-2e8c0e38"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/space/SpaceDraw.vue"]]);
const _hoisted_1 = { class: "flex flex-col items-center" };
const _hoisted_2 = ["viewBox"];
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("defs", null, [
  /* @__PURE__ */ createBaseVNode("filter", {
    id: "shadowButton",
    x: "-50%",
    height: "200%",
    width: "300%"
  }, [
    /* @__PURE__ */ createBaseVNode("feDropShadow", {
      dx: "0",
      dy: "3",
      stdDeviation: "3",
      "flood-color": "#2225"
    })
  ])
], -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("defs", null, [
  /* @__PURE__ */ createBaseVNode("clipPath", {
    id: "mask",
    clipPathUnits: "objectBoundingBox"
  }, [
    /* @__PURE__ */ createBaseVNode("circle", {
      r: ".5",
      cx: ".5",
      cy: ".5"
    })
  ])
], -1);
const _hoisted_5 = ["transform"];
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = ["x", "y", "width", "height"];
const _hoisted_8 = { class: "link" };
const _hoisted_9 = ["x1", "x2", "y1", "y2", "stroke"];
const _hoisted_10 = ["transform"];
const _hoisted_11 = { class: "mouse" };
const _hoisted_12 = ["fill"];
const _hoisted_13 = { class: "arrows" };
const _hoisted_14 = { class: "guests" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_space_draw = __unplugin_components_0;
  const _component_space_arrow = __unplugin_components_1$1;
  const _component_space_guest = __unplugin_components_2$1;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    !$setup.space.joined && $setup.user.is ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "text-2xl p-8 top-15vh cursor-pointer absolute rounded-3xl shadow-xl border-4",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.join()),
      style: normalizeStyle({ borderColor: $setup.user.color })
    }, "Click here to join the space", 4)) : createCommentVNode("v-if", true),
    createVNode(_component_space_draw, { class: "z-2000" }),
    (openBlock(), createElementBlock("svg", {
      class: "h-full w-full z-200 bg-dark-100 bg-opacity-5 cursor-pointer",
      ref: "plane",
      onDblclick: _cache[2] || (_cache[2] = ($event) => $setup.place({ x: 0, y: 0 })),
      onClick: _cache[3] || (_cache[3] = ($event) => {
        $setup.place({ x: $setup.pos[0], y: $setup.pos[1] });
        !$setup.user.is ? $setup.user.auth = true : null;
      }),
      version: "1.1",
      baseProfile: "full",
      viewBox: `${-$props.pad + $setup.pos[0] - $setup.width / 2} ${-$props.pad + $setup.pos[1] - $setup.height / 2} ${$setup.width + 2 * $props.pad} ${$setup.height + 2 * $props.pad}`,
      xmlns: "http://www.w3.org/2000/svg",
      "font-family": "Commissioner , sans-serif",
      "text-anchor": "middle",
      "dominant-baseline": "middle"
    }, [
      _hoisted_3,
      _hoisted_4,
      createBaseVNode("text", {
        class: "text-xs",
        "text-anchor": "end",
        transform: `translate(${$setup.pos[0] + $setup.width / 2 - 10} ${$setup.pos[1] - $setup.height / 2 + 20})`
      }, toDisplayString($setup.pos), 9, _hoisted_5),
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.guests, (guest) => {
        return openBlock(), createElementBlock("g", {
          class: "opacity-40",
          key: guest,
          innerHTML: guest.draw
        }, null, 8, _hoisted_6);
      }), 128)),
      (openBlock(), createElementBlock("svg", {
        ref: "paper",
        class: normalizeClass({ "pointer-events-none": !$setup.draw.enabled, "touch-none": $setup.draw.enabled })
      }, null, 2)),
      createBaseVNode("rect", {
        ref: "area",
        x: $setup.pos[0] - $setup.width / 2,
        y: $setup.pos[1] - $setup.height / 2,
        rx: "12",
        width: $setup.width,
        height: $setup.height,
        fill: "none",
        stroke: "#3333",
        "stroke-width": "1"
      }, null, 8, _hoisted_7),
      createBaseVNode("g", _hoisted_8, [
        createBaseVNode("line", {
          x1: $setup.pos[0],
          x2: $setup.space.my.mouse.x,
          y1: $setup.pos[1],
          y2: $setup.space.my.mouse.y,
          stroke: $setup.user.color,
          "stroke-dasharray": "6"
        }, null, 8, _hoisted_9)
      ]),
      createBaseVNode("g", {
        class: "pointer",
        transform: `translate(${$setup.pos[0]} ${$setup.pos[1]})`
      }, [
        createBaseVNode("g", _hoisted_11, [
          createBaseVNode("circle", {
            style: { "filter": "url(#shadowButton)" },
            fill: $setup.user.color,
            r: "8"
          }, null, 8, _hoisted_12)
        ])
      ], 8, _hoisted_10),
      createBaseVNode("g", _hoisted_13, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.links, (link, key) => {
          return openBlock(), createBlock(_component_space_arrow, {
            link,
            key,
            onUser: _cache[1] || (_cache[1] = ($event) => $setup.selectedUser.pub = $event)
          }, null, 8, ["link"]);
        }), 128))
      ]),
      createBaseVNode("g", _hoisted_14, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.guests, (guest) => {
          var _a, _b;
          return openBlock(), createBlock(_component_space_guest, mergeProps({
            class: "cursor-pointer transition-all ease-out duration-600",
            key: guest
          }, guest, {
            onClick: ($event) => $setup.selectedUser.pub = guest.pub,
            style: { transform: `translate(${(_a = guest == null ? void 0 : guest.pos) == null ? void 0 : _a.x}px, ${(_b = guest == null ? void 0 : guest.pos) == null ? void 0 : _b.y}px)` }
          }), null, 16, ["onClick", "style"]);
        }), 128))
      ])
    ], 40, _hoisted_2))
  ]);
}
const _sfc_main = {
  __name: "SpacePlane",
  props: {
    pad: { type: Number, default: 50 }
  },
  emits: ["user", "enter", "leave"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { user } = useUser();
    const colorDeep = useColor("deep");
    const { space, plane, position: pos, links, width, height, guests, guestCount, area, join, place } = useSpace({
      TIMEOUT: 1e4
    });
    watch(guestCount, (next, prev) => {
      if (next > prev) {
        emit("enter");
      } else {
        emit("leave");
      }
    });
    useDrag((e) => {
      if (draw.ing)
        return;
      const [x, y] = e.delta;
      pos[0] -= x;
      pos[1] -= y;
    }, {
      domTarget: plane
    });
    const paper = ref();
    const { drauu, draw, loadCanvas } = useDraw();
    onMounted(() => {
      drauu.mount(paper.value, paper.value.parentElement);
      loadCanvas();
    });
    onBeforeUnmount(() => {
      drauu.unmount();
    });
    const __returned__ = { props, emit, user, colorDeep, space, plane, pos, links, width, height, guests, guestCount, area, join, place, paper, drauu, draw, loadCanvas, watch, useSpace, useUser, useColor, useRoom, selectedUser, useDrag, usePinch, useDraw, ref, onMounted, onBeforeUnmount };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/space/SpacePlane.vue";
var SpacePlane = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/space/SpacePlane.vue"]]);
export { SpacePlane as default };
