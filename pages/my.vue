<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang="pug">
.flex.items-center.relative.flex-col.w-full
  .flex.flex-wrap.bg-light-800.w-full
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
  @apply bg-light-900 p-2 transition
}

.link:hover {
  @apply bg-light-400
}

.link.router-link-exact-active {
  @apply font-bold bg-light-400
}
</style>