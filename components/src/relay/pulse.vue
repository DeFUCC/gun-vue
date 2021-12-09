<script setup>
import { useRelay } from '@composables'

const relay = useRelay()
</script>

<template lang="pug">
.flex.items-center.px-4
  util-pulse(:blink="relay.blink")
  .p-4 Server is {{ relay.status }} for {{ relay.age }}
</template>

<style scoped>
</style>