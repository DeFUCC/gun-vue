<script setup>
import { useRelay } from '@gun-vue/composables'
const relay = useRelay()
const angle = computed(() => {
  return ((relay.pulse / 1000) % 60).toFixed(2)
})
</script>

<template lang="pug">
.flex.items-center
  .p-4.flex.items-center
    la-clock.text-2xl.w-16
    .p-1.m-1.rounded-full.transition-all.duration-300.ease-in-out(
      :style="{ backgroundColor: relay.blink ? 'white' : 'black' }"
    )
    .p-4 Server is {{ relay.status }} for {{ relay.age }}
</template>

<style scoped>
</style>