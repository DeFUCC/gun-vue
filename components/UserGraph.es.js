import { openBlock, createElementBlock, reactive, computed, onMounted, forceGraph, watchEffect, gunAvatar } from "./vendor.es.js";
import { useColor, useGun, currentRoom, user } from "./useDraw.es.js";
import { useMates } from "./useMates.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
const _hoisted_1 = {
  class: "bg-light-700 overflow-hidden",
  id: "graph"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1);
}
const _sfc_main = {
  __name: "UserGraph",
  emits: ["user"],
  setup(__props, { expose, emit }) {
    expose();
    const colorDeep = useColor("deep");
    const gun = useGun();
    const guests = reactive({});
    gun.user(currentRoom.pub).get("space").map().once(async (d, k) => {
      guests[k] = {
        pub: k,
        name: await gun.user(k).get("profile").get("name"),
        color: colorDeep.hex(k),
        links: useMates(k)
      };
    });
    const links = computed(() => {
      let arr = [];
      Object.values(guests).forEach((node) => {
        Object.entries(node.links).forEach((link) => {
          if (!guests[link[0]] || !link[1].text)
            return;
          arr.push({
            source: node.pub,
            target: link[0],
            emoji: link[1].emoji,
            back: link[1].back
          });
        });
      });
      return arr;
    });
    onMounted(() => {
      const Graph = forceGraph()(document.getElementById("graph")).nodeId("pub").nodeColor("color").nodeRelSize(4).linkDirectionalArrowLength(4).linkDirectionalArrowRelPos(1).linkLabel("emoji").linkCurvature(0.02).linkColor((link) => {
        var _a;
        return colorDeep.hex(((_a = link.source) == null ? void 0 : _a.pub) || 0);
      }).linkWidth((link) => {
        if (link.back)
          return 3;
        return 1;
      }).onNodeDragEnd((node) => {
        node.fx = node.x;
        node.fy = node.y;
      }).onNodeClick((node) => {
        Graph.centerAt(node.x, node.y, 1e3);
        Graph.zoom(4, 2e3);
      }).onNodeClick((node, ev) => {
        emit("user", node.pub);
      });
      watchEffect(() => Graph.graphData({ nodes: Object.values(guests), links: links.value }));
    });
    const __returned__ = { emit, colorDeep, gun, guests, links, computed, reactive, watchEffect, onMounted, useColor, useMates, useGun, currentRoom, gunAvatar, user, ForceGraph: forceGraph };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
_sfc_main.__file = "src/user/UserGraph.vue";
var UserGraph = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/user/UserGraph.vue"]]);
export { UserGraph as default };
