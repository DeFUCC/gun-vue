<script setup lang="ts">
import { GunRelay, UiLayer, GunGraph } from '../components'
import { reactive } from 'vue'

const show = reactive({
  graph: false,
  log: false,
  share: false,
})

</script>

<template lang="pug">
.flex.relative.items-center

  button.button.flex.items-center(@click="show.graph = !show.graph")
    .i-mdi-graph-outline

  ui-layer(
    :open="show.graph" 
    @close="show.graph = false")
    gun-graph

</template>