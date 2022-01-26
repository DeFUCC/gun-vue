<script setup>
import { ref } from 'vue'
import { gun, ms, refreshPost } from '@composables';

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' }
})

const timestamp = ref(0)

gun
  .get(`#${props.tag}`)
  .get(props.hash)
  .on(function (d, k, g) {
    timestamp.value = g.put['>']
  })
</script>

<template lang='pug'>
button.m-1.button.items-center(@click.stop.prevent="refreshPost(tag, hash)")
  .num.p-0.mr-1.text-sm {{ ms(Date.now() - timestamp) }}
  mdi-watering-can-outline
</template>

<style scoped>
.num {
  font-variant-numeric: tabular-nums;
}
</style>