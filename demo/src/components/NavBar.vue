<script setup>

import { computed } from 'vue'

const routes = {
  "/space/": "Space",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
};

import { useUser, currentRoom, useBackground } from '@composables';

const { user } = useUser()

const bg = computed(() => useBackground(currentRoom.pub, 1200))

</script>

<template lang="pug">
a.fixed.top-0.left-0.z-1000(href="/#")
  img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
.min-h-8vh.flex.flex-wrap.items-center.gap-2.p-2.bg-light-900.shadow-md.z-400.sticky.w-full.border-b-2.bg-cover.top-0(
  :style="{ borderColor: user.color, ...bg }"

  )
  .w-24
  .flex-1
  room-icon(@room="$router.push(`/rooms/${$event}`)")
  user-icon(
    :size="40"
    @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
    @post="$router.push(`/posts/${$event}`)"
    )
.flex.flex-wrap.items-center.bg-light-900.p-2.shadow-lg
  router-link.p-2.rounded-xl.cursor-pointer(
    v-for="(link, l) in routes" :key="link" 
    :to="l" 
    ) {{ link }}
    
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}
</style>

