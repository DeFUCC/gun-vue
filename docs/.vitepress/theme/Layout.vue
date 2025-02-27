<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template lang="pug">
layout.w-full
  template(#doc-before)
    iframe.shadow-2xl.rounded-lg.w-full(
      v-if="page?.frontmatter?.youtube" 
      loading="lazy"
      style="aspect-ratio: 16 / 9.3;"
      :src="`https://www.youtube.com/embed/${page?.frontmatter?.youtube}`", 
      title="YouTube video player", 
      frameborder="0", 
      allowfullscreen
      )
</template>