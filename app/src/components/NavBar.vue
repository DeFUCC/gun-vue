<script setup>
import { currentRoom, useBackground, useColor } from '#composables';
import { computed } from 'vue'

import { useRoute } from "vue-router"

import routes from '../pages/routes'

const route = useRoute()
const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

const color = useColor('light')

</script>

<template lang="pug">
.flex.flex-col.z-400#titlebar
  a.fixed.top-0.left-0.z-1000(href="/#")
    img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
  .flex.items-center.z-40.gap-2.p-2.bg-light-900.shadow-xl.sticky.w-full.bg-cover.top-0( 
    data-tauri-drag-region="true"
    :style="{ ...bg }"
    )
    .flex-0.ml-10.flex.flex-wrap.items-center
      .px-2.text-4xl.flex-1.flex.justify-center
        ph-house-simple(v-if="routes[route.path] == 'Home'")
        ph-hands-clapping(v-if="routes[route.path] == 'Space'")
        ph-newspaper(v-if="routes[route.path] == 'Posts'")
        ph-house(v-if="routes[route.path] == 'Rooms'")
        la-broadcast-tower(v-if="routes[route.path] == 'Topics'")
        ph-users(v-if="routes[route.path] == 'Users'")
        ph-books(v-if="routes[route.path] == 'Dictionary'")
        la-sun(v-if="routes[route.path] == 'Gifts'")
        la-toolbox(v-if="routes[route.path] == 'Projects'")
      .p-0.text-lg.flex-auto.text-center {{ routes[route.path] }}
    .flex-auto
    util-tools
    room-button(
      @room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)"
      :key="currentRoom.pub"
      )

    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/my/chat/${$event}`)"
      )



//- .flex.items-center.gap-2.p-2.items-center.bg-light-900.shadow-lg.z-30.overflow-x-scroll.overflow-y-visible(
  :style="{ backgroundColor: color.hex(currentRoom.pub) }" style="flex: 0 0 50px"
  )
  router-link.link(
    v-for="(link, l) in routes" :key="link" 
    :to="l" ) 
    ph-house-simple(v-if="link == 'Home'")
    ph-hands-clapping(v-if="link == 'Space'")
    ph-newspaper(v-if="link == 'Posts'")
    ph-house(v-if="link == 'Rooms'")
    la-broadcast-tower(v-if="link == 'Topics'")
    ph-users(v-if="link == 'Users'")
    ph-books(v-if="link == 'Dictionary'")
    la-sun(v-if="link == 'Gifts'")
    la-toolbox(v-if="link == 'Projects'")
    .ml-2.hidden.sm_block.text-sm {{ link }}
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 text-xl rounded-xl cursor-pointer flex items-center;
}
</style>

