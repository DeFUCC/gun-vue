<script setup>
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash } from '@composables';
</script>

<template lang='pug'>
.flex.flex-col.fixed.w-full.top-0.h-full
  .absolute.top-0.w-full.h-100vh.bg-dark-200.opacity-50.cursor-pointer.z-2.backdrop-blur-md.backdrop-filter(@click="$router.push('/feeds/')")
  post-list.absolute.top-42.left-1vw.right-1vw.w-96wv.z-6.overflow-x-hidden.fixed.top-16vh.bottom-4(:tag="feed" @close="$router.push('/feeds/')" @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<style scoped>
</style>