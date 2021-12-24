<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
})
import { unsafeHash } from '@composables';
const unHash = computed(() => {
  return unsafeHash(props.hash)
})
</script>

<template lang='pug'>
post-page(:hash="unHash" :tag="feed" @close="$router.push(`/feeds/${feed}/`)")
</template>