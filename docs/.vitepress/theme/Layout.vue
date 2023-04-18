<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template lang="pug">
layout
  template(#doc-before)
    YouTube.mb-12(
      v-if="page?.frontmatter?.youtube" 
      :src="page?.frontmatter?.youtube"
      )
</template>