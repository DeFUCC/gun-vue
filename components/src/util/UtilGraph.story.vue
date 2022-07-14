<script setup>
import { defineAsyncComponent } from 'vue'

const UtilGraph = defineAsyncComponent(() =>
  import('./UtilGraph.vue')
)

</script>

<template lang="pug">
Story(title="Util/Graph" :layout="{ type: 'single', iframe: false }")
  Variant(title="Round")
    UtilGraph

</template>