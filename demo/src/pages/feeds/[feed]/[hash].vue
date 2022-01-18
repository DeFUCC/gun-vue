<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
})
import { unsafeHash } from '@composables';
import { computed } from 'vue'

const unHash = computed(() => {
  return unsafeHash(props.hash)
})

</script>

<template lang='pug'>
.flex.flex-col
  ui-layer(:open="true" :closeButton="false" @close="$router.push(`/feeds/${feed}/`)")
    post-page.w-full(:hash="unHash" :tag="feed" @close="$router.push(`/feeds/${feed}/`)")
</template>



