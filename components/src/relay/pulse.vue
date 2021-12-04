<script setup>
import { useRelay } from '@composables'

import pulseDot from '../util/pulse.vue'
const relay = useRelay()
const angle = computed(() => {
  return ((relay.pulse / 1000) % 60).toFixed(2)
})
</script>

<template lang="pug">
.flex.items-center.px-4
  pulse-dot(:blink="relay.blink")
  .p-4 Server is {{ relay.status }} for {{ relay.age }}
</template>

<style scoped>
</style>