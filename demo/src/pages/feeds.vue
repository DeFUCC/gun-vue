<script setup>
import { useFeeds } from '@composables'
const { tags } = useFeeds()
</script>

<template lang='pug'>
.flex.flex-col
  tag-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push($event)")
  router-view
</template>