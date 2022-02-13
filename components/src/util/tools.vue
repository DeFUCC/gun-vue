<script setup>
import { reactive } from 'vue'
const show = reactive({
  graph: false,
  log: false,
  share: false,
})
</script>

<template lang='pug'>
.flex.justify-center.flex-wrap.relative.gap-2
  util-share
  //- button.button.m-2(@click="show.log = !show.log")
  //-   la-info-circle
  //-   .ml-2 Log
  button.button(@click="show.graph = !show.graph")
    mdi-graph-outline
  button.button
    relay-icon


  //- ui-layer(:open="show.log" @close="show.log = false")
  //-   log-tree
  ui-layer(:open="show.graph" @close="show.graph = false")
    util-graph

</template>