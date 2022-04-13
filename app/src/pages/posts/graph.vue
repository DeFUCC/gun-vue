<script setup>
import { safeHash, currentRoom } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col.p-2.absolute.z-100
  post-graph(@post="$router.push(`/posts/${safeHash($event)}`)")
</template>