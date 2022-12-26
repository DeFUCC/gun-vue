<script setup>
import { computed, reactive, watchEffect, onMounted } from 'vue'
import { useColor, useMates, useGun, currentRoom, gunAvatar, user } from '#composables';
import ForceGraph from 'force-graph';

import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const graph = ref(null)


//https://github.com/vasturiano/force-graph

const emit = defineEmits(['user'])

const colorDeep = useColor('deep')
const gun = useGun()

const guests = reactive({})

gun
  .user(currentRoom.pub)
  .get("space")
  .map()
  .once(async (d, k) => {
    guests[k] = {
      pub: k,
      name: await gun.user(k).get('profile').get('name'),
      color: colorDeep.hex(k),
      links: useMates(k)
    }
  })

const links = computed(() => {
  let arr = []
  Object.values(guests).forEach(node => {
    Object.entries(node.links).forEach(link => {
      if (!guests[link[0]] || !link[1].text) return
      arr.push({
        source: node.pub,
        target: link[0],
        emoji: link[1].emoji,
        back: link[1].back
      })
    })
  })
  return arr
})

const Graph = ForceGraph()
  .width(600)
  .nodeId('pub')
  .nodeColor('color')
  .nodeVal(node => {
    if (node.pub == user.pub) {
      return 10
    } else {
      return 1 // Object.keys(node.links).length + 1
    }
  })
  .nodeRelSize(4)
  .linkDirectionalArrowLength(4)
  .linkDirectionalArrowRelPos(1)
  .linkLabel('emoji')
  .linkCurvature(0.2)
  .linkColor(link => {
    return colorDeep.hex(link.source?.pub || 0)
  })
  .linkWidth((link) => {
    if (link.back) return 3
    return 1
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
    emit('user', node.pub)
  });

onMounted(() => {
  Graph(document.getElementById('graph'))
})

watchEffect(() => Graph.graphData({ nodes: Object.values(guests), links: links.value }))

useResizeObserver(graph, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  Graph.width(width);
  Graph.height(height)
})

</script>

<template lang="pug">
.bg-light-700.overflow-none.w-full.max-w-90vw.max-h-90vh.h-full(ref="graph")
  #graph
</template>