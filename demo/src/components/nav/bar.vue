<script setup>
import { routes } from '../../pages/routes'
</script>

<template lang="pug">
.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md
  router-link.p-2.rounded-xl.cursor-pointer(v-for="(link,l) in routes" :key="link" 
  :to="l" 
  :class="{ active: $route.path == l }") {{ link }}
  .flex-1
  a.text-2xl.m-2(href="docs/index.html" target="_blank")
    la-book
  a.text-2xl.m-2(href="https://github.com/defucc/gun-vue" target="_blank")
    la-github
</template>

<style scoped>
.active {
  @apply bg-light-300;
}
</style>

