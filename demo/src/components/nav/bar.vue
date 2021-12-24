<script setup>
import { routes } from '../../pages/routes'
</script>

<template lang="pug">
.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md
  router-link.p-2.rounded-xl.cursor-pointer(v-for="(link,l) in routes" :key="link" 
  :to="l" 
  :class="{ active: $route.path == l }") {{ link }}
  .flex-1
  user-icon
  relay-icon
  util-share(:key="$route")
</template>

<style scoped>
.active {
  @apply bg-light-300;
}
</style>

