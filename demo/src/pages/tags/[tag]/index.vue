<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
import { safeHash } from '@composables';
</script>

<template lang='pug'>
.flex.flex-col
  post-list(:tag="tag" @close="$router.push('/tags/')" @browse="$router.push(`/tags/${tag}/${safeHash($event)}`)")
  router-view
</template>

<style scoped>
</style>