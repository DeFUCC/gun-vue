<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
})
import { color } from '@composables';
import { unsafeHash } from '@composables';
const unHash = computed(() => {
  return unsafeHash(props.hash)
})

</script>

<template lang='pug'>
.flex.flex-col.z-100
  .flex.flex-col.fixed.top-0.w-100vw.h-100vh
    .fixed.z-200.w-100vw.h-100vh.bg-dark-200.opacity-50.cursor-pointer.z-11.backdrop-blur-md.backdrop-filter(@click="$router.push(`/feeds/${feed}/`)")
  .rounded-2xl.flex.flex-col.z-201.fixed.top-50.left-2vw.right-1vw.overflow-y-scroll.overflow-x-hidden.w-96vw.overscroll-y-contain.bottom-6(:style="{ backgroundColor: color.light.hex(unHash) }")
    post-page.w-full.z-12.h-full(:hash="unHash" :tag="feed" @close="$router.push(`/feeds/${feed}/`)")
</template>