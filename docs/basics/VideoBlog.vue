<script setup>
import { data } from './video.data'
</script>

<template lang='pug'>
.flex.flex-col.gap-12.my-8
  .px-4.pb-4.flex.flex-col.gap-4.bg-light-500.bg-opacity-40.dark-bg-opacity-20.dark-bg-dark-100.rounded.border-1.border-transparent.hover-border-current(v-for="post in data" :key="post")
    h3.text-xl.font-bold {{ post?.frontmatter?.title }}
    .text-sm.-mt-2.flex.gap-2
      .opacity-60 {{ post?.frontmatter?.date?.slice(0,10) }} 
      .font-bold(v-if="post?.frontmatter?.version") v.{{ post?.frontmatter?.version }}
    YouTube(:src="post?.frontmatter?.youtube")
    .p-0 {{ post?.frontmatter?.description }}
    a.font-bold.rounded-lg(:href="post.url") Read more
</template>