<script setup>

import { unsafeHash, safeHash, isHash } from '@composables';
import { computed } from 'vue'

const props = defineProps({
  hash: { type: String, default: '' },
});

const unHash = computed(() => {
  return unsafeHash(props.hash)
})

const path = computed(() => {
  if (isHash(props.hash)) {
    let un = unsafeHash(props.hash)
    return un
  } else {
    return props.hash
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



