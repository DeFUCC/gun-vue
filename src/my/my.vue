<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang="pug">
.flex.items-center.relative.flex-col.w-full
  .flex.flex-wrap.bg-light-800.w-full.dark-bg-dark-500
    router-link.link(to="/my/") Home
    router-link.link(to="/my/profile/") Profile
    router-link.link(to="/my/chat/") Chat
    router-link.link(to="/my/mates/") Mates
    router-link.link(to="/my/wallets/") Wallets
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component(:is="Component")
</template> 

<style lang="postcss" scoped>
.link {
  @apply bg-light-900 p-2 transition dark-bg-dark-200
}

.link:hover {
  @apply bg-light-400 dark-bg-dark-600
}

.link.router-link-exact-active {
  @apply font-bold bg-light-400 dark-bg-dark-900
}
</style>