<script setup>
import { safeHash } from '#composables';

const props = defineProps({
  path: { type: String }
})

</script>

<template lang='pug'>
project-page(
  :path="path" 
  @gift="$router.push(`/gifts/${safeHash($event)}`)"
)
</template>