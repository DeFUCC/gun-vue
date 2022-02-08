<script setup>
import { safeHash } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col.p-2
  post-list.w-full(
    tag="posts" 
    :header="false"
    @close="$router.push('/posts/')" 
    @browse="$router.push(`/posts/${safeHash($event)}`)"
    )
</template>