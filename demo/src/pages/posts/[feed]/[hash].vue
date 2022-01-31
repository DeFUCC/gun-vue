<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
})
import { unsafeHash, safeHash } from '@composables';
import { computed } from 'vue'

const unHash = computed(() => {
  return unsafeHash(props.hash)
})

const path = computed(() => {

  if (props.feed.length == 44) {
    let un = unsafeHash(props.feed)
    return un
  } else {
    return props.feed
  }
})

</script>

<template lang='pug'>
.flex.flex-col()
  ui-layer(:open="true" :closeButton="false" @close="$router.push(`/posts/${feed}/`)")
    post-page.w-full(
      :hash="unHash" 
      :tag="path" 
      :key="$route.fullPath"
      @close="$router.push(`/posts/${feed}/`)" 
      @browse="$router.push(`/posts/${hash}/${safeHash($event)}/`)"
      )
</template>



