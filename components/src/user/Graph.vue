<script setup>
import { computed, reactive, watchEffect, onMounted } from 'vue'
import { useColor, useMates, useGun, currentRoom, gunAvatar } from '@composables';
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
      avatar: gunAvatar(k),
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
        emoji: link[1].emoji
      })
    })
  })
  return arr
})

onMounted(() => {
  const Graph = ForceGraph()(document.getElementById('graph'))
    .nodeId('pub')
    .nodeColor('color')
    .linkDirectionalArrowLength(4)
    .linkLabel('emoji')
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
#graph.bg-light-700
</template>