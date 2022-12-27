<script setup>
import { defineAsyncComponent } from 'vue'

const UtilRelay = defineAsyncComponent(() => import('./UtilRelay.vue'))

</script>

<template lang="pug">
Story(
  title="Util/Relay" 
  icon="carbon:bare-metal-server-01")
  Variant(title="Round")
    UtilRelay.h-full

</template>