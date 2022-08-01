import { openBlock$1 as openBlock, createElementBlock$1 as createElementBlock, createBaseVNode$1 as createBaseVNode, withDirectives$1 as withDirectives, vModelText$1 as vModelText, withKeys$1 as withKeys, withModifiers$1 as withModifiers, createVNode$1 as createVNode, createCommentVNode$1 as createCommentVNode, ref$1 as ref, onMounted$1 as onMounted, toRef, createBlock$1 as createBlock, computed$1 as computed, refDebounced$1 as refDebounced, watch$1 as watch, nextTick$1 as nextTick, VirtualList, toDisplayString$1 as toDisplayString, useMediaQuery$1 as useMediaQuery, onClickOutside$1 as onClickOutside, reactive$1 as reactive, watchEffect$1 as watchEffect, useCssVars$1 as useCssVars, unref$1 as unref, forceGraph, useBrowserLocation, useClipboard, useShare, k, normalizeStyle$1 as normalizeStyle, renderSlot$1 as renderSlot, createTextVNode$1 as createTextVNode } from "./vendor.es.js";
import "./AccountAvatar.es.js";
import __unplugin_components_0$1 from "./AccountBadge.es.js";
import "./AccountHome.es.js";
import "./AccountSelect.es.js";
import "./AccountStars.es.js";
import { useUser, currentRoom, useAccount, useDictRecordsBy, useDictLangs, dictLang, useDictAuthors, useGun, useColor, useDictRecordsFor, dictRecord, selectedUser, useWord, letterFilter, useDefs, useWords, user, gun, useProject, updateProjectField } from "./useDraw.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
import { useChat } from "./useChat.es.js";
import { useBackground } from "./useBackground.es.js";
import "./ChatTopics.es.js";
import { usePrivateChat } from "./usePrivate.es.js";
import "./ChatPrivateCount.es.js";
import "./UserHome.es.js";
import { languages, langParts, usePosts, useLog } from "./useLog.es.js";
import "./UiLayer.es.js";
import "./camera.es.js";
import "./RoomButton.es.js";
import "./GiftCard.es.js";
import "./GiftList.es.js";
import "./GiftForm.es.js";
import "./MateButton.es.js";
import "./PostCard.es.js";
import { addPost, usePost, usePostTimestamp } from "./useZip.es.js";
import { useMates, getFirstEmoji } from "./useMates.es.js";
import { countRating } from "./useReactions.es.js";
import "./QrShow.es.js";
import { useMd } from "./useMd.es.js";
import "./youtube.es.js";
import "./PostActionReact.es.js";
import "./ProjectList.es.js";
import "./ProjectCard.es.js";
import "./QrLoad.es.js";
import "./RoomCard.es.js";
import "./RoomList.es.js";
import "./SpacePlane.es.js";
import "./UiPanel.es.js";
import "./UserAuth.es.js";
import "./UserAvatar.es.js";
import "./UserCreate.es.js";
import "./UserCredentials.es.js";
import "./UserGraph.es.js";
import "./UserIcon.es.js";
import "./UserList.es.js";
import "./UserLogin.es.js";
import "./UserPanel.es.js";
import "./UserPass.es.js";
import "./UserProfile.es.js";
import "./UserRooms.es.js";
import "./UtilGraph.es.js";
import "./UtilRelay.es.js";
const _hoisted_1$3 = {
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  fill: "currentColor",
  d: "M3 5v18h5v5.078L14.352 23H29V5zm2 2h22v14H13.648L10 23.918V21H5zm5 5a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm6 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4zm6 0a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
}
var __unplugin_components_0 = { name: "la-comment-dots", render: render$4 };
const _hoisted_1$2 = {
  key: 0,
  class: "flex gap-2"
};
const _hoisted_2$2 = {
  key: 1,
  class: "p-4 flex flex-col items-center"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_la_comment_dots = __unplugin_components_0;
  return $setup.user.pub ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
    withDirectives(createBaseVNode("textarea", {
      class: "p-2 rounded-xl bg-light-200 flex-1",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.message = $event),
      placeholder: "Your message",
      onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => $setup.send(), ["prevent", "stop"]), ["enter"]))
    }, null, 544), [
      [vModelText, $setup.message]
    ]),
    $setup.user.pub ? (openBlock(), createElementBlock("button", {
      key: 0,
      class: "button",
      onClick: _cache[2] || (_cache[2] = ($event) => $setup.send())
    }, [
      createVNode(_component_la_comment_dots, { class: "mx-2" })
    ])) : createCommentVNode("v-if", true)
  ])) : (openBlock(), createElementBlock("div", _hoisted_2$2, [
    createBaseVNode("button", {
      class: "button",
      onClick: _cache[3] || (_cache[3] = ($event) => $setup.user.auth = true)
    }, "Log in to post messages")
  ]));
}
const _sfc_main$w = {
  __name: "ChatInput",
  emits: ["submit"],
  setup(__props, { expose, emit }) {
    expose();
    const { user: user2 } = useUser();
    const message = ref("");
    function send() {
      emit("submit", message.value);
      message.value = "";
    }
    const __returned__ = { user: user2, emit, message, send, ref, onMounted, toRef, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$w.__file = "src/chat/ChatInput.vue";
var __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", render$3], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatInput.vue"]]);
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["VirtualList"], {
    class: "flex flex-col bg-opacity-80 p-4 gap-2 overflow-y-scroll scroll-smooth flex-auto",
    ref: "list",
    "data-key": "timestamp",
    "data-sources": $setup.sorted,
    "data-component": $setup.ChatMessage
  }, null, 8, ["data-sources"]);
}
const _sfc_main$v = {
  __name: "ChatMessages",
  props: {
    messages: { type: Object }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const list = ref();
    const messageArray = computed(() => Object.values(props.messages || {}));
    const debList = refDebounced(messageArray);
    const sorted = computed(() => debList.value.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1));
    watch(sorted, () => {
      nextTick(() => {
        list.value.scrollToBottom();
      });
    }, { deep: true });
    const __returned__ = { props, list, messageArray, debList, sorted, ref, watch, nextTick, computed, refDebounced, VirtualList, ChatMessage };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$v.__file = "src/chat/ChatMessages.vue";
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", render$2], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatMessages.vue"]]);
const _hoisted_1$1 = {
  class: "flex flex-col overflow-y-scroll",
  style: { "flex": "1000 1 auto" }
};
const _hoisted_2$1 = { class: "px-4 py-6 flex flex-wrap items-center text-center" };
const _hoisted_3$1 = { class: "flex-1 ml-2 font-bold" };
const _hoisted_4 = { class: "p-4 bg-dark-50 bg-opacity-80 flex gap-2 flex sticky bottom-0" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_chat_messages = __unplugin_components_1;
  const _component_chat_input = __unplugin_components_2;
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3$1, toDisplayString($setup.currentChat), 1)
    ]),
    createVNode(_component_chat_messages, { messages: $setup.messages }, null, 8, ["messages"]),
    createBaseVNode("div", _hoisted_4, [
      createVNode(_component_chat_input, {
        class: "flex-auto",
        onSubmit: _cache[0] || (_cache[0] = ($event) => $setup.send($event))
      })
    ])
  ]);
}
const _sfc_main$u = {
  __name: "ChatRoom",
  props: {
    title: { type: String, default: "Topics" },
    topic: { type: String, default: "general" },
    clickSound: { type: String, default: "audio/safe.mp3" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    let audio;
    function click() {
      if (!audio) {
        audio = new Audio(props.clickSound);
        audio.volume = 0.1;
      }
      audio.play();
    }
    const { send, currentChat, messages } = useChat();
    watch(() => props.topic, (topic) => {
      currentChat.value = topic;
    }, { immediate: true });
    watch(messages, () => {
      click();
    }, { deep: true });
    const __returned__ = { props, audio, click, send, currentChat, messages, ref, computed, watch, nextTick, useMediaQuery, onClickOutside, useChat, useUser, useBackground, currentRoom };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$u.__file = "src/chat/ChatRoom.vue";
var ChatRoom = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", render$1], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatRoom.vue"]]);
var ChatRoom$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": ChatRoom
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "ChatPrivate",
  props: {
    pub: String
  },
  emits: "user",
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { account } = useAccount(toRef(props, "pub"));
    const { send, messages } = usePrivateChat(props.pub);
    const __returned__ = { props, emit, account, send, messages, ref, reactive, computed, toRef, useAccount, usePrivateChat };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$t.__file = "src/chat/private/ChatPrivate.vue";
const _sfc_main$s = {
  __name: "DictBy",
  props: {
    author: String
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const pub = computed(() => props.author || user2.pub);
    const records = computed(() => useDictRecordsBy(pub.value));
    const __returned__ = { props, user: user2, pub, records, useUser, useDictRecordsBy, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$s.__file = "src/dict/DictBy.vue";
const _sfc_main$r = {
  __name: "DictPanel",
  emits: ["home", "my", "authors"],
  setup(__props, { expose }) {
    expose();
    const langs = useDictLangs();
    const __returned__ = { langs, dictLang, languages, useDictLangs };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$r.__file = "src/dict/DictPanel.vue";
const _sfc_main$q = {
  __name: "DictAuthors",
  emits: ["author"],
  setup(__props, { expose }) {
    expose();
    const authors = useDictAuthors();
    const __returned__ = { authors, useDictAuthors };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$q.__file = "src/dict/DictAuthors.vue";
var DictLinkButton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$p = {
  __name: "DictLinkButton",
  props: {
    type: String,
    hash: String,
    my: Boolean
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const __returned__ = { props, user: user2, useGun, useUser, useColor, useDictRecordsFor, dictRecord, langParts };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$p.__file = "src/dict/link/DictLinkButton.vue";
const _sfc_main$o = {
  __name: "DictLinkList",
  props: {
    links: [Array, Object],
    type: { type: String, default: "def" },
    avatar: Boolean
  },
  emits: ["def", "word"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const color = useColor("light");
    const colorDeep = useColor("deep");
    const isActive = computed(() => {
    });
    const __returned__ = { color, colorDeep, props, emit, isActive, dictRecord, useColor, selectedUser, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$o.__file = "src/dict/link/DictLinkList.vue";
var DictDefCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$n = {
  __name: "DictDefCard",
  props: {
    hash: String,
    authors: Object
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const color = useColor("light");
    const gun2 = useGun();
    const { user: user2 } = useUser();
    const def = ref();
    gun2.get("dict").get("#def").get(props.hash).once((d, k2) => {
      def.value = JSON.parse(d);
    });
    const links = useDictRecordsFor(props.hash);
    const __returned__ = { props, color, gun: gun2, user: user2, def, links, ref, useGun, useUser, useColor, useDictRecordsFor, dictRecord, langParts };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$n.__file = "src/dict/def/DictDefCard.vue";
var DictWordCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$m = {
  __name: "DictWordCard",
  props: {
    hash: String
  },
  emits: ["def"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const color = useColor("light");
    const { word } = useWord(props.hash);
    const links = useDictRecordsFor(props.hash);
    const __returned__ = { props, user: user2, color, word, links, useWord, useColor, letterFilter, dictRecord, useDictRecordsFor, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$m.__file = "src/dict/word/DictWordCard.vue";
const _sfc_main$l = {
  __name: "DictDefList",
  emits: ["def", "root"],
  setup(__props, { expose }) {
    expose();
    const deepColor = useColor("deep");
    const { user: user2 } = useUser();
    const { def, addDef, defs, found, linked } = useDefs();
    const __returned__ = { deepColor, user: user2, def, addDef, defs, found, linked, useDefs, useColor, langParts, useUser, dictRecord };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$l.__file = "src/dict/def/DictDefList.vue";
var DictDefPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$k = {
  __name: "DictDefPage",
  props: {
    hash: String
  },
  emits: ["word", "close"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const color = useColor("light");
    const gun2 = useGun();
    const { user: user2 } = useUser();
    const def = ref();
    gun2.get("dict").get("#def").get(props.hash).once((d, k2) => {
      def.value = JSON.parse(d);
    });
    const links = useDictRecordsFor(props.hash);
    const __returned__ = { props, color, gun: gun2, user: user2, def, links, ref, useGun, useColor, useDictRecordsFor, dictRecord, langParts, useUser };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$k.__file = "src/dict/def/DictDefPage.vue";
const _sfc_main$j = {
  __name: "DictWordList",
  emits: ["word", "root"],
  setup(__props, { expose }) {
    expose();
    const color = useColor("light");
    const { user: user2 } = useUser();
    const { input, found, words, linked, word, addWord } = useWords();
    const __returned__ = { color, user: user2, input, found, words, linked, word, addWord, useWords, useColor, useUser, dictRecord };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$j.__file = "src/dict/word/DictWordList.vue";
var DictWordPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$i = {
  __name: "DictWordPage",
  props: {
    hash: String
  },
  emits: ["def", "close"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const color = useColor("light");
    const colorDeep = useColor("deep");
    const { word } = useWord(props.hash);
    const links = useDictRecordsFor(props.hash);
    const __returned__ = { props, color, colorDeep, word, links, useWord, useColor, letterFilter, dictRecord, useDictRecordsFor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$i.__file = "src/dict/word/DictWordPage.vue";
var EmbedYoutube_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$h = {
  __name: "EmbedYoutube",
  props: ["video"],
  setup(__props, { expose }) {
    expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$h.__file = "src/embed/EmbedYoutube.vue";
var FormLink_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$g = {
  __name: "FormLink",
  emits: ["update"],
  setup(__props, { expose, emit }) {
    expose();
    const add = ref();
    const url = ref();
    const input = ref();
    const valid = ref(false);
    const link = ref();
    watchEffect(() => {
      var _a;
      if (url.value) {
        valid.value = (_a = input == null ? void 0 : input.value) == null ? void 0 : _a.checkValidity();
        if (valid.value) {
          link.value = url.value;
          emit("update", url.value);
        }
      } else {
        link.value = null;
      }
    });
    const __returned__ = { add, url, input, valid, link, emit, reactive, ref, watchEffect, watch, computed, nextTick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$g.__file = "src/form/FormLink.vue";
var FormYoutube_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$f = {
  __name: "FormYoutube",
  props: {
    id: { type: String }
  },
  emits: ["update", "close"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const link = ref();
    const add = ref();
    watch(link, (lnk) => {
      if (lnk) {
        emit("update", youtubeLinkParser(lnk));
      } else {
        emit("update", null);
      }
    });
    function youtubeLinkParser(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return null;
      }
    }
    const __returned__ = { link, emit, props, add, youtubeLinkParser, ref, watch };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$f.__file = "src/form/FormYoutube.vue";
var PostForm_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$e = {
  __name: "PostForm",
  props: {
    tag: { type: String, default: " " }
  },
  emits: ["close"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    useCssVars((_ctx) => ({
      "12c4c5aa-addColor": unref(addColor)
    }));
    const colorDeep = useColor("deep");
    const addColor = computed(() => {
      return colorDeep.hex(props.tag);
    });
    const titleInput = ref();
    onMounted(() => {
      var _a;
      (_a = titleInput == null ? void 0 : titleInput.value) == null ? void 0 : _a.focus();
    });
    const postData = ref({});
    const add = reactive({
      form: false,
      youtube: false,
      text: false
    });
    const hasContent = computed(() => {
      return postData.value.title || postData.value.statement || postData.value.text || postData.value.cover;
    });
    function submit() {
      if (!hasContent.value)
        return;
      const contents = { ...postData.value };
      addPost(props.tag, contents);
      reset();
    }
    function reset() {
      add.form = false;
      postData.value = {};
      emit("close");
    }
    const __returned__ = { props, emit, colorDeep, addColor, titleInput, postData, add, hasContent, submit, reset, reactive, ref, onMounted, watch, computed, addPost, useColor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$e.__file = "src/post/PostForm.vue";
const _sfc_main$d = {
  __name: "PostGraph",
  emits: ["post"],
  setup(__props, { expose, emit }) {
    expose();
    const colorDeep = useColor("deep");
    const gun2 = useGun();
    const nodes = reactive({});
    const links = reactive([]);
    gun2.user(currentRoom.pub).get("posts").map().once(async (data, key) => {
      let author = key.slice(-87);
      let from = key.slice(0, 44);
      let to = key.slice(45, 89);
      for (let hash of [from, to]) {
        let node = JSON.parse(await gun2.get("#posts").get(hash).then());
        nodes[hash] = {
          hash,
          color: colorDeep.hex(hash),
          name: (node == null ? void 0 : node.title) || (node == null ? void 0 : node.statement) || hash
        };
      }
      links.push({
        source: from,
        target: to,
        emoji: data,
        author
      });
    });
    const rndms = {};
    onMounted(() => {
      const Graph = forceGraph()(document.getElementById("graph")).nodeId("hash").nodeColor("color").nodeRelSize(4).linkDirectionalArrowLength(6).linkDirectionalArrowRelPos(1).linkLabel("emoji").linkCurvature((l) => {
        return rndms[l.index] = rndms[l.index] || Math.random() * 1 - 0.5;
      }).linkColor((link) => {
        return colorDeep.hex((link == null ? void 0 : link.author) || 0);
      }).linkWidth((link) => {
        return 2;
      }).onNodeDragEnd((node) => {
        node.fx = node.x;
        node.fy = node.y;
      }).onNodeClick((node) => {
        Graph.centerAt(node.x, node.y, 1e3);
        Graph.zoom(4, 2e3);
      }).onNodeClick((node, ev) => {
        emit("post", node.hash);
      });
      watchEffect(() => Graph.graphData({ nodes: Object.values(nodes), links }));
    });
    const __returned__ = { emit, colorDeep, gun: gun2, nodes, links, rndms, computed, reactive, watchEffect, onMounted, useColor, useMates, useGun, currentRoom, usePosts, user, ForceGraph: forceGraph };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$d.__file = "src/post/PostGraph.vue";
var PostLine_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = {
  __name: "PostLine",
  props: {
    hash: { type: String, default: "" },
    authors: Object,
    tag: String,
    back: Boolean,
    actions: { type: Boolean, default: true }
  },
  emits: ["user"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const colorLight = useColor("light");
    const colorDeep = useColor("deep");
    const { post } = usePost({ hash: props.hash });
    const __returned__ = { colorLight, colorDeep, props, post, useColor, usePost, computed, ref, watchEffect };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$c.__file = "src/post/PostLine.vue";
const _sfc_main$b = {
  __name: "UtilShare",
  setup(__props, { expose }) {
    expose();
    const location = useBrowserLocation();
    const open = ref(false);
    const { text, copy, copied, isSupported: canCopy } = useClipboard();
    const { share, isSupported: canShare } = useShare();
    const address = computed(() => {
      return location.value.href + location.value.search;
    });
    const __returned__ = { location, open, text, copy, copied, canCopy, share, canShare, address, useBrowserLocation, useClipboard, useShare, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$b.__file = "src/util/UtilShare.vue";
const _sfc_main$a = {
  __name: "PostList",
  props: {
    tag: { type: String },
    header: { type: Boolean, default: true }
  },
  emits: ["close", "browse", "user"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const { posts, backlinks, countPosts, countBacklinks, downloadPosts, downloading, uploadPosts } = usePosts(props.tag);
    const add = ref();
    const openBacklinks = ref(false);
    const showHidden = ref(false);
    const filteredPosts = computed(() => {
      const list = {};
      for (let hash in posts) {
        const rating = countRating(posts[hash]);
        if (showHidden.value || rating > 0) {
          list[hash] = posts[hash];
        }
      }
      return list;
    });
    const __returned__ = { user: user2, props, emit, posts, backlinks, countPosts, countBacklinks, downloadPosts, downloading, uploadPosts, add, openBacklinks, showHidden, filteredPosts, usePosts, useUser, countRating, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$a.__file = "src/post/PostList.vue";
var PostActionUpdate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$9 = {
  __name: "PostActionUpdate",
  props: {
    tag: { type: String, default: "posts" },
    hash: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { timestamp, msTime, refresh } = usePostTimestamp(props);
    const __returned__ = { props, timestamp, msTime, refresh, usePostTimestamp };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$9.__file = "src/post/action/PostActionUpdate.vue";
const _sfc_main$8 = {
  __name: "PostPage",
  props: {
    tag: { type: String, default: "" },
    hash: { type: String, default: "" }
  },
  emits: ["close", "browse"],
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const gun2 = useGun();
    const md = useMd();
    const colorLight = computed(() => useColor("light").hex(props.hash));
    const colorDeep = computed(() => useColor("deep").hex(props.hash));
    const { post, download, downloading } = usePost({ hash: props.hash });
    const { posts, backlinks } = usePosts(props.hash);
    const __returned__ = { user: user2, gun: gun2, md, props, colorLight, colorDeep, post, download, downloading, posts, backlinks, ref, watchEffect, computed, useColor, usePosts, useGun, useUser, usePost, useMd };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$8.__file = "src/post/PostPage.vue";
const _sfc_main$7 = {
  __name: "PostActionStar",
  props: {
    tag: { type: String, default: "" },
    hash: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const starred = ref(false);
    const myStar = user2.db.get("posts").get(`${props.tag}`).get(props.hash);
    myStar.on((d, k2) => {
      starred.value = d;
    });
    function toggleStar(tag = props.tag, hash = props.hash) {
      myStar.put(!starred.value);
    }
    const __returned__ = { user: user2, props, starred, myStar, toggleStar, useUser, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$7.__file = "src/post/action/PostActionStar.vue";
const _sfc_main$6 = {
  __name: "PostActionBan",
  props: {
    tag: { type: String, default: "" },
    hash: { type: String, default: "" },
    host: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const banned = ref(false);
    gun.get("ban").get(props.hash).on((d) => {
      banned.value = d;
    });
    async function banPost() {
      let banned2 = await gun.get("ban").get(props.hash).then();
      gun.get("ban").get(props.hash).put(!banned2);
    }
    const __returned__ = { props, banned, banPost, ref, gun };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$6.__file = "src/post/action/PostActionBan.vue";
const _sfc_main$5 = {
  __name: "ProjectPage",
  props: {
    path: { type: String, default: "" }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const { user: user2 } = useUser();
    const md = useMd();
    const { project } = useProject(toRef(props, "path"));
    const editable = computed(() => props.path.includes(user2.pub));
    const text = ref("");
    watchEffect(() => {
      text.value = project.value.text;
    });
    const __returned__ = { props, user: user2, md, project, editable, text, useUser, useProject, updateProjectField, useMd, toRef, ref, computed, watchEffect, Ink: k };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$5.__file = "src/project/ProjectPage.vue";
const _sfc_main$4 = {};
_sfc_main$4.__file = "src/room/RoomProfile.vue";
const _sfc_main$3 = {
  __name: "UiModal",
  props: {
    open: { default: false }
  },
  emits: ["close"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const __returned__ = { props, emit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$3.__file = "src/ui/UiModal.vue";
const _sfc_main$2 = {
  __name: "UtilTools",
  setup(__props, { expose }) {
    expose();
    const show = reactive({
      graph: false,
      log: false,
      share: false
    });
    const __returned__ = { show, reactive };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$2.__file = "src/util/UtilTools.vue";
var UtilTree_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  __name: "UtilTree",
  props: {
    name: { type: String, default: "logs" },
    after: { type: String, default: "2021-01-01" },
    before: { type: String, default: "2023-01-01" }
  },
  emits: ["browse"],
  setup(__props, { expose, emit }) {
    expose();
    const props = __props;
    const { sorted, putNow, count } = useLog(props);
    const __returned__ = { props, sorted, putNow, count, emit, useLog };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main$1.__file = "src/util/UtilTree.vue";
const _hoisted_1 = { class: "ml-2 text-sm opacity-20 hover_opacity-80 transition cursor-default text-light-200" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "flex-1" }, null, -1);
const _hoisted_3 = { class: "ml-2 text-sm opacity-20 hover_opacity-80 transition cursor-default text-dark-200" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  const _component_account_badge = __unplugin_components_0$1;
  return openBlock(), createElementBlock("div", {
    class: "p-1 flex flex-col w-full gap-1",
    style: normalizeStyle({ alignItems: $setup.isMe ? "end" : "start" })
  }, [
    createBaseVNode("div", {
      class: "flex items-center w-full",
      style: normalizeStyle({ flexDirection: $setup.isMe ? "row-reverse" : "row" })
    }, [
      createVNode(_component_account_badge, {
        class: "opacity-50 hover_opacity-90 transition",
        pub: $props.source.author,
        showName: true,
        size: 20,
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.selectedUser.pub = $props.source.author)
      }, null, 8, ["pub"]),
      createBaseVNode("div", _hoisted_1, toDisplayString((_a = $setup.dateTime) == null ? void 0 : _a.time), 1),
      _hoisted_2,
      createBaseVNode("div", _hoisted_3, toDisplayString((_b = $setup.dateTime) == null ? void 0 : _b.date), 1)
    ], 4),
    createBaseVNode("div", {
      class: "px-2 py-1 bg-light-300 bg-opacity-80 rounded-b-xl max-w-max break-all overflow-hidden",
      style: normalizeStyle({ borderTopLeftRadius: $setup.isMe ? "12px" : "0px", borderTopRightRadius: $setup.isMe ? "0px" : "12px", fontSize: $props.source.text == $setup.getFirstEmoji($props.source.text) ? "4em" : "1em" })
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString($props.source.text), 1)
      ])
    ], 4)
  ], 4);
}
const _sfc_main = {
  __name: "ChatMessage",
  props: {
    source: {
      type: Object,
      default: {
        author: "",
        timestamp: "",
        text: "empty"
      }
    }
  },
  setup(__props, { expose }) {
    expose();
    const props = __props;
    const dateTime = computed(() => {
      return formatDate(Number(props.source.timestamp));
    });
    const { user: user2 } = useUser();
    const isMe = computed(() => props.source.author == user2.pub);
    function formatDate(timestamp) {
      if (!timestamp)
        return;
      const theDate = new Date(timestamp);
      const date = theDate.toLocaleDateString("en-CA");
      const time = theDate.toLocaleTimeString("ru-RU");
      return {
        full: date + " " + time,
        date,
        time
      };
    }
    const __returned__ = { props, dateTime, user: user2, isMe, formatDate, computed, selectedUser, useUser, getFirstEmoji };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/chat/ChatMessage.vue";
var ChatMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/chat/ChatMessage.vue"]]);
var ChatMessage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": ChatMessage
}, Symbol.toStringTag, { value: "Module" }));
export { ChatMessage$1 as ChatMessage, ChatRoom$1 as ChatRoom };
