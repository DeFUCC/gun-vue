<script setup>
import { defineAsyncComponent } from 'vue'

const GunRelay = defineAsyncComponent(() => import('./GunRelay.vue'))

</script>

<template lang="pug">
Story(
  title="Gun/Relay" 
  icon="carbon:bare-metal-server-01")
  Variant(title="Round")
    GunRelay.h-full

</template>