<script setup>

import { computed } from 'vue'

const routes = {
  "/space/": "Space",
  "/chats/": "Chats",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
};

const icons = {
  'Space': 'ic-round-filter-center-focus'
}


import { useUser, currentRoom, useBackground, useColor } from '@composables';

const { user } = useUser()

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

const color = useColor('light')

</script>

<template lang="pug">
.flex.flex-col
  a.fixed.top-0.left-0.z-1000(href="/#")
    img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
  .min-h-8vh.flex.flex-wrap.items-center.gap-2.p-2.bg-light-900.shadow-xl.z-400.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    .w-4.h-12
    .flex-1
    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      )
    room-icon(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)")

  .flex.flex-wrap.items-center.bg-light-900.p-2.shadow-lg.sticky.top-18.z-2(:style="{ backgroundColor: color.hex(currentRoom.pub) }")
    router-link.link(
      v-for="(link, l) in routes" :key="link" 
      :to="l" ) 
      ph-hands-clapping(v-if="link == 'Space'")
      ph-newspaper(v-if="link == 'Posts'")
      ph-house(v-if="link == 'Rooms'")
      ph-chats-teardrop(v-if="link == 'Chats'")
      ph-users(v-if="link == 'Users'")
      .ml-1 {{ link }}
    
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 rounded-xl cursor-pointer flex items-center;
}
</style>

