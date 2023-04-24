<script setup>
import { useData } from 'vitepress'
import { data } from './video.data'

const { site } = useData()
</script>

<template lang='pug'>
.flex.flex-col.gap-12.my-8
  .px-4.pb-4.flex.flex-col.gap-4.bg-light-500.bg-opacity-40.dark-bg-opacity-20.dark-bg-dark-100.rounded.border-1.border-transparent.hover-border-current(v-for="post in data" :key="post")
    h3.text-xl.font-bold {{ post?.frontmatter?.title }}
    .text-sm.-mt-2.flex.gap-2
      .opacity-60 {{ post?.frontmatter?.date?.slice(0,10) }} 
      .font-bold(v-if="post?.frontmatter?.version") v.{{ post?.frontmatter?.version }}
    iframe.shadow-2xl.rounded-lg(
      v-if="post?.frontmatter?.youtube" 
      loading="lazy"
      style="aspect-ratio: 16 / 9.5;"
      :src="`https://www.youtube.com/embed/${post?.frontmatter?.youtube}`", 
      title="YouTube video player", 
      frameborder="0", 
      allowfullscreen
      )

    .p-0 {{ post?.frontmatter?.description }}
    a.font-bold.rounded-lg(:href="site.base.slice(0,-1) + post.url") Read more
</template>