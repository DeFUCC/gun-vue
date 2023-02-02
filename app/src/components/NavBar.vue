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
    img.w-24.transition-all.duration-500.ease-in-out(src="/media/gun-vue-logo.svg")
  .flex.items-center.z-40.gap-2.p-2.bg-light-900.shadow-xl.w-full.bg-cover( 
    data-tauri-drag-region="true"
    :style="{ ...bg }"
    )
    room-button(
      @room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)"
      @browse="$router.push(`/${$event}/`)" 
      :key="currentRoom.pub"
      )
    .flex-auto
    util-tools


    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/my/chat/${$event}`)"
      )
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 text-xl rounded-xl cursor-pointer flex items-center;
}
</style>

