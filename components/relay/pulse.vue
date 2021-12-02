<script setup>
import { useRelay } from '@gun-vue/composables'
const relay = useRelay()
const angle = computed(() => (relay.pulse / 1000) % 360)
</script>

<template lang="pug">
.flex.items-center.p-2
  .p-4.flex.items-center
    la-clock.mr-2
    span {{ relay.pulse }} {{ angle }}
</template>

<style scoped>
</style>