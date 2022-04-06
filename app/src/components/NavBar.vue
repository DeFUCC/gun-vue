<script setup>
import { currentRoom, useBackground, useColor } from '@composables';
import { computed } from 'vue'

const routes = {
  '/': "Home",
  "/space/": "Space",
  "/topics/": "Topics",
  "/posts/": "Posts",
  "/users/": "Users",
  "/rooms/": "Rooms",
};


const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

const color = useColor('light')

</script>

<template lang="pug">
.flex.flex-col.z-700
  a.fixed.top-0.left-0.z-1000(href="/#")
    img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
  .flex.items-center.z-40.gap-2.p-2.bg-light-900.shadow-xl.sticky.w-full.bg-cover.top-0(
    :style="{ ...bg }"
    )
    .w-4
    .flex-1
    room-icon(@room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)")
    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/my/chat/${$event}`)"
      )


.flex.flex-wrap.items-center.bg-light-900.p-2.shadow-lg.sticky.top-18.z-30(:style="{ backgroundColor: color.hex(currentRoom.pub) }")
  router-link.link(
    v-for="(link, l) in routes" :key="link" 
    :to="l" ) 
    ph-house-simple(v-if="link == 'Home'")
    ph-hands-clapping(v-if="link == 'Space'")
    ph-newspaper(v-if="link == 'Posts'")
    ph-house(v-if="link == 'Rooms'")
    la-broadcast-tower(v-if="link == 'Topics'")
    ph-users(v-if="link == 'Users'")
    .ml-1.hidden.sm_block.text-sm {{ link }}
  .flex-1
  util-tools
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 text-xl rounded-xl cursor-pointer flex items-center;
}
</style>

