<script setup>
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash } from '@composables';
</script>

<template lang='pug'>
.flex.flex-col
  .absolute.top-0.w-full.h-full.bg-dark-200.opacity-50.cursor-pointer.z-2.backdrop-blur-md.backdrop-filter(@click="$router.push('/feeds/')")
  post-list.absolute.top-0.w-full.z-6(:tag="feed" @close="$router.push('/feeds/')" @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)")
  router-view
</template>

<style scoped>
</style>