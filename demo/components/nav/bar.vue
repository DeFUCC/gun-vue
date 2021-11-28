<script setup>
const links = {
  '/': 'Home',
  '/players/': 'Players',
  '/game/': 'Game',
  '/account/': 'Account',
}
</script>

<template lang="pug">
.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md
  router-link.p-2.rounded-xl(v-for="(link,l) in links" :key="link" 
  :to="l" 
  :class="{ active: $route.path == l }") {{ link }}
  .flex-1
  a.text-2xl.m-2(href="https://github.com/defucc/gun-vue" target="_blank")
    la-github
</template>

<style scoped>
.active {
  @apply bg-light-300;
}
</style>

