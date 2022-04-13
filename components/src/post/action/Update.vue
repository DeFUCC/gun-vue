<script setup>
import { usePostTimestamp } from '@composables'

const props = defineProps({
  tag: { type: String, default: 'posts' },
  hash: { type: String, default: '' }
})

const { timestamp, msTime, refresh } = usePostTimestamp(props)

</script>

<template lang='pug'>
button.m-1.button.items-center(@click.stop.prevent="refresh()")
  mdi-watering-can-outline
  .num.p-0.ml-1.text-sm {{ msTime }}

</template>

<style scoped>
.num {
  font-variant-numeric: tabular-nums;
}
</style>