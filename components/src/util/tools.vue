<script setup>
import { reactive } from 'vue'
const show = reactive({
  graph: false,
  log: false,
  share: false,
})
</script>

<template lang='pug'>
.flex.justify-end.relative.gap-3.items-center
  //- util-share
  //- button.button.m-2(@click="show.log = !show.log")
  //-   la-info-circle
  //-   .ml-2 Log
  button.flex.items-center(@click="show.graph = !show.graph")
    mdi-graph-outline
  button.flex.items-center
    util-relay


  //- ui-layer(:open="show.log" @close="show.log = false")
  //-   log-tree
  ui-layer(:open="show.graph" @close="show.graph = false")
    util-graph

</template>