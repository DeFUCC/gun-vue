<script setup>
const show = reactive({
  graph: false,
  log: false,
  share: false,
})
</script>

<template lang='pug'>
.flex.justify-center
  button.button(@click="show.share = !show.share")
    ion-share-outline
  button.button(@click="show.log = !show.log")
    la-info-circle
  button.button(@click="show.graph = !show.graph")
    mdi-graph-outline
  button.button
    relay-icon

  ui-modal(:open="show.share" @close="show.share = false")
    util-share
  ui-modal(:open="show.log" @close="show.log = false")
    log-tree
  ui-modal(:open="show.graph" @close="show.graph = false")
    util-graph

</template>