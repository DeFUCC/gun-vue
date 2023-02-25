<script setup>
import { defineAsyncComponent } from 'vue'

const GunGraph = defineAsyncComponent(() => import('./GunGraph.vue'))

</script>

<template lang="pug">
Story(
  title="Gun/Graph" 
  icon="mdi:graph-outline" 
  :layout="{ type: 'single', iframe: true }")
  Variant(title="Round")
    GunGraph

</template>