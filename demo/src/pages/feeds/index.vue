<script setup>
import { safeHash } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col.p-2
  post-list.w-full(
    tag="public" 
    :header="false"
    @close="$router.push('/feeds/')" 
    @browse="$router.push(`/feeds/public/${safeHash($event)}`)"
    )
</template>