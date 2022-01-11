<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
})
import { color } from '@composables';
import { unsafeHash } from '@composables';
import { computed } from 'vue'

const unHash = computed(() => {
  return unsafeHash(props.hash)
})

</script>

<template lang='pug'>
.flex.flex-col
  ui-layer(:open="true" @close="$router.push(`/feeds/${feed}/`)")
    post-page(:hash="unHash" :tag="feed" @close="$router.push(`/feeds/${feed}/`)")
</template>



