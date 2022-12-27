<script setup>
import { defineAsyncComponent } from 'vue'

const SpacePlane = defineAsyncComponent(() => import('./SpacePlane.vue'))

</script>

<template lang="pug">
Story(
  title="Space/Plane" 
  icon="la:draw-polygon" 
  :layout="{ type: 'single', iframe: false }"
  )
  Variant(title="Round")
    SpacePlane.h-90vh

</template>