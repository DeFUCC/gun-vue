<script setup>
import { defineAsyncComponent } from 'vue'

const UtilGraph = defineAsyncComponent(() => import('./UtilGraph.vue'))

</script>

<template lang="pug">
Story(
  title="Util/Graph" 
  icon="mdi:graph-outline" 
  :layout="{ type: 'single', iframe: true }")
  Variant(title="Round")
    UtilGraph

</template>