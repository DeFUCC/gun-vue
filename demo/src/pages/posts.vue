<script setup>
import { safeHash } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col
  post-list.w-full(
    tag="posts" 
    @close="$router.push('/posts/')" 
    @browse="$router  .push(`/posts/${safeHash($event)}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>