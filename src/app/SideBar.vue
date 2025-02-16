<script setup lang="ts">
import { rootRoutes } from '../routes'

</script>

<template lang="pug">
.flex.w-full.items-center.justify-stretch.px-1.pt-0.shadow-lg.z-3000.overflow-x-scroll.overflow-y-visible.transition.bg-light-900.dark-bg-dark-200.w-full.h-20.sticky.bottom-0.text-4xl(
style="flex: 0 0 auto"
  )
  router-link.flex-1.i-ph-house(to="/")
  router-link.flex-1.i-ph-users(to="/users/")
  router-link.flex-1.i-ph-chats-light(to="/private")
  slot
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-dark-900 dark-bg-light-100;
}

a {
  @apply op-80 hover-op-100
}

.link {
  @apply p-2 text-xl rounded cursor-pointer flex items-center transition;
}

.link:hover {
  @apply bg-light-600 dark-bg-dark-900;
}
</style>
