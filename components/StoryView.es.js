import { defineStore, defineComponent, useRouter, useRoute, watch, unref, createBlock, withCtx, createElementBlock, createVNode, ref, watchEffect, openBlock, Icon, useStorage, createTextVNode, computed, createBaseVNode, resolveDynamicComponent, useCssVars, createCommentVNode, Fragment, renderList, _sfc_main$1 as _sfc_main$1$1, onMounted, nextTick, toDisplayString, useResizeObserver, normalizeStyle, clone, omit, useTimeoutFn, onClickOutside, resolveDirective, withDirectives, vModelText, withModifiers, isRef, withKeys, normalizeClass, resolveComponent, shallowRef, getHighlighter, unindent, generateSourceCode, HstCopyIcon, renderSlot, toRefs, mergeProps, Dropdown, applyStateToVariant, HstTextarea, HstCheckbox, HstNumber, HstText, Transition, h, pushScopeId, popScopeId, setCDN, reactive, onBeforeUnmount, useEventListener, SANDBOX_READY, EVENT_SEND, STATE_SYNC, PREVIEW_SETTINGS_SYNC, toRaw, onUnmounted, createStaticVNode } from "./vendor.es.js";
import { useStoryStore, base } from "./story.es.js";
import { BaseSplitPane, isMobile, _export_sfc, _sfc_main as _sfc_main$v, useScrollOnActive, BaseListItemLink } from "./MobileOverlay.es.js";
import { BaseEmpty } from "./BaseEmpty.es.js";
import { isDark, histoireConfig } from "./mapping.es.js";
import { useEventsStore } from "./events.es.js";
import { toRawDeep } from "./state.es.js";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function useCurrentVariantRoute(variant) {
  const route = useRoute();
  const isActive = computed(() => route.query.variantId === variant.value.id);
  const targetRoute = computed(() => __spreadProps(__spreadValues({}, route), {
    query: __spreadProps(__spreadValues({}, route.query), {
      variantId: variant.value.id
    })
  }));
  return {
    isActive,
    targetRoute
  };
}
const _hoisted_1$r = { class: "htw-truncate" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  name: "StoryVariantListItem",
  props: {
    variant: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    useCssVars((_ctx) => ({
      "3c4190ff": unref(variant).iconColor
    }));
    const { variant } = toRefs(props);
    const { isActive, targetRoute } = useCurrentVariantRoute(variant);
    const el = ref();
    useScrollOnActive(isActive, el);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        "data-test-id": "story-variant-list-item"
      }, [
        createVNode(BaseListItemLink, {
          to: unref(targetRoute),
          "is-active": unref(isActive),
          class: "htw-px-2 htw-py-2 md:htw-py-1.5 htw-m-1 htw-rounded-sm htw-flex htw-items-center htw-gap-2"
        }, {
          default: withCtx(({ active }) => {
            var _a;
            return [
              createVNode(unref(Icon), {
                icon: (_a = unref(variant).icon) != null ? _a : "carbon:cube",
                class: normalizeClass(["base-list-item-link-icon htw-w-5 htw-h-5 sm:htw-w-4 sm:htw-h-4 htw-flex-none", {
                  "htw-text-gray-500": !active && !unref(variant).iconColor,
                  "bind-icon-color": !active && unref(variant).iconColor
                }])
              }, null, 8, ["icon", "class"]),
              createBaseVNode("span", _hoisted_1$r, toDisplayString(unref(variant).title), 1)
            ];
          }),
          _: 1
        }, 8, ["to", "is-active"])
      ], 512);
    };
  }
});
var StoryVariantListItem = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-2cdc2ac0"]]);
const _hoisted_1$q = { class: "htw-flex-none htw-flex htw-items-center" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  name: "StoryVariantGridItem",
  props: {
    variant: {
      type: Object,
      required: true
    },
    story: {
      type: Object,
      required: true
    }
  },
  emits: {
    resize: (width, height) => true
  },
  setup(__props, { emit }) {
    const props = __props;
    useCssVars((_ctx) => ({
      "7d3aedf8": unref(variant).iconColor
    }));
    const { variant } = toRefs(props);
    const { isActive, targetRoute } = useCurrentVariantRoute(variant);
    Object.assign(props.variant, {
      previewReady: false
    });
    function onReady() {
      Object.assign(props.variant, {
        previewReady: true
      });
    }
    const router = useRouter();
    function selectVariant() {
      router.push(targetRoute.value);
    }
    const el = ref();
    const { autoScroll } = useScrollOnActive(isActive, el);
    useResizeObserver(el, () => {
      if (props.variant.previewReady) {
        emit("resize", el.value.clientWidth, el.value.clientHeight);
        if (isActive.value) {
          autoScroll();
        }
      }
    });
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: "htw-cursor-default htw-flex htw-flex-col htw-gap-y-1"
      }, [
        createBaseVNode("div", _hoisted_1$q, [
          createVNode(_component_RouterLink, {
            to: unref(targetRoute),
            class: normalizeClass(["htw-rounded htw-w-max htw-px-2 htw-py-0.5 htw-min-w-16 htw-cursor-pointer htw-flex htw-items-center htw-gap-1", {
              "hover:htw-bg-gray-200 htw-text-gray-500 dark:hover:htw-bg-gray-800": !unref(isActive),
              "htw-bg-primary-200 hover:htw-bg-primary-300 htw-text-primary-800 dark:htw-bg-primary-700 dark:hover:htw-bg-primary-800 dark:htw-text-primary-200": unref(isActive)
            }])
          }, {
            default: withCtx(() => {
              var _a;
              return [
                createVNode(unref(Icon), {
                  icon: (_a = unref(variant).icon) != null ? _a : "carbon:cube",
                  class: normalizeClass(["base-list-item-link-icon htw-w-4 htw-h-4 htw-opacity-50", {
                    "htw-text-gray-500": !unref(isActive) && !unref(variant).iconColor,
                    "bind-icon-color": !unref(isActive) && unref(variant).iconColor
                  }])
                }, null, 8, ["icon", "class"]),
                createBaseVNode("span", null, toDisplayString(unref(variant).title), 1)
              ];
            }),
            _: 1
          }, 8, ["to", "class"])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["htw-border htw-bg-white dark:htw-bg-gray-700 htw-rounded-lg htw-flex-1 htw-p-4", {
            "htw-border-gray-100 dark:htw-border-gray-800": !unref(isActive),
            "htw-border-primary-200 dark:htw-border-primary-900": unref(isActive)
          }]),
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => selectVariant(), ["stop", "prevent"])),
          onKeyup: _cache[1] || (_cache[1] = ($event) => selectVariant())
        }, [
          createVNode(unref(_sfc_main$1$1), {
            variant: unref(variant),
            story: __props.story,
            onReady
          }, null, 8, ["variant", "story"])
        ], 34)
      ], 512);
    };
  }
});
var StoryVariantGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-265ac8e3"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  name: "StoryVariantGrid",
  setup(__props) {
    const storyStore = useStoryStore();
    const gridTemplateWidth = computed(() => {
      if (storyStore.currentStory.layout.type !== "grid") {
        return;
      }
      const layoutWidth = storyStore.currentStory.layout.width;
      if (!layoutWidth) {
        return "200px";
      }
      if (typeof layoutWidth === "number") {
        return layoutWidth + "px";
      }
      return layoutWidth;
    });
    const margin = 16;
    const gap = 16;
    const itemWidth = ref(16);
    const maxItemHeight = ref(0);
    const maxCount = ref(10);
    const countPerRow = ref(0);
    const visibleRows = ref(0);
    const el = ref(null);
    useResizeObserver(el, () => {
      updateMaxCount();
    });
    function updateMaxCount() {
      if (!maxItemHeight.value)
        return;
      const width = el.value.clientWidth - margin * 2;
      const height = el.value.clientHeight;
      const scrollTop = el.value.scrollTop;
      countPerRow.value = Math.floor((width + gap) / (itemWidth.value + gap));
      visibleRows.value = Math.ceil((height + scrollTop + gap) / (maxItemHeight.value + gap));
      const newMaxCount = countPerRow.value * visibleRows.value;
      if (maxCount.value < newMaxCount) {
        maxCount.value = newMaxCount;
      }
      if (storyStore.currentVariant) {
        const index = storyStore.currentStory.variants.indexOf(storyStore.currentVariant);
        if (index + 1 > maxCount.value) {
          maxCount.value = index + 1;
        }
      }
    }
    function onItemResize(w, h2) {
      itemWidth.value = w;
      if (maxItemHeight.value < h2) {
        maxItemHeight.value = h2;
        updateMaxCount();
      }
    }
    watch(() => storyStore.currentVariant, () => {
      updateMaxCount();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: "htw-h-full htw-overflow-y-auto",
        onScroll: _cache[0] || (_cache[0] = ($event) => updateMaxCount())
      }, [
        createBaseVNode("div", {
          style: normalizeStyle({
            minHeight: `${unref(storyStore).currentStory.variants.length / countPerRow.value * (maxItemHeight.value + gap) - gap}px`
          })
        }, [
          createBaseVNode("div", {
            class: "htw-grid htw-gap-4 htw-m-4",
            style: normalizeStyle({
              gridTemplateColumns: `repeat(auto-fill, ${unref(gridTemplateWidth)})`
            })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(storyStore).currentStory.variants.slice(0, maxCount.value), (variant, index) => {
              return openBlock(), createBlock(StoryVariantGridItem, {
                key: index,
                variant,
                story: unref(storyStore).currentStory,
                onResize: onItemResize
              }, null, 8, ["variant", "story"]);
            }), 128))
          ], 4)
        ], 4)
      ], 544);
    };
  }
});
const _hoisted_1$p = { class: "htw-flex htw-items-center htw-gap-1 htw-text-gray-500 htw-flex-1 htw-truncate htw-min-w-0" };
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  name: "StoryVariantTitle",
  props: {
    variant: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        createVNode(unref(Icon), {
          icon: (_a = __props.variant.icon) != null ? _a : "carbon:cube",
          class: normalizeClass(["base-list-item-link-icon htw-w-4 htw-h-4 htw-opacity-50", [
            __props.variant.iconColor ? "bind-icon-color" : "htw-text-gray-500"
          ]])
        }, null, 8, ["icon", "class"]),
        createBaseVNode("span", null, toDisplayString(__props.variant.title), 1)
      ]);
    };
  }
});
const usePreviewSettingsStore = defineStore("preview-settings", () => {
  const currentSettings = useStorage("_histoire-sandbox-settings-v2", {
    responsiveWidth: 720,
    responsiveHeight: null,
    rotate: false,
    backgroundColor: "transparent",
    checkerboard: false
  });
  return {
    currentSettings
  };
});
const _hoisted_1$o = { class: "htw-text-white htw-w-[16px] htw-h-[16px] htw-relative" };
const _hoisted_2$k = {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  class: "htw-relative htw-z-10"
};
const _hoisted_3$d = ["stroke-dasharray", "stroke-dashoffset"];
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  name: "BaseCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:modelValue": (newValue) => true
  },
  setup(__props, { emit }) {
    const props = __props;
    function toggle() {
      emit("update:modelValue", !props.modelValue);
      animationEnabled.value = true;
    }
    const path = ref();
    const dasharray = ref(0);
    const progress = computed(() => props.modelValue ? 1 : 0);
    const dashoffset = computed(() => (1 - progress.value) * dasharray.value);
    const animationEnabled = ref(false);
    watch(path, (value) => {
      var _a, _b, _c;
      dasharray.value = (_c = (_b = (_a = path.value).getTotalLength) == null ? void 0 : _b.call(_a)) != null ? _c : 21.21;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "checkbox",
        tabindex: "0",
        class: "htw-flex htw-items-center htw-gap-2 htw-select-none htw-px-4 htw-py-3 htw-cursor-pointer hover:htw-bg-primary-100 dark:hover:htw-bg-primary-700",
        onClick: _cache[0] || (_cache[0] = ($event) => toggle()),
        onKeydown: [
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => toggle(), ["prevent"]), ["enter"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => toggle(), ["prevent"]), ["space"]))
        ]
      }, [
        createBaseVNode("div", _hoisted_1$o, [
          createBaseVNode("div", {
            class: normalizeClass(["htw-border group-active:htw-bg-gray-500/20 htw-rounded-sm htw-box-border htw-absolute htw-inset-0 htw-transition-border htw-duration-150 htw-ease-out", [
              __props.modelValue ? "htw-border-primary-500 htw-border-8" : "htw-border-black/25 dark:htw-border-white/25 htw-delay-150"
            ]])
          }, null, 2),
          (openBlock(), createElementBlock("svg", _hoisted_2$k, [
            createBaseVNode("path", {
              ref_key: "path",
              ref: path,
              d: "m 4 12 l 5 5 l 10 -10",
              fill: "none",
              class: normalizeClass(["htw-stroke-white htw-stroke-2 htw-duration-200 htw-ease-in-out", [
                animationEnabled.value ? "htw-transition-all" : "htw-transition-none",
                {
                  "htw-delay-150": __props.modelValue
                }
              ]]),
              "stroke-dasharray": dasharray.value,
              "stroke-dashoffset": unref(dashoffset)
            }, null, 10, _hoisted_3$d)
          ]))
        ]),
        renderSlot(_ctx.$slots, "default")
      ], 32);
    };
  }
});
const _hoisted_1$n = { class: "htw-flex htw-flex-col htw-items-stretch" };
const _hoisted_2$j = /* @__PURE__ */ createTextVNode(" Rotate ");
const _hoisted_3$c = { class: "htw-flex htw-gap-2 htw-px-4 htw-py-3" };
const _hoisted_4$9 = /* @__PURE__ */ createBaseVNode("span", { class: "htw-opacity-50" }, "x", -1);
const _hoisted_5$6 = ["onClick"];
const _hoisted_6$6 = { class: "htw-ml-auto htw-opacity-70 htw-flex htw-gap-1" };
const _hoisted_7$3 = { key: 0 };
const _hoisted_8$2 = { key: 0 };
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { key: 2 };
const _hoisted_11 = { key: 0 };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  name: "StoryVariantResponsiveSize",
  setup(__props) {
    const settings = usePreviewSettingsStore().currentSettings;
    return (_ctx, _cache) => {
      var _a;
      const _component_VDropdown = resolveComponent("VDropdown");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_VDropdown, {
        placement: "bottom-end",
        skidding: 6,
        disabled: !((_a = unref(histoireConfig).responsivePresets) == null ? void 0 : _a.length),
        class: "htw-h-full htw-flex-none"
      }, {
        popper: withCtx(({ hide }) => [
          createBaseVNode("div", _hoisted_1$n, [
            createVNode(_sfc_main$q, {
              modelValue: unref(settings).rotate,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).rotate = $event)
            }, {
              default: withCtx(() => [
                _hoisted_2$j
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createBaseVNode("div", _hoisted_3$c, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(settings).responsiveWidth = $event),
                type: "number",
                class: "htw-bg-transparent htw-border htw-border-gray-200 dark:htw-border-gray-850 htw-rounded htw-w-20 htw-opacity-50 focus:htw-opacity-100 htw-flex-1 htw-min-w-0",
                step: "16",
                placeholder: "Auto"
              }, null, 512), [
                [
                  vModelText,
                  unref(settings).responsiveWidth,
                  void 0,
                  { number: true }
                ],
                [_directive_tooltip, "Responsive width (px)"]
              ]),
              _hoisted_4$9,
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(settings).responsiveHeight = $event),
                type: "number",
                class: "htw-bg-transparent htw-border htw-border-gray-200 dark:htw-border-gray-850 htw-rounded htw-w-20 htw-opacity-50 focus:htw-opacity-100 htw-flex-1 htw-min-w-0",
                step: "16",
                placeholder: "Auto"
              }, null, 512), [
                [
                  vModelText,
                  unref(settings).responsiveHeight,
                  void 0,
                  { number: true }
                ],
                [_directive_tooltip, "Responsive height (px)"]
              ])
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(histoireConfig).responsivePresets, (preset, index) => {
              return openBlock(), createElementBlock("button", {
                key: index,
                class: normalizeClass(["htw-px-4 htw-py-3 htw-cursor-pointer htw-text-left htw-flex htw-gap-4", [
                  unref(settings).responsiveWidth === preset.width && unref(settings).responsiveHeight === preset.height ? "htw-bg-primary-500 hover:htw-bg-primary-600 htw-text-white dark:htw-text-black" : "htw-bg-transparent hover:htw-bg-primary-100 dark:hover:htw-bg-primary-700"
                ]]),
                onClick: ($event) => {
                  unref(settings).responsiveWidth = preset.width;
                  unref(settings).responsiveHeight = preset.height;
                  hide();
                }
              }, [
                createTextVNode(toDisplayString(preset.label) + " ", 1),
                createBaseVNode("span", _hoisted_6$6, [
                  preset.width ? (openBlock(), createElementBlock("span", _hoisted_7$3, [
                    createTextVNode(toDisplayString(preset.width), 1),
                    !preset.height ? (openBlock(), createElementBlock("span", _hoisted_8$2, "px")) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  preset.width && preset.height ? (openBlock(), createElementBlock("span", _hoisted_9, "x")) : createCommentVNode("", true),
                  preset.height ? (openBlock(), createElementBlock("span", _hoisted_10, [
                    createTextVNode(toDisplayString(preset.height), 1),
                    !preset.width ? (openBlock(), createElementBlock("span", _hoisted_11, "px")) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])
              ], 10, _hoisted_5$6);
            }), 128))
          ])
        ]),
        default: withCtx(() => {
          var _a2;
          return [
            withDirectives((openBlock(), createElementBlock("div", {
              class: normalizeClass(["htw-flex htw-items-center htw-gap-1 htw-h-full htw-px-2 htw-group", {
                "htw-cursor-pointer hover:htw-text-primary-500": (_a2 = unref(histoireConfig).responsivePresets) == null ? void 0 : _a2.length
              }])
            }, [
              createVNode(unref(Icon), {
                icon: "carbon:devices",
                class: "htw-w-4 htw-h-4 htw-opacity-50 group-hover:htw-opacity-100"
              }),
              createVNode(unref(Icon), {
                icon: "carbon:caret-down",
                class: "htw-w-4 htw-h-4 htw-opacity-50 group-hover:htw-opacity-100"
              })
            ], 2)), [
              [_directive_tooltip, "Responsive sizes"]
            ])
          ];
        }),
        _: 1
      }, 8, ["disabled"]);
    };
  }
});
const _withScopeId$5 = (n) => (pushScopeId("data-v-bde73868"), n = n(), popScopeId(), n);
const _hoisted_1$m = { class: "htw-cursor-pointer hover:htw-text-primary-500 htw-flex htw-items-center htw-gap-1 htw-h-full htw-px-2 htw-group" };
const _hoisted_2$i = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", { class: "bind-preview-bg htw-w-4 htw-h-4 htw-rounded-full htw-border htw-border-black/50 dark:htw-border-white/50" }, null, -1));
const _hoisted_3$b = { class: "htw-flex htw-flex-col htw-items-stretch" };
const _hoisted_4$8 = /* @__PURE__ */ createTextVNode(" Checkerboard ");
const _hoisted_5$5 = ["onClick"];
const _hoisted_6$5 = { class: "htw-mr-auto" };
const _hoisted_7$2 = { class: "htw-ml-auto htw-opacity-70" };
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  name: "StoryVariantBackground",
  setup(__props) {
    useCssVars((_ctx) => ({
      "b797c7ca": unref(settings).backgroundColor
    }));
    const settings = usePreviewSettingsStore().currentSettings;
    return (_ctx, _cache) => {
      const _component_VDropdown = resolveComponent("VDropdown");
      const _directive_tooltip = resolveDirective("tooltip");
      return unref(histoireConfig).backgroundPresets.length ? (openBlock(), createBlock(_component_VDropdown, {
        key: 0,
        placement: "bottom-end",
        skidding: 6,
        class: "htw-h-full htw-flex-none"
      }, {
        popper: withCtx(({ hide }) => [
          createBaseVNode("div", _hoisted_3$b, [
            createVNode(_sfc_main$q, {
              modelValue: unref(settings).checkerboard,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).checkerboard = $event)
            }, {
              default: withCtx(() => [
                _hoisted_4$8
              ]),
              _: 1
            }, 8, ["modelValue"]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(histoireConfig).backgroundPresets, (option, index) => {
              return openBlock(), createElementBlock("button", {
                key: index,
                class: normalizeClass(["htw-px-4 htw-py-3 htw-cursor-pointer htw-text-left htw-flex htw-gap-4", [
                  unref(settings).backgroundColor === option.color ? "htw-bg-primary-500 hover:htw-bg-primary-600 htw-text-white dark:htw-text-black" : "htw-bg-transparent hover:htw-bg-primary-100 dark:hover:htw-bg-primary-700"
                ]]),
                onClick: ($event) => {
                  unref(settings).backgroundColor = option.color;
                  hide();
                }
              }, [
                createBaseVNode("span", _hoisted_6$5, toDisplayString(option.label), 1),
                option.color !== "$checkerboard" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("span", _hoisted_7$2, toDisplayString(option.color), 1),
                  createBaseVNode("div", {
                    class: "htw-w-4 htw-h-4 htw-rounded-full htw-border htw-border-black/20 dark:htw-border-white/20",
                    style: normalizeStyle({
                      backgroundColor: option.color
                    })
                  }, null, 4)
                ], 64)) : createCommentVNode("", true)
              ], 10, _hoisted_5$5);
            }), 128))
          ])
        ]),
        default: withCtx(() => [
          withDirectives((openBlock(), createElementBlock("div", _hoisted_1$m, [
            _hoisted_2$i,
            createVNode(unref(Icon), {
              icon: "carbon:caret-down",
              class: "htw-w-4 htw-h-4 htw-opacity-50 group-hover:htw-opacity-100"
            })
          ])), [
            [_directive_tooltip, "Background color"]
          ])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});
var StoryVariantBackground = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-bde73868"]]);
function getSandboxUrl(story, variant) {
  const url = new URLSearchParams();
  url.append("storyId", story.id);
  url.append("variantId", variant.id);
  return `${base}__sandbox.html?${url.toString()}`;
}
const _hoisted_1$l = ["href"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  name: "StoryVariantNewTab",
  props: {
    variant: null,
    story: null
  },
  setup(__props) {
    const props = __props;
    const sandboxUrl = computed(() => {
      return getSandboxUrl(props.story, props.variant);
    });
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createElementBlock("a", {
        href: unref(sandboxUrl),
        target: "_blank",
        class: "htw-flex htw-items-center htw-gap-1 htw-h-full htw-px-2 hover:htw-text-primary-500 htw-opacity-50 hover:htw-opacity-100 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100"
      }, [
        createVNode(unref(Icon), {
          icon: "carbon:launch",
          class: "base-list-item-link-icon htw-w-4 htw-h-4"
        })
      ], 8, _hoisted_1$l)), [
        [_directive_tooltip, "Open variant in new tab"]
      ]);
    };
  }
});
const _sfc_main$m = {};
const _hoisted_1$k = { class: "__histoire-hatched-pattern" };
function _sfc_render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$k);
}
var HatchedPattern = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$3], ["__scopeId", "data-v-250960ac"]]);
const _sfc_main$l = {};
const _hoisted_1$j = { fill: "none" };
const _hoisted_2$h = /* @__PURE__ */ createBaseVNode("pattern", {
  id: "checkerboard",
  width: "64",
  height: "64",
  patternUnits: "userSpaceOnUse"
}, [
  /* @__PURE__ */ createBaseVNode("rect", {
    x: "0",
    y: "0",
    width: "32",
    height: "32",
    fill: "currentColor"
  }),
  /* @__PURE__ */ createBaseVNode("rect", {
    x: "32",
    y: "32",
    width: "32",
    height: "32",
    fill: "currentColor"
  })
], -1);
const _hoisted_3$a = /* @__PURE__ */ createBaseVNode("rect", {
  x: "0",
  y: "0",
  width: "100%",
  height: "100%",
  fill: "url(#checkerboard)"
}, null, -1);
const _hoisted_4$7 = [
  _hoisted_2$h,
  _hoisted_3$a
];
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$j, _hoisted_4$7);
}
var CheckerboardPattern = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$2]]);
const _withScopeId$3 = (n) => (pushScopeId("data-v-769a585e"), n = n(), popScopeId(), n);
const _hoisted_1$i = { class: "htw-w-full htw-h-full htw-flex-1 htw-border htw-border-gray-100 dark:htw-border-gray-800 htw-rounded-lg htw-relative htw-overflow-hidden" };
const _hoisted_2$g = {
  key: 0,
  class: "htw-absolute htw-inset-0 htw-w-full htw-h-full htw-bg-gray-200 dark:htw-bg-gray-850 htw-rounded-r-lg htw-border-l-2 htw-border-gray-500/10 dark:htw-border-gray-700/30 htw-overflow-hidden"
};
const _hoisted_3$9 = { class: "htw-p-4 htw-h-full htw-relative" };
const _hoisted_4$6 = { class: "htw-w-full htw-h-full htw-border htw-border-gray-100 dark:htw-border-gray-800 htw-rounded-sm htw-relative" };
const _hoisted_5$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "bind-preview-bg htw-absolute htw-inset-0" }, null, -1));
const _hoisted_6$4 = /* @__PURE__ */ createStaticVNode('<div class="htw-absolute htw-top-1 htw-left-4 htw-h-2 htw-w-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-top-1 htw-right-4 htw-h-2 htw-w-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-bottom-1 htw-left-4 htw-h-2 htw-w-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-bottom-1 htw-right-4 htw-h-2 htw-w-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-left-1 htw-top-4 htw-w-2 htw-h-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-left-1 htw-bottom-4 htw-w-2 htw-h-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-right-1 htw-top-4 htw-w-2 htw-h-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div><div class="htw-absolute htw-right-1 htw-bottom-4 htw-w-2 htw-h-px htw-bg-gray-200 dark:htw-bg-gray-800" data-v-769a585e></div>', 8);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  name: "StoryResponsivePreview",
  props: {
    variant: null
  },
  setup(__props) {
    const props = __props;
    useCssVars((_ctx) => ({
      "700caecc": unref(settings).backgroundColor
    }));
    const settings = usePreviewSettingsStore().currentSettings;
    const resizing = ref(false);
    const onUnmountedCleanupFns = [];
    onUnmounted(() => {
      onUnmountedCleanupFns.forEach((fn) => fn());
    });
    function addWindowListener(event, listener) {
      window.addEventListener(event, listener);
      const removeListener = () => window.removeEventListener(event, listener);
      onUnmountedCleanupFns.push(removeListener);
      return () => {
        removeListener();
        onUnmountedCleanupFns.splice(onUnmountedCleanupFns.indexOf(removeListener), 1);
      };
    }
    function useDragger(el, value, min, max, axis) {
      function onMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        const start = axis === "x" ? event.clientX : event.clientY;
        const startValue = value.value;
        resizing.value = true;
        const removeListeners = [
          addWindowListener("mousemove", onMouseMove),
          addWindowListener("mouseup", onMouseUp)
        ];
        function onMouseMove(event2) {
          const snapTarget = axis === "x" ? previewWrapper.value.clientWidth : previewWrapper.value.clientHeight;
          const delta = (axis === "x" ? event2.clientX : event2.clientY) - start;
          value.value = Math.max(min, Math.min(max, startValue + delta));
          if (Math.abs(value.value - (snapTarget - 67)) < 16) {
            value.value = null;
          }
        }
        function onMouseUp() {
          removeListeners.forEach((fn) => fn());
          resizing.value = false;
        }
      }
      useEventListener(el, "mousedown", onMouseDown);
      function onTouchStart(event) {
        event.preventDefault();
        event.stopPropagation();
        const start = axis === "x" ? event.touches[0].clientX : event.touches[0].clientY;
        const startValue = value.value;
        resizing.value = true;
        const removeListeners = [
          addWindowListener("touchmove", onTouchMove),
          addWindowListener("touchend", onTouchEnd),
          addWindowListener("touchcancel", onTouchEnd)
        ];
        function onTouchMove(event2) {
          const delta = (axis === "x" ? event2.touches[0].clientX : event2.touches[0].clientY) - start;
          value.value = Math.max(min, Math.min(max, startValue + delta));
        }
        function onTouchEnd() {
          removeListeners.forEach((fn) => fn());
          resizing.value = false;
        }
      }
      useEventListener(el, "touchstart", onTouchStart);
    }
    const responsiveWidth = computed({
      get: () => settings[settings.rotate ? "responsiveHeight" : "responsiveWidth"],
      set: (value) => {
        settings[settings.rotate ? "responsiveHeight" : "responsiveWidth"] = value;
      }
    });
    const responsiveHeight = computed({
      get: () => settings[settings.rotate ? "responsiveWidth" : "responsiveHeight"],
      set: (value) => {
        settings[settings.rotate ? "responsiveWidth" : "responsiveHeight"] = value;
      }
    });
    const horizontalDragger = ref();
    const verticalDragger = ref();
    const cornerDragger = ref();
    const previewWrapper = ref();
    useDragger(horizontalDragger, responsiveWidth, 32, 2e4, "x");
    useDragger(verticalDragger, responsiveHeight, 32, 2e4, "y");
    useDragger(cornerDragger, responsiveWidth, 32, 2e4, "x");
    useDragger(cornerDragger, responsiveHeight, 32, 2e4, "y");
    const finalWidth = computed(() => settings.rotate ? settings.responsiveHeight : settings.responsiveWidth);
    const finalHeight = computed(() => settings.rotate ? settings.responsiveWidth : settings.responsiveHeight);
    const isResponsiveEnabled = computed(() => !props.variant.responsiveDisabled);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        unref(isResponsiveEnabled) ? (openBlock(), createElementBlock("div", _hoisted_2$g, [
          createVNode(HatchedPattern, { class: "htw-w-full htw-h-full htw-text-black/[2%] dark:htw-text-white/[2%]" })
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "previewWrapper",
          ref: previewWrapper,
          class: "htw-h-full htw-overflow-auto htw-relative"
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["htw-h-full htw-p-4 htw-overflow-hidden htw-bg-white dark:htw-bg-gray-700 htw-rounded-lg htw-relative", unref(isResponsiveEnabled) ? {
              "htw-w-fit": !!unref(finalWidth),
              "htw-h-fit": !!unref(finalHeight)
            } : void 0])
          }, [
            createBaseVNode("div", _hoisted_3$9, [
              createBaseVNode("div", _hoisted_4$6, [
                _hoisted_5$4,
                unref(settings).checkerboard ? (openBlock(), createBlock(CheckerboardPattern, {
                  key: 0,
                  class: "htw-absolute htw-inset-0 htw-w-full htw-h-full htw-text-gray-500/20"
                })) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", {
                  isResponsiveEnabled: unref(isResponsiveEnabled),
                  finalWidth: unref(finalWidth),
                  finalHeight: unref(finalHeight),
                  resizing: resizing.value
                }, void 0, true)
              ]),
              _hoisted_6$4
            ]),
            unref(isResponsiveEnabled) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("div", {
                ref_key: "horizontalDragger",
                ref: horizontalDragger,
                class: "htw-absolute htw-w-4 htw-top-0 htw-bottom-4 htw-right-0 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-items-center htw-justify-center htw-cursor-ew-resize htw-group hover:htw-text-primary-500"
              }, [
                createVNode(unref(Icon), {
                  icon: "mdi:drag-vertical-variant",
                  class: "htw-w-4 htw-h-4 htw-opacity-20 group-hover:htw-opacity-90"
                })
              ], 512),
              createBaseVNode("div", {
                ref_key: "verticalDragger",
                ref: verticalDragger,
                class: "htw-absolute htw-h-4 htw-left-0 htw-right-4 htw-bottom-0 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-items-center htw-justify-center htw-cursor-ns-resize htw-group hover:htw-text-primary-500"
              }, [
                createVNode(unref(Icon), {
                  icon: "mdi:drag-horizontal-variant",
                  class: "htw-w-4 htw-h-4 htw-opacity-20 group-hover:htw-opacity-90"
                })
              ], 512),
              createBaseVNode("div", {
                ref_key: "cornerDragger",
                ref: cornerDragger,
                class: "htw-absolute htw-w-4 htw-h-4 htw-right-0 htw-bottom-0 hover:htw-bg-primary-100 dark:hover:htw-bg-primary-800 htw-flex htw-items-center htw-justify-center htw-cursor-nwse-resize htw-group hover:htw-text-primary-500"
              }, null, 512)
            ], 64)) : createCommentVNode("", true)
          ], 2)
        ], 512)
      ]);
    };
  }
});
var StoryResponsivePreview = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-769a585e"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  name: "StoryVariantSinglePreviewNative",
  props: {
    story: null,
    variant: null
  },
  setup(__props) {
    const props = __props;
    Object.assign(props.variant, {
      previewReady: false
    });
    function onReady() {
      Object.assign(props.variant, {
        previewReady: true
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(StoryResponsivePreview, { variant: __props.variant }, {
        default: withCtx(({ isResponsiveEnabled, finalWidth, finalHeight }) => [
          createBaseVNode("div", {
            style: normalizeStyle(isResponsiveEnabled ? {
              width: finalWidth ? `${finalWidth}px` : "100%",
              height: finalHeight ? `${finalHeight}px` : "100%"
            } : { width: "100%", height: "100%" })
          }, [
            (openBlock(), createBlock(unref(_sfc_main$1$1), {
              key: `${__props.story.id}-${__props.variant.id}`,
              variant: __props.variant,
              story: __props.story,
              class: "htw-h-full",
              onReady
            }, null, 8, ["variant", "story"]))
          ], 4)
        ]),
        _: 1
      }, 8, ["variant"]);
    };
  }
});
const _hoisted_1$h = ["src"];
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  name: "StoryVariantSinglePreviewRemote",
  props: {
    story: null,
    variant: null
  },
  setup(__props) {
    const props = __props;
    const settings = usePreviewSettingsStore().currentSettings;
    const iframe = ref();
    function syncState() {
      if (iframe.value && props.variant.previewReady) {
        iframe.value.contentWindow.postMessage({
          type: STATE_SYNC,
          state: toRawDeep(props.variant.state)
        });
      }
    }
    let synced = false;
    watch(() => props.variant.state, () => {
      if (synced) {
        synced = false;
        return;
      }
      syncState();
    }, {
      deep: true,
      immediate: true
    });
    Object.assign(props.variant, {
      previewReady: false
    });
    useEventListener(window, "message", (event) => {
      switch (event.data.type) {
        case STATE_SYNC:
          updateVariantState(event.data.state);
          break;
        case EVENT_SEND:
          logEvent(event.data.event);
          break;
        case SANDBOX_READY:
          setPreviewReady();
          break;
      }
    });
    function updateVariantState(state) {
      synced = true;
      applyStateToVariant(props.variant, state);
    }
    function logEvent(event) {
      const eventsStore = useEventsStore();
      eventsStore.addEvent(event);
    }
    function setPreviewReady() {
      Object.assign(props.variant, {
        previewReady: true
      });
    }
    const sandboxUrl = computed(() => {
      return getSandboxUrl(props.story, props.variant);
    });
    const isIframeLoaded = ref(false);
    watch(sandboxUrl, () => {
      isIframeLoaded.value = false;
    });
    function syncSettings() {
      if (iframe.value) {
        iframe.value.contentWindow.postMessage({
          type: PREVIEW_SETTINGS_SYNC,
          settings: toRaw(settings)
        });
      }
    }
    watch(() => settings, () => {
      syncSettings();
    }, {
      deep: true,
      immediate: true
    });
    function onIframeLoad() {
      isIframeLoaded.value = true;
      syncState();
      syncSettings();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(StoryResponsivePreview, { variant: __props.variant }, {
        default: withCtx(({ isResponsiveEnabled, finalWidth, finalHeight, resizing }) => [
          createBaseVNode("iframe", {
            ref_key: "iframe",
            ref: iframe,
            src: unref(sandboxUrl),
            class: normalizeClass(["htw-w-full htw-h-full htw-relative", {
              "htw-invisible": !isIframeLoaded.value,
              "htw-pointer-events-none": resizing
            }]),
            style: normalizeStyle(isResponsiveEnabled ? {
              width: finalWidth ? `${finalWidth}px` : null,
              height: finalHeight ? `${finalHeight}px` : null
            } : void 0),
            "data-test-id": "preview-iframe",
            onLoad: _cache[0] || (_cache[0] = ($event) => onIframeLoad())
          }, null, 46, _hoisted_1$h)
        ]),
        _: 1
      }, 8, ["variant"]);
    };
  }
});
const _hoisted_1$g = {
  class: "htw-h-full htw-flex htw-flex-col",
  "data-test-id": "story-variant-single-view"
};
const _hoisted_2$f = {
  key: 0,
  class: "htw-flex-none htw-flex htw-items-center htw-h-8 -htw-mt-1"
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  name: "StoryVariantSingleView",
  props: {
    variant: null,
    story: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        !unref(isMobile) ? (openBlock(), createElementBlock("div", _hoisted_2$f, [
          createVNode(_sfc_main$r, { variant: __props.variant }, null, 8, ["variant"]),
          !__props.variant.responsiveDisabled ? (openBlock(), createBlock(_sfc_main$p, { key: 0 })) : createCommentVNode("", true),
          createVNode(StoryVariantBackground),
          createVNode(_sfc_main$n, {
            variant: __props.variant,
            story: __props.story
          }, null, 8, ["variant", "story"])
        ])) : createCommentVNode("", true),
        ((_a = __props.story.layout) == null ? void 0 : _a.iframe) === false ? (openBlock(), createBlock(_sfc_main$j, {
          key: 1,
          story: __props.story,
          variant: __props.variant
        }, null, 8, ["story", "variant"])) : (openBlock(), createBlock(_sfc_main$i, {
          key: 2,
          story: __props.story,
          variant: __props.variant
        }, null, 8, ["story", "variant"]))
      ]);
    };
  }
});
const _hoisted_1$f = {
  key: 0,
  class: "htw-p-2 htw-h-full"
};
const _hoisted_2$e = {
  key: 0,
  class: "htw-divide-y htw-divide-gray-100 dark:htw-divide-gray-800 htw-h-full htw-flex htw-flex-col"
};
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode(" Select a variant... ");
const _hoisted_4$5 = {
  key: 0,
  class: "htw-p-2 htw-h-full"
};
const _hoisted_5$3 = { class: "htw-h-full htw-overflow-y-auto" };
const _hoisted_6$3 = {
  key: 0,
  class: "htw-p-2 htw-h-full"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  name: "StoryVariantSingle",
  emits: {
    "open-variant-menu": () => true
  },
  setup(__props) {
    useCssVars((_ctx) => {
      var _a;
      return {
        "22451fc3": (_a = unref(variant)) == null ? void 0 : _a.iconColor
      };
    });
    const storyStore = useStoryStore();
    const hasSingleVariant = computed(() => {
      var _a;
      return ((_a = storyStore.currentStory) == null ? void 0 : _a.variants.length) === 1;
    });
    const variant = computed(() => storyStore.currentVariant);
    return (_ctx, _cache) => {
      var _a;
      return unref(hasSingleVariant) && unref(storyStore).currentVariant ? (openBlock(), createElementBlock("div", _hoisted_1$f, [
        unref(storyStore).currentVariant.configReady ? (openBlock(), createBlock(_sfc_main$h, {
          key: 0,
          variant: unref(storyStore).currentVariant,
          story: unref(storyStore).currentStory
        }, null, 8, ["variant", "story"])) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(isMobile) ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
          createBaseVNode("a", {
            class: "htw-px-6 htw-h-12 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-cursor-pointer htw-flex htw-gap-2 htw-flex-wrap htw-w-full htw-items-center htw-flex-none",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("open-variant-menu"))
          }, [
            unref(variant) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(unref(Icon), {
                icon: (_a = unref(variant).icon) != null ? _a : "carbon:cube",
                class: normalizeClass(["base-list-item-link-icon htw-w-5 htw-h-5 htw-flex-none", {
                  "htw-text-gray-500": !unref(variant).iconColor,
                  "bind-icon-color": unref(variant).iconColor
                }])
              }, null, 8, ["icon", "class"]),
              createTextVNode(" " + toDisplayString(unref(variant).title), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _hoisted_3$8
            ], 64)),
            createVNode(unref(Icon), {
              icon: "carbon:chevron-sort",
              class: "htw-w-5 htw-h-5 htw-shrink-0 htw-ml-auto"
            })
          ]),
          unref(storyStore).currentVariant ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
            unref(storyStore).currentVariant.configReady ? (openBlock(), createBlock(_sfc_main$h, {
              key: 0,
              variant: unref(storyStore).currentVariant,
              story: unref(storyStore).currentStory
            }, null, 8, ["variant", "story"])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])) : (openBlock(), createBlock(BaseSplitPane, {
          key: 1,
          "save-id": "story-single-main-split",
          min: 5,
          max: 40,
          "default-split": 17
        }, {
          first: withCtx(() => [
            createBaseVNode("div", _hoisted_5$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(storyStore).currentStory.variants, (variant2, index) => {
                return openBlock(), createBlock(StoryVariantListItem, {
                  key: index,
                  variant: variant2
                }, null, 8, ["variant"]);
              }), 128))
            ])
          ]),
          last: withCtx(() => [
            unref(storyStore).currentVariant ? (openBlock(), createElementBlock("div", _hoisted_6$3, [
              createVNode(_sfc_main$h, {
                variant: unref(storyStore).currentVariant,
                story: unref(storyStore).currentStory
              }, null, 8, ["variant", "story"])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }))
      ], 64));
    };
  }
});
var StoryVariantSingle = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-39eaa600"]]);
const _hoisted_1$e = { class: "htw-bg-gray-50 htw-h-full dark:htw-bg-gray-750" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  name: "StoryViewer",
  setup(__props) {
    useCssVars((_ctx) => {
      var _a;
      return {
        "d1b61db4": (_a = unref(variant)) == null ? void 0 : _a.iconColor
      };
    });
    const storyStore = useStoryStore();
    const variant = computed(() => storyStore.currentVariant);
    const isMenuOpened = ref(false);
    function closeMenu() {
      isMenuOpened.value = false;
    }
    watch(variant, () => {
      isMenuOpened.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$e, [
          unref(storyStore).currentStory.layout.type === "grid" ? (openBlock(), createBlock(_sfc_main$s, { key: 0 })) : unref(storyStore).currentStory.layout.type === "single" ? (openBlock(), createBlock(StoryVariantSingle, {
            key: 1,
            onOpenVariantMenu: _cache[0] || (_cache[0] = ($event) => isMenuOpened.value = true)
          })) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$v, {
          title: "Select a variant",
          opened: isMenuOpened.value,
          onClose: closeMenu
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(storyStore).currentStory.variants, (variant2, index) => {
              return openBlock(), createBlock(StoryVariantListItem, {
                key: index,
                variant: variant2
              }, null, 8, ["variant"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ], 64);
    };
  }
});
var StoryViewer = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-3c153cb8"]]);
const _hoisted_1$d = { class: "htw-cursor-pointer htw-w-full htw-outline-none htw-px-2 htw-h-[27px] -htw-my-1 htw-border htw-border-solid htw-border-black/25 dark:htw-border-white/25 hover:htw-border-primary-500 dark:hover:htw-border-primary-500 htw-rounded-sm htw-flex htw-gap-2 htw-items-center htw-leading-normal" };
const _hoisted_2$d = { class: "htw-flex-1 htw-truncate" };
const _hoisted_3$7 = { class: "htw-flex htw-flex-col htw-bg-gray-50 dark:htw-bg-gray-700" };
const _hoisted_4$4 = ["onClick"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  name: "BaseSelect",
  props: {
    modelValue: null,
    options: null
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const formattedOptions = computed(() => {
      if (Array.isArray(props.options)) {
        return Object.fromEntries(props.options.map((value) => [value, value]));
      }
      return props.options;
    });
    const selectedLabel = computed(() => formattedOptions.value[props.modelValue]);
    function selectValue(value, hide) {
      emits("update:modelValue", value);
      emits("select", value);
      hide();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Dropdown), { "auto-size": "" }, {
        popper: withCtx(({ hide }) => [
          createBaseVNode("div", _hoisted_3$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(formattedOptions), (label, value) => {
              return openBlock(), createElementBlock("div", mergeProps(__spreadProps(__spreadValues({}, _ctx.$attrs), { class: null, style: null }), {
                key: label,
                class: ["htw-px-2 htw-py-1 htw-cursor-pointer hover:htw-bg-primary-100 dark:hover:htw-bg-primary-700", {
                  "htw-bg-primary-200 dark:htw-bg-primary-800": props.modelValue === value
                }],
                onClick: ($event) => selectValue(value, hide)
              }), [
                renderSlot(_ctx.$slots, "option", {
                  label,
                  value
                }, () => [
                  createTextVNode(toDisplayString(label), 1)
                ])
              ], 16, _hoisted_4$4);
            }), 128))
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$d, [
            createBaseVNode("div", _hoisted_2$d, [
              renderSlot(_ctx.$slots, "default", { label: unref(selectedLabel) }, () => [
                createTextVNode(toDisplayString(unref(selectedLabel)), 1)
              ])
            ]),
            createVNode(unref(Icon), {
              icon: "carbon:chevron-sort",
              class: "htw-w-4 htw-h-4 htw-flex-none htw-ml-auto"
            })
          ])
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$c = { class: "htw-flex htw-gap-2 htw-w-full htw-items-center" };
const _hoisted_2$c = ["onUpdate:modelValue"];
const _hoisted_3$6 = {
  key: 1,
  class: "htw-flex htw-items-center htw-gap-2"
};
const _hoisted_4$3 = { class: "htw-flex-1 htw-truncate" };
const _hoisted_5$2 = { class: "htw-flex htw-gap-2 htw-items-center" };
const _hoisted_6$2 = { class: "htw-flex-1 htw-truncate" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  name: "StatePresets",
  props: {
    story: null,
    variant: null
  },
  setup(__props) {
    const props = __props;
    const DEFAULT_ID = "default";
    const saveId = computed(() => `${props.story.id}:${props.variant.id}`);
    const omitKeys = ["_hPropDefs"];
    const defaultState = clone(omit(toRawDeep(props.variant.state), omitKeys));
    const selectedOption = useStorage(`_histoire-presets/${saveId.value}/selected`, DEFAULT_ID);
    const presetStates = useStorage(`_histoire-presets/${saveId.value}/states`, /* @__PURE__ */ new Map());
    const presetsOptions = computed(() => {
      const options = { [DEFAULT_ID]: "Initial state" };
      presetStates.value.forEach((value, key) => {
        options[key] = value.label;
      });
      return options;
    });
    function resetState() {
      selectedOption.value = DEFAULT_ID;
      applyStateToVariant(props.variant, clone(defaultState));
    }
    function applyPreset(id) {
      if (id === DEFAULT_ID) {
        resetState();
      } else if (presetStates.value.has(id)) {
        applyStateToVariant(props.variant, clone(presetStates.value.get(id).state));
      }
    }
    onMounted(() => {
      if (selectedOption.value !== DEFAULT_ID) {
        applyPreset(selectedOption.value);
      }
    });
    const input = ref();
    const select = ref();
    const canEdit = computed(() => selectedOption.value !== DEFAULT_ID);
    const isEditing = ref(false);
    async function createPreset() {
      const id = new Date().getTime().toString();
      presetStates.value.set(id, { state: clone(omit(toRawDeep(props.variant.state), omitKeys)), label: "New preset" });
      selectedOption.value = id;
      isEditing.value = true;
      await nextTick();
      input.value.select();
    }
    const savedNotif = ref(false);
    const savedTimeout = useTimeoutFn(() => {
      savedNotif.value = false;
    }, 1e3);
    async function savePreset() {
      if (!canEdit.value)
        return;
      const preset = presetStates.value.get(selectedOption.value);
      preset.state = clone(omit(toRawDeep(props.variant.state), omitKeys));
      savedNotif.value = true;
      savedTimeout.start();
    }
    function deletePreset(id) {
      if (!confirm("Are you sure you want to delete this preset?")) {
        return;
      }
      if (selectedOption.value === id) {
        resetState();
      }
      presetStates.value.delete(id);
    }
    async function startEditing() {
      if (!canEdit.value) {
        return;
      }
      isEditing.value = true;
      await nextTick();
      input.value.select();
    }
    function stopEditing() {
      isEditing.value = false;
    }
    onClickOutside(select, stopEditing);
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", {
          ref_key: "select",
          ref: select,
          class: "htw-flex-1 htw-min-w-0"
        }, [
          createVNode(_sfc_main$e, {
            modelValue: unref(selectedOption),
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(selectedOption) ? selectedOption.value = $event : null),
            options: unref(presetsOptions),
            onDblclick: _cache[3] || (_cache[3] = ($event) => startEditing()),
            onKeydown: [
              _cache[4] || (_cache[4] = withKeys(($event) => stopEditing(), ["enter"])),
              _cache[5] || (_cache[5] = withKeys(($event) => stopEditing(), ["escape"]))
            ],
            onSelect: _cache[6] || (_cache[6] = (id) => applyPreset(id))
          }, {
            default: withCtx(({ label }) => [
              isEditing.value ? withDirectives((openBlock(), createElementBlock("input", {
                key: 0,
                ref_key: "input",
                ref: input,
                "onUpdate:modelValue": ($event) => unref(presetStates).get(unref(selectedOption)).label = $event,
                type: "text",
                class: "htw-text-inherit htw-bg-transparent htw-w-full htw-h-full htw-outline-none",
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop", "prevent"]))
              }, null, 8, _hoisted_2$c)), [
                [vModelText, unref(presetStates).get(unref(selectedOption)).label]
              ]) : (openBlock(), createElementBlock("div", _hoisted_3$6, [
                createBaseVNode("span", _hoisted_4$3, toDisplayString(label), 1),
                unref(canEdit) ? withDirectives((openBlock(), createBlock(unref(Icon), {
                  key: 0,
                  icon: "carbon:edit",
                  class: "htw-flex-none htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 htw-opacity-50 hover:htw-opacity-100 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100",
                  onClick: _cache[1] || (_cache[1] = withModifiers(($event) => startEditing(), ["stop"]))
                }, null, 512)), [
                  [_directive_tooltip, "Rename this preset"]
                ]) : createCommentVNode("", true)
              ]))
            ]),
            option: withCtx(({ label, value }) => [
              createBaseVNode("div", _hoisted_5$2, [
                createBaseVNode("span", _hoisted_6$2, toDisplayString(label), 1),
                value !== DEFAULT_ID ? withDirectives((openBlock(), createBlock(unref(Icon), {
                  key: 0,
                  icon: "carbon:trash-can",
                  class: "htw-flex-none htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 htw-opacity-50 hover:htw-opacity-100 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100",
                  onClick: withModifiers(($event) => deletePreset(value), ["stop"])
                }, null, 8, ["onClick"])), [
                  [_directive_tooltip, "Delete this preset"]
                ]) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "options"])
        ], 512),
        withDirectives(createVNode(unref(Icon), {
          icon: savedNotif.value ? "carbon:checkmark" : "carbon:save",
          class: normalizeClass(["htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100", [
            unref(canEdit) ? "htw-opacity-50 hover:htw-opacity-100" : "htw-opacity-25 htw-pointer-events-none"
          ]]),
          onClick: _cache[7] || (_cache[7] = ($event) => savePreset())
        }, null, 8, ["icon", "class"]), [
          [_directive_tooltip, savedNotif.value ? "Saved!" : unref(canEdit) ? "Save to preset" : null]
        ]),
        withDirectives(createVNode(unref(Icon), {
          icon: "carbon:add-alt",
          class: "htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 htw-opacity-50 hover:htw-opacity-100 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100",
          onClick: _cache[8] || (_cache[8] = ($event) => createPreset())
        }, null, 512), [
          [_directive_tooltip, "Create new preset"]
        ]),
        withDirectives(createVNode(unref(Icon), {
          icon: "carbon:reset",
          class: "htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 htw-opacity-50 hover:htw-opacity-100 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100",
          onClick: _cache[9] || (_cache[9] = ($event) => resetState())
        }, null, 512), [
          [_directive_tooltip, "Reset to initial state"]
        ])
      ]);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  name: "ControlsComponentPropItem",
  props: {
    variant: null,
    component: null,
    definition: null
  },
  setup(__props) {
    const props = __props;
    const comp = computed(() => {
      var _a;
      switch ((_a = props.definition.types) == null ? void 0 : _a[0]) {
        case "string":
          return HstText;
        case "number":
          return HstNumber;
        case "boolean":
          return HstCheckbox;
        case "object":
        default:
          return HstTextarea;
      }
    });
    const isJSON = computed(() => comp.value === HstTextarea);
    const invalidValue = ref("");
    const model = computed({
      get: () => {
        var _a;
        if (invalidValue.value) {
          return invalidValue.value;
        }
        let val = (_a = props.variant.state._hPropState[props.component.index]) == null ? void 0 : _a[props.definition.name];
        if (val && isJSON.value) {
          val = JSON.stringify(val, null, 2);
        }
        return val;
      },
      set: (value) => {
        invalidValue.value = "";
        if (isJSON.value) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            invalidValue.value = value;
            return;
          }
        }
        if (!props.variant.state._hPropState[props.component.index]) {
          props.variant.state._hPropState[props.component.index] = {};
        }
        props.variant.state._hPropState[props.component.index][props.definition.name] = value;
      }
    });
    function reset() {
      if (props.variant.state._hPropState[props.component.index]) {
        delete props.variant.state._hPropState[props.component.index][props.definition.name];
      }
    }
    const canReset = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.variant.state) == null ? void 0 : _a._hPropState) == null ? void 0 : _b[props.component.index]) && props.definition.name in props.variant.state._hPropState[props.component.index];
    });
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return unref(comp) ? (openBlock(), createBlock(resolveDynamicComponent(unref(comp)), {
        key: 0,
        modelValue: unref(model),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(model) ? model.value = $event : null),
        title: `${__props.definition.name}${unref(canReset) ? " *" : ""}`,
        placeholder: unref(isJSON) ? "Enter JSON" : null
      }, {
        actions: withCtx(() => [
          invalidValue.value ? withDirectives((openBlock(), createBlock(unref(Icon), {
            key: 0,
            icon: "carbon:warning-alt",
            class: "htw-text-orange-500"
          }, null, 512)), [
            [_directive_tooltip, "JSON error"]
          ]) : createCommentVNode("", true),
          withDirectives(createVNode(unref(Icon), {
            icon: "carbon:erase",
            class: normalizeClass(["htw-cursor-pointer htw-w-4 htw-h-4 hover:htw-text-primary-500 dark:hover:htw-text-primary-400 htw-text-gray-900 dark:htw-text-gray-100", [
              unref(canReset) ? "htw-opacity-50 hover:htw-opacity-100" : "htw-opacity-25 htw-pointer-events-none"
            ]]),
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => reset(), ["stop"]))
          }, null, 8, ["class"]), [
            [_directive_tooltip, "Remove override"]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title", "placeholder"])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$b = { class: "htw-font-mono htw-p-2 htw-flex htw-items-center htw-gap-1" };
const _hoisted_2$b = /* @__PURE__ */ createBaseVNode("span", { class: "htw-opacity-30" }, "<", -1);
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("span", { class: "htw-opacity-30" }, ">", -1);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  name: "ControlsComponentProps",
  props: {
    variant: null,
    definition: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$b, [
          withDirectives(createVNode(unref(Icon), {
            icon: "carbon:flash",
            class: "htw-w-4 htw-h-4 htw-text-primary-500 htw-flex-none"
          }, null, 512), [
            [_directive_tooltip, "Auto-detected props"]
          ]),
          createBaseVNode("div", null, [
            _hoisted_2$b,
            createTextVNode(toDisplayString(__props.definition.name), 1),
            _hoisted_3$5
          ])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.definition.props, (prop) => {
          return openBlock(), createBlock(_sfc_main$c, {
            key: prop.name,
            variant: __props.variant,
            component: __props.definition,
            definition: prop
          }, null, 8, ["variant", "component", "definition"]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$a = {
  "data-test-id": "story-controls",
  class: "htw-flex htw-flex-col htw-divide-y htw-divide-gray-100 dark:htw-divide-gray-750"
};
const _hoisted_2$a = { class: "htw-h-9 htw-flex-none htw-px-2 htw-flex htw-items-center" };
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode("span", null, "No controls available for this story", -1);
const _hoisted_4$2 = { key: 2 };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  name: "StoryControls",
  props: {
    variant: {
      type: Object,
      required: true
    },
    story: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("div", _hoisted_2$a, [
          createVNode(_sfc_main$d, {
            story: __props.story,
            variant: __props.variant
          }, null, 8, ["story", "variant"])
        ]),
        __props.variant.slots().controls || __props.story.slots().controls ? (openBlock(), createBlock(unref(_sfc_main$1$1), {
          key: 0,
          "slot-name": "controls",
          variant: __props.variant,
          story: __props.story,
          class: "htw-flex-none"
        }, null, 8, ["variant", "story"])) : !((_b = (_a = __props.variant.state) == null ? void 0 : _a._hPropDefs) == null ? void 0 : _b.length) ? (openBlock(), createBlock(BaseEmpty, { key: 1 }, {
          default: withCtx(() => [
            createVNode(unref(Icon), {
              icon: "carbon:audio-console",
              class: "htw-w-8 htw-h-8 htw-opacity-50 htw-mb-6"
            }),
            _hoisted_3$4
          ]),
          _: 1
        })) : createCommentVNode("", true),
        ((_d = (_c = __props.variant.state) == null ? void 0 : _c._hPropDefs) == null ? void 0 : _d.length) ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.variant.state._hPropDefs, (def, index) => {
            return openBlock(), createBlock(_sfc_main$b, {
              key: index,
              variant: __props.variant,
              definition: def,
              class: "htw-flex-none htw-my-2"
            }, null, 8, ["variant", "definition"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$9 = /* @__PURE__ */ createTextVNode(" No documentation available ");
const _hoisted_2$9 = ["innerHTML"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  name: "StoryDocs",
  props: {
    story: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const renderedDoc = ref("");
    watchEffect(async () => {
      var _a;
      let comp = (_a = props.story.file) == null ? void 0 : _a.component;
      if (comp.__asyncResolved) {
        comp = comp.__asyncResolved;
      } else if (comp.__asyncLoader) {
        comp = await comp.__asyncLoader();
      }
      renderedDoc.value = comp.doc;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        !renderedDoc.value ? (openBlock(), createBlock(BaseEmpty, { key: 0 }, {
          default: withCtx(() => [
            createVNode(unref(Icon), {
              icon: "carbon:document-unknown",
              class: "htw-w-8 htw-h-8 htw-opacity-50 htw-mb-6"
            }),
            _hoisted_1$9
          ]),
          _: 1
        })) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: "htw-prose dark:htw-prose-invert htw-p-4 htw-max-w-none",
          "data-test-id": "story-docs",
          innerHTML: renderedDoc.value
        }, null, 8, _hoisted_2$9))
      ]);
    };
  }
});
const _hoisted_1$8 = {
  key: 0,
  class: "htw-text-xs htw-opacity-50 htw-truncate"
};
const _hoisted_2$8 = { class: "htw-overflow-auto htw-max-w-[400px] htw-max-h-[400px]" };
const _hoisted_3$3 = { class: "htw-p-4" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  name: "StoryEvent",
  props: {
    event: null
  },
  setup(__props) {
    const props = __props;
    const formattedArgument = computed(() => {
      switch (typeof props.event.argument) {
        case "string":
          return `"${props.event.argument}"`;
        case "object":
          return `{ ${Object.keys(props.event.argument).map((key) => `${key}: ${props.event.argument[key]}`).join(", ")} }`;
        default:
          return props.event.argument;
      }
    });
    return (_ctx, _cache) => {
      const _component_VDropdown = resolveComponent("VDropdown");
      return openBlock(), createBlock(_component_VDropdown, {
        class: "htw-group",
        placement: "right",
        "data-test-id": "event-item"
      }, {
        default: withCtx(({ shown }) => [
          createBaseVNode("div", {
            class: normalizeClass(["group-hover:htw-bg-primary-100 dark:group-hover:htw-bg-primary-700 htw-cursor-pointer htw-py-2 htw-px-4 htw-flex htw-items-baseline htw-gap-1 htw-leading-normal", [
              shown ? "htw-bg-primary-50 dark:htw-bg-primary-600" : "group-odd:htw-bg-gray-100/50 dark:group-odd:htw-bg-gray-750/40"
            ]])
          }, [
            createBaseVNode("span", {
              class: normalizeClass({
                "htw-text-primary-500": shown
              })
            }, toDisplayString(__props.event.name), 3),
            __props.event.argument ? (openBlock(), createElementBlock("span", _hoisted_1$8, toDisplayString(unref(formattedArgument)), 1)) : createCommentVNode("", true)
          ], 2)
        ]),
        popper: withCtx(() => [
          createBaseVNode("div", _hoisted_2$8, [
            createBaseVNode("pre", _hoisted_3$3, toDisplayString(__props.event.argument), 1)
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$7 = /* @__PURE__ */ createTextVNode(" No event fired ");
const _hoisted_2$7 = { key: 1 };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  name: "StoryEvents",
  setup(__props) {
    const eventsStore = useEventsStore();
    const hasEvents = computed(() => eventsStore.events.length);
    onMounted(resetUnseen);
    watch(() => eventsStore.unseen, resetUnseen);
    async function resetUnseen() {
      if (eventsStore.unseen > 0) {
        eventsStore.unseen = 0;
      }
      await nextTick();
      eventsElement.value.scrollTo({ top: eventsElement.value.scrollHeight });
    }
    const eventsElement = ref();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "eventsElement",
        ref: eventsElement
      }, [
        !unref(hasEvents) ? (openBlock(), createBlock(BaseEmpty, { key: 0 }, {
          default: withCtx(() => [
            createVNode(unref(Icon), {
              icon: "carbon:event-schedule",
              class: "htw-w-8 htw-h-8 htw-opacity-50 htw-mb-6"
            }),
            _hoisted_1$7
          ]),
          _: 1
        })) : (openBlock(), createElementBlock("div", _hoisted_2$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(eventsStore).events, (event, key) => {
            return openBlock(), createBlock(_sfc_main$8, {
              key,
              event
            }, null, 8, ["event"]);
          }), 128))
        ]))
      ], 512);
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-8b318638"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "htw-bg-gray-100 dark:htw-bg-gray-800 htw-h-full htw-overflow-hidden htw-flex htw-flex-col" };
const _hoisted_2$6 = {
  key: 0,
  class: "htw-h-10 htw-flex-none htw-border-b htw-border-solid htw-border-gray-150 dark:htw-border-gray-850 htw-px-4 htw-flex htw-items-center"
};
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "htw-text-gray-900 dark:htw-text-gray-100" }, " Source ", -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "htw-flex-1" }, null, -1));
const _hoisted_5$1 = {
  key: 1,
  class: "htw-text-red-500 htw-h-full htw-p-2 htw-overflow-auto htw-font-mono htw-text-sm"
};
const _hoisted_6$1 = ["value"];
const _hoisted_7$1 = {
  key: 3,
  class: "htw-w-full htw-h-full htw-overflow-auto",
  "data-test-id": "story-source-code"
};
const _hoisted_8$1 = ["innerHTML"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  name: "StorySourceCode",
  props: {
    variant: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const sourceCode = ref("");
    const highlighter = shallowRef();
    const error = ref(null);
    onMounted(async () => {
      setCDN("https://unpkg.com/shiki/");
      highlighter.value = await getHighlighter({
        langs: [
          "html",
          "jsx"
        ],
        themes: [
          "github-light",
          "github-dark"
        ]
      });
    });
    watch(() => props.variant, async (value) => {
      var _a, _b;
      error.value = null;
      try {
        if (value.source) {
          sourceCode.value = value.source;
        } else if ((_a = value.slots) == null ? void 0 : _a.call(value).source) {
          const source = (_b = value.slots) == null ? void 0 : _b.call(value).source()[0].children;
          if (source) {
            sourceCode.value = await unindent(source);
          }
        } else {
          sourceCode.value = await generateSourceCode(value);
        }
      } catch (e) {
        console.error(e);
        error.value = e.message;
      }
    }, {
      deep: true,
      immediate: true
    });
    const sourceHtml = computed(() => {
      var _a;
      return (_a = highlighter.value) == null ? void 0 : _a.codeToHtml(sourceCode.value, {
        lang: "html",
        theme: isDark.value ? "github-dark" : "github-light"
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        !error.value ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
          _hoisted_3$2,
          _hoisted_4$1,
          createVNode(unref(HstCopyIcon), {
            content: sourceCode.value,
            class: "htw-flex-none"
          }, null, 8, ["content"])
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, " Error: " + toDisplayString(error.value), 1)) : !unref(sourceHtml) ? (openBlock(), createElementBlock("textarea", {
          key: 2,
          class: "__histoire-code-placeholder htw-w-full htw-h-full htw-p-4 htw-outline-none htw-bg-transparent htw-resize-none htw-m-0",
          value: sourceCode.value,
          readonly: "",
          "data-test-id": "story-source-code"
        }, null, 8, _hoisted_6$1)) : (openBlock(), createElementBlock("div", _hoisted_7$1, [
          createBaseVNode("div", {
            class: "__histoire-code htw-p-4 htw-w-fit",
            innerHTML: unref(sourceHtml)
          }, null, 8, _hoisted_8$1)
        ]))
      ]);
    };
  }
});
var StorySourceCode = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-8b318638"]]);
const _sfc_main$5 = defineComponent({
  inheritAttrs: false,
  props: {
    exact: {
      type: Boolean,
      default: false
    },
    matched: {
      type: Boolean,
      default: null
    }
  }
});
const _hoisted_1$5 = ["href", "onClick"];
const _hoisted_2$5 = {
  key: 0,
  class: "htw-absolute htw-bottom-0 htw-left-0 htw-w-full htw-h-[2px] htw-bg-primary-500 dark:htw-bg-primary-400"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(_component_router_link, mergeProps(_ctx.$attrs, { custom: "" }), {
    default: withCtx(({ isActive, isExactActive, href, navigate }) => [
      createBaseVNode("a", mergeProps(_ctx.$attrs, {
        href,
        class: ["htw-px-4 htw-h-full htw-inline-flex htw-items-center hover:htw-bg-primary-50 dark:hover:htw-bg-primary-900 htw-relative htw-text-gray-900 dark:htw-text-gray-100", {
          "htw-text-primary-500 dark:htw-text-primary-400": _ctx.matched != null ? _ctx.matched : _ctx.exact && isExactActive || !_ctx.exact && isActive
        }],
        onClick: navigate
      }), [
        renderSlot(_ctx.$slots, "default"),
        createVNode(Transition, { name: "__histoire-scale-x" }, {
          default: withCtx(() => [
            (_ctx.matched != null ? _ctx.matched : _ctx.exact && isExactActive || !_ctx.exact && isActive) ? (openBlock(), createElementBlock("div", _hoisted_2$5)) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1024)
      ], 16, _hoisted_1$5)
    ]),
    _: 3
  }, 16);
}
var BaseTab = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
const _hoisted_1$4 = {
  role: "button",
  class: "htw-cursor-pointer hover:htw-bg-primary-50 dark:hover:htw-bg-primary-900 htw-w-8 htw-h-full htw-flex htw-items-center htw-justify-center htw-absolute htw-top-0 htw-right-0"
};
const _hoisted_2$4 = { class: "htw-flex htw-flex-col htw-items-stretch" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  name: "BaseOverflowMenu",
  setup(__props) {
    const overflowButtonWidth = 32;
    const el = ref();
    const availableWidth = ref(0);
    useResizeObserver(el, (entries) => {
      const containerWidth = entries[0].contentRect.width;
      availableWidth.value = containerWidth - overflowButtonWidth;
    });
    const children = ref(/* @__PURE__ */ new Map());
    const visibleChildrenCount = computed(() => {
      let width = 0;
      const c = [...children.value.values()].sort((a, b) => a.index - b.index);
      for (let i = 0; i < c.length; i++) {
        width += c[i].width;
        if (width > availableWidth.value) {
          return i;
        }
      }
      return c.length;
    });
    const ChildWrapper = {
      props: ["index"],
      setup(props, { slots }) {
        const el2 = ref();
        const state = reactive({ width: 0, index: props.index });
        useResizeObserver(el2, (entries) => {
          const width = entries[0].contentRect.width;
          if (!children.value.has(el2.value)) {
            children.value.set(el2.value, state);
          }
          state.width = width;
        });
        onBeforeUnmount(() => {
          children.value.delete(el2.value);
        });
        const visible = computed(() => visibleChildrenCount.value > state.index);
        return () => h("div", { ref: el2, style: { visibility: visible.value ? "visible" : "hidden" } }, slots.default());
      }
    };
    const ChildrenRender = (props, { slots }) => {
      const [fragment] = slots.default();
      return fragment.children.map((vnode, index) => h(ChildWrapper, { index }, () => [vnode]));
    };
    const ChildrenSlice = (props, { slots }) => {
      const [fragment] = slots.default();
      return fragment.children.slice(props.start, props.end);
    };
    return (_ctx, _cache) => {
      const _component_VDropdown = resolveComponent("VDropdown");
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: "htw-flex htw-overflow-hidden htw-relative"
      }, [
        createVNode(ChildrenRender, null, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }),
        unref(visibleChildrenCount) < children.value.size ? (openBlock(), createBlock(_component_VDropdown, { key: 0 }, {
          popper: withCtx(() => [
            createBaseVNode("div", _hoisted_2$4, [
              createVNode(ChildrenSlice, { start: unref(visibleChildrenCount) }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "overflow")
                ]),
                _: 3
              }, 8, ["start"])
            ])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$4, [
              createVNode(unref(Icon), {
                icon: "carbon:caret-down",
                class: "htw-w-4 htw-h-4 htw-opacity-50 group-hover:htw-opacity-100"
              })
            ])
          ]),
          _: 3
        })) : createCommentVNode("", true)
      ], 512);
    };
  }
});
const _sfc_main$3 = defineComponent({
  inheritAttrs: false,
  props: {
    exact: {
      type: Boolean,
      default: false
    },
    matched: {
      type: Boolean,
      default: null
    }
  }
});
const _hoisted_1$3 = ["href", "onClick"];
const _hoisted_2$3 = {
  key: 0,
  class: "htw-absolute htw-top-0 htw-left-0 htw-h-full htw-w-[2px] htw-bg-primary-500 dark:htw-bg-primary-400"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(_component_router_link, mergeProps(_ctx.$attrs, { custom: "" }), {
    default: withCtx(({ isActive, isExactActive, href, navigate }) => [
      createBaseVNode("a", mergeProps(_ctx.$attrs, {
        href,
        class: ["htw-px-4 htw-h-10 htw-min-w-[150px] htw-inline-flex htw-items-center hover:htw-bg-primary-50 dark:hover:htw-bg-primary-900 htw-relative htw-text-gray-900 dark:htw-text-gray-100", {
          "htw-text-primary-500 dark:htw-text-primary-400": _ctx.matched != null ? _ctx.matched : _ctx.exact && isExactActive || !_ctx.exact && isActive
        }],
        onClick: navigate
      }), [
        renderSlot(_ctx.$slots, "default"),
        createVNode(Transition, { name: "__histoire-scale-y" }, {
          default: withCtx(() => [
            (_ctx.matched != null ? _ctx.matched : _ctx.exact && isExactActive || !_ctx.exact && isActive) ? (openBlock(), createElementBlock("div", _hoisted_2$3)) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1024)
      ], 16, _hoisted_1$3)
    ]),
    _: 3
  }, 16);
}
var BaseOverflowTab = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render]]);
const _hoisted_1$2 = /* @__PURE__ */ createTextVNode(" Controls ");
const _hoisted_2$2 = /* @__PURE__ */ createTextVNode(" Docs ");
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode(" Events ");
const _hoisted_4 = {
  key: 0,
  class: "htw-text-center htw-text-xs htw-mx-1 htw-px-0.5 htw-h-4 htw-min-w-4 htw-rounded-full active htw-bg-primary-500 htw-text-white dark:htw-text-black"
};
const _hoisted_5 = /* @__PURE__ */ createTextVNode(" Controls ");
const _hoisted_6 = /* @__PURE__ */ createTextVNode(" Docs ");
const _hoisted_7 = /* @__PURE__ */ createTextVNode(" Events ");
const _hoisted_8 = {
  key: 0,
  class: "htw-text-center htw-text-xs htw-mx-1 htw-px-0.5 htw-h-4 htw-min-w-4 htw-rounded-full active htw-bg-primary-500 htw-text-white dark:htw-text-black"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  name: "PaneTabs",
  setup(__props) {
    const eventsStore = useEventsStore();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$4, { class: "htw-h-10 htw-flex-none htw-border-b htw-border-gray-100 dark:htw-border-gray-750" }, {
        overflow: withCtx(() => [
          createVNode(BaseOverflowTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "" }) }),
            matched: !_ctx.$route.query.tab
          }, {
            default: withCtx(() => [
              _hoisted_5
            ]),
            _: 1
          }, 8, ["to", "matched"]),
          createVNode(BaseOverflowTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "docs" }) }),
            matched: _ctx.$route.query.tab === "docs"
          }, {
            default: withCtx(() => [
              _hoisted_6
            ]),
            _: 1
          }, 8, ["to", "matched"]),
          createVNode(BaseOverflowTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "events" }) }),
            matched: _ctx.$route.query.tab === "events"
          }, {
            default: withCtx(() => [
              _hoisted_7,
              unref(eventsStore).unseen ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(unref(eventsStore).unseen <= 99 ? unref(eventsStore).unseen : "99+"), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["to", "matched"])
        ]),
        default: withCtx(() => [
          createVNode(BaseTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "" }) }),
            matched: !_ctx.$route.query.tab
          }, {
            default: withCtx(() => [
              _hoisted_1$2
            ]),
            _: 1
          }, 8, ["to", "matched"]),
          createVNode(BaseTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "docs" }) }),
            matched: _ctx.$route.query.tab === "docs"
          }, {
            default: withCtx(() => [
              _hoisted_2$2
            ]),
            _: 1
          }, 8, ["to", "matched"]),
          createVNode(BaseTab, {
            to: __spreadProps(__spreadValues({}, _ctx.$route), { query: __spreadProps(__spreadValues({}, _ctx.$route.query), { tab: "events" }) }),
            matched: _ctx.$route.query.tab === "events"
          }, {
            default: withCtx(() => [
              _hoisted_3$1,
              unref(eventsStore).unseen ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(eventsStore).unseen <= 99 ? unref(eventsStore).unseen : "99+"), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["to", "matched"])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("span", null, "Select a variant", -1);
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("span", null, "Loading...", -1);
const _hoisted_3 = { class: "htw-flex htw-flex-col htw-h-full" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  name: "StorySidePanel",
  setup(__props) {
    const storyStore = useStoryStore();
    const route = useRoute();
    const panelContentComponent = computed(() => {
      switch (route.query.tab) {
        case "docs":
          return _sfc_main$9;
        case "events":
          return _sfc_main$7;
        default:
          return _sfc_main$a;
      }
    });
    return (_ctx, _cache) => {
      return !unref(storyStore).currentVariant ? (openBlock(), createBlock(BaseEmpty, { key: 0 }, {
        default: withCtx(() => [
          _hoisted_1$1
        ]),
        _: 1
      })) : !unref(storyStore).currentVariant.previewReady ? (openBlock(), createBlock(BaseEmpty, { key: 1 }, {
        default: withCtx(() => [
          _hoisted_2$1
        ]),
        _: 1
      })) : (openBlock(), createBlock(BaseSplitPane, {
        key: 2,
        "save-id": "story-sidepane",
        orientation: "portrait",
        class: "htw-h-full",
        "data-test-id": "story-side-panel"
      }, {
        first: withCtx(() => [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$2),
            (openBlock(), createBlock(resolveDynamicComponent(unref(panelContentComponent)), {
              story: unref(storyStore).currentStory,
              variant: unref(storyStore).currentVariant,
              class: "htw-h-full htw-overflow-auto"
            }, null, 8, ["story", "variant"]))
          ])
        ]),
        last: withCtx(() => [
          createVNode(StorySourceCode, {
            variant: unref(storyStore).currentVariant,
            class: "htw-h-full"
          }, null, 8, ["variant"])
        ]),
        _: 1
      }));
    };
  }
});
const _hoisted_1 = {
  key: 1,
  class: "htw-h-full"
};
const _hoisted_2 = {
  key: 0,
  class: "htw-h-full htw-overflow-auto"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "StoryView",
  setup(__props) {
    const storyStore = useStoryStore();
    const router = useRouter();
    const route = useRoute();
    watch(() => storyStore.currentVariant, (value) => {
      if (value) {
        storyStore.currentStory.lastSelectedVariant = value;
      }
    }, {
      immediate: true
    });
    watch(() => [storyStore.currentStory, storyStore.currentVariant], () => {
      var _a, _b;
      if (!storyStore.currentVariant) {
        if ((_a = storyStore.currentStory) == null ? void 0 : _a.lastSelectedVariant) {
          setVariant(storyStore.currentStory.lastSelectedVariant.id);
          return;
        }
        if (((_b = storyStore.currentStory) == null ? void 0 : _b.variants.length) === 1) {
          setVariant(storyStore.currentStory.variants[0].id);
        }
      }
    }, {
      immediate: true
    });
    function setVariant(variantId) {
      router.replace(__spreadProps(__spreadValues({}, route), {
        query: __spreadProps(__spreadValues({}, route.query), {
          variantId
        })
      }));
    }
    return (_ctx, _cache) => {
      return !unref(storyStore).currentStory ? (openBlock(), createBlock(BaseEmpty, { key: 0 }, {
        default: withCtx(() => [
          createVNode(unref(Icon), {
            icon: "carbon:software-resource-resource",
            class: "htw-w-16 htw-h-16 htw-opacity-50"
          })
        ]),
        _: 1
      })) : (openBlock(), createElementBlock("div", _hoisted_1, [
        unref(storyStore).currentStory.docsOnly ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$9, {
            story: unref(storyStore).currentStory,
            class: "md:htw-p-12 htw-w-full md:htw-max-w-[600px] lg:htw-max-w-[800px] xl:htw-max-w-[900px]"
          }, null, 8, ["story"])
        ])) : unref(isMobile) ? (openBlock(), createBlock(StoryViewer, { key: 1 })) : (openBlock(), createBlock(BaseSplitPane, {
          key: 2,
          "save-id": "story-main",
          min: 30,
          max: 95,
          "default-split": 75,
          class: "htw-h-full"
        }, {
          first: withCtx(() => [
            createVNode(StoryViewer)
          ]),
          last: withCtx(() => [
            createVNode(_sfc_main$1)
          ]),
          _: 1
        }))
      ]));
    };
  }
});
export { _sfc_main as default };
