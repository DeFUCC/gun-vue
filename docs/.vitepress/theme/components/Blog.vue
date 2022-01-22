<script setup>
import { computed } from 'vue'

const props = defineProps({
  posts: { type: Array, default: [] }
});

const sorted = computed(() => {
  return [...props.posts].sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) { return 1 } else { return -1 }
  })
})
</script>

<template lang='pug'>
.my-4.p-4.rounded-3xl.border-1.shadow-lg(v-for="post in sorted" :key="post")
  .flex.items-center.justify-center.p-2.mb-2
    .my-1.mx-0.text-xl.font-bold {{ post.title }}
    .flex-1
    .text-sm {{ new Intl.DateTimeFormat('en-US').format(new Date(post.date)) }}
  .p-2(v-if="post.text" v-html="post.text") 
  GunVue(component="EmbedYoutube" :pr="{ video: post.youtube }")
</template>
