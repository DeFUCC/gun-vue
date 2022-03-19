<script setup>

import { unsafeHash, safeHash } from '@composables';
import { computed } from 'vue'

const props = defineProps({
  hash: { type: String, default: '' },
  feed: { type: String, default: '' }
});


const unHash = computed(() => {
  return unsafeHash(props.feed)
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
  ui-layer(:open="true" :closeButton="false" @close="$router.push(`/posts/`)")
    post-page.w-full(
      :hash="unHash" 
      :tag="path" 
      :key="$route.fullPath"
      @close="$router.push(`/posts/`)" 
      @browse="$router.push(`/posts/${safeHash($event)}/`)"
      )
</template>



