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
.flex.flex-col
  .absolute.top-0.w-full.h-full.bg-dark-200.opacity-50.cursor-pointer.z-11.backdrop-blur-md.backdrop-filter(@click="$router.push(`/feeds/${feed}/`)")
  post-page.top-0.absolute.w-full.z-12(:hash="unHash" :tag="feed" @close="$router.push(`/feeds/${feed}/`)")
</template>