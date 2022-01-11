<script setup>
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash } from '@composables';
</script>

<template lang='pug'>
.flex.flex-col.fixed.w-full.top-0.h-full
  ui-layer(:open="true" @close="$router.push('/feeds/')")
    post-list.w-full(:tag="feed" @close="$router.push('/feeds/')" @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<style scoped>
</style>