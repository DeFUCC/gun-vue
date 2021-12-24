<script setup>
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash } from '@composables';
</script>

<template lang='pug'>
.flex.flex-col
  post-list(:tag="feed" @close="$router.push('/feeds/')" @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)")
  router-view
</template>

<style scoped>
</style>