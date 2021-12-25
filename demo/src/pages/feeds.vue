<script setup>
import { useTags } from '@composables'
const { tags } = useTags()
</script>

<template lang='pug'>
.flex.flex-col
  tag-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push($event)")
  router-view
</template>