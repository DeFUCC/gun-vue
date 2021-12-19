<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  tag: { type: String, default: '' }
})
import { unsafeHash } from '@composables';
const unHash = computed(() => {
  return unsafeHash(props.hash)
})
</script>

<template lang='pug'>
post-page(:hash="unHash" :tag="tag" @close="$router.push(`/tags/${tag}/`)")
</template>