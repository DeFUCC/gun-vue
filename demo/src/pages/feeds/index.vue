<script setup>
import { useTags } from '@composables'
const { tags } = useTags()
</script>

<template lang='pug'>
.p-4.text-center.opacity-20.text-xl.text-shadow-md Open one of {{ tags.count }} feeds
  router-view
</template>