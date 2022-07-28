import { reactive, parseQuery, ref, createApp, createPinia, watch, computed, STATE_SYNC, PREVIEW_SETTINGS_SYNC, onMounted, h, MountStoryVue3, SANDBOX_READY, SandboxVue3, applyState } from "./vendor.es.js";
import { mapFile, files, histoireConfig, isDark } from "./mapping.es.js";
import { toRawDeep } from "./state.es.js";
var sandbox = "";
const receivedSettings = reactive({});
function applyPreviewSettings(settings) {
  Object.assign(receivedSettings, settings);
}
const query = parseQuery(window.location.search);
const file = ref(mapFile(files.find((f) => f.id === query.storyId)));
const app = createApp({
  name: "SandboxApp",
  setup() {
    const story = computed(() => file.value.story);
    const variant = computed(() => {
      var _a;
      return (_a = story.value) == null ? void 0 : _a.variants.find((v) => v.id === query.variantId);
    });
    let synced = false;
    let mounted = false;
    window.addEventListener("message", (event) => {
      var _a, _b;
      if (((_a = event.data) == null ? void 0 : _a.type) === STATE_SYNC) {
        if (!mounted)
          return;
        synced = true;
        applyState(variant.value.state, event.data.state);
      } else if (((_b = event.data) == null ? void 0 : _b.type) === PREVIEW_SETTINGS_SYNC) {
        applyPreviewSettings(event.data.settings);
      }
    });
    watch(() => variant.value.state, (value) => {
      var _a;
      if (synced && mounted) {
        synced = false;
        return;
      }
      (_a = window.parent) == null ? void 0 : _a.postMessage({
        type: STATE_SYNC,
        state: toRawDeep(value)
      });
    }, {
      deep: true
    });
    onMounted(() => {
      mounted = true;
    });
    return {
      story,
      variant
    };
  },
  render() {
    return [
      h("div", { class: "htw-sandbox-hidden" }, [
        h(MountStoryVue3, {
          story: file.value.story
        })
      ]),
      this.story && this.variant ? h(SandboxVue3, {
        story: this.story,
        variant: this.variant,
        onReady: () => {
          var _a;
          (_a = window.parent) == null ? void 0 : _a.postMessage({
            type: SANDBOX_READY
          });
        }
      }) : null
    ];
  }
});
app.use(createPinia());
app.mount("#app");
watch(isDark, (value) => {
  if (value) {
    document.documentElement.classList.add(histoireConfig.sandboxDarkClass);
  } else {
    document.documentElement.classList.remove(histoireConfig.sandboxDarkClass);
  }
}, {
  immediate: true
});
