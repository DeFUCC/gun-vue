<script setup>
import { routes } from '../../pages/routes'
</script>

<template lang="pug">
.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md.z-400.sticky.w-full.pl-24
  router-link.absolute.top-0.left-0(to="/")
    img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
  router-link.p-2.rounded-xl.cursor-pointer(v-for="(link,l) in routes" :key="link" 
  :to="l" 
  :class="{ active: $route.path.includes(l) }") {{ link }}
  .flex-1
  user-icon
  util-share(:key="$route")

</template>

<style scoped>
.active {
  @apply bg-light-300;
}
</style>

