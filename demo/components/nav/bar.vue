<script setup>
const links = {
  '/': 'Home',
  '/players/': 'Players',
  '/game/': 'Game',
  '/account/': 'Account',
}
</script>

<template lang="pug">
.flex.flex-wrap.items-center
  router-link.p-2(v-for="(link,l) in links" :key="link" 
  :to="l" 
  :class="{ active: $route.path == l }") {{ link }}
  .flex-1
  a.text-2xl.m-2(href="https://github.com/defucc/gun-vue" target="_blank")
    la-github
</template>

<style scoped>
.active {
  font-weight: bold;
}
</style>

