<script setup>
import { safeHash } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col
  post-feed-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push(`/feeds/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>