<script setup>
import { useFeeds } from '@composables'
const { tags } = useFeeds()
</script>

<template lang='pug'>
.flex.flex-col
  feed-list.m-2.p-2.shadow-md.rounded-xl(@tag="$router.push($event)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>