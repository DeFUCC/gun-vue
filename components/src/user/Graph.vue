<script setup>
import { computed, reactive, watchEffect, onMounted } from 'vue'
import { useColor, useMates, useGun, currentRoom, gunAvatar, user } from '@composables';
import ForceGraph from 'force-graph';

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


onMounted(() => {
  const Graph = ForceGraph()(document.getElementById('graph'))
    .nodeId('pub')
    .nodeColor('color')
    // .nodeVal(node => {
    //   if (node.pub == user.pub) {
    //     return 100
    //   } else {
    //     return Object.keys(node.links).length + 1
    //   }
    // })
    .nodeRelSize(4)
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(1)
    .linkLabel('emoji')
    .linkCurvature(0.02)
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

  watchEffect(() => Graph.graphData({ nodes: Object.values(guests), links: links.value }))

})

</script>

<template lang='pug'>
#graph.bg-light-700.overflow-hidden
</template>