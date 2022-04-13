<script setup>
import { computed, reactive, watchEffect, onMounted } from 'vue'
import { useColor, useMates, useGun, currentRoom, usePosts, user } from '@composables';
import ForceGraph from 'force-graph';

//https://github.com/vasturiano/force-graph

const emit = defineEmits(['post'])

const colorDeep = useColor('deep')
const gun = useGun()

const nodes = reactive({})
const links = reactive([])

gun
  .user(currentRoom.pub)
  .get("posts")
  .map()
  .once(async (data, key) => {
    let author = key.slice(-87);
    let from = key.slice(0, 44);
    let to = key.slice(45, 89);

    for (let hash of [from, to]) {
      let node = JSON.parse(await gun.get('#posts').get(hash).then())
      nodes[hash] = {
        hash,
        color: colorDeep.hex(hash),
        name: node?.title || node?.statement || hash,
      }
    }

    links.push({
      source: from,
      target: to,
      emoji: data,
      author
    })
  })

const rndms = {}

onMounted(() => {
  const Graph = ForceGraph()(document.getElementById('graph'))
    .nodeId('hash')
    .nodeColor('color')
    // .nodeVal(node => {
    //   if (node.pub == user.pub) {
    //     return 100
    //   } else {
    //     return Object.keys(node.links).length + 1
    //   }
    // })
    .nodeRelSize(4)
    .linkDirectionalArrowLength(6)
    .linkDirectionalArrowRelPos(1)
    .linkLabel('emoji')
    .linkCurvature((l) => {
      return rndms[l.index] = rndms[l.index] || Math.random() * 1 - 0.5
    })
    .linkColor(link => {
      return colorDeep.hex(link?.author || 0)
    })
    .linkWidth((link) => {
      return 2
    })
    .onNodeDragEnd(node => {
      node.fx = node.x;
      node.fy = node.y;
    }).onNodeClick(node => {
      // Center/zoom on node
      Graph.centerAt(node.x, node.y, 1000);
      Graph.zoom(4, 2000);
    })
    .onNodeClick((node, ev) => {
      emit('post', node.hash)
    });
  watchEffect(() => Graph.graphData({ nodes: Object.values(nodes), links }))

})

</script>

<template lang='pug'>
.flex
  #graph.bg-light-100.bg-opacity-70.backdrop-blur-md.backdrop-filter.overflow-hidden.max-h-60vh.min-h-400
  slot
</template>