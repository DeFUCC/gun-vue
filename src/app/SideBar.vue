<script setup lang="ts">
import { rootRoutes } from '../routes'

</script>

<template lang="pug">
.flex.w-full.items-stretch.justify-stretch.px-1.pt-0.shadow-lg.z-3000.overflow-x-scroll.overflow-y-visible.transition.bg-light-900.dark-bg-dark-200.w-full.h-16.sticky.bottom-0.text-2xl(
style="flex: 0 0 auto"
  )
  router-link(to="/")
    .i-ph-house
  router-link(to="/users/")
    .i-ph-users
  router-link(to="/private")
    .i-ph-chats-light
  slot
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-100 dark-bg-dark-900;
}

a {
  @apply op-80 hover-op-100 flex-1 flex items-center justify-center transition bg-light-900 dark-bg-dark-200
}

.link {
  @apply p-2 text-xl rounded cursor-pointer flex items-center transition;
}

.link:hover {
  @apply bg-light-600 dark-bg-dark-900;
}
</style>
