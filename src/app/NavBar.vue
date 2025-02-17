<script setup lang="ts">
import { RoomButton, UiDark, QrShare, GunTools, UserIcon } from '../components'
import { currentRoom, useBackground, useColor } from '#composables';
import { computed } from 'vue'

import pack from '../../app/package.json'

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200 }))

const color = useColor('light')



</script>

<template lang="pug">
.flex.flex-col.z-400.sticky.top-0#titlebars

  router-link.fixed.top-1.left-0.z-1000(
    style="background:none !important"
    to="/")
    img.w-24.transition-all.duration-500.ease-in-out(src="https://gun-vue.js.org/media/gun-vue-logo.svg")
  a.p-0.text-xs.opacity-50.z-2000.left-6.fixed.hover-op-100.top-14(
    href="https://github.com/DeFUCC/gun-vue/releases"
    target="_blank"
    ) v.{{ pack.version }}
  .flex.flex-wrap.items-center.z-40.gap-1.p-2.bg-light-100.dark-bg-dark-200.shadow-xl.w-full.bg-cover( 
    data-tauri-drag-region="true"
    :style="{ ...bg }"
    )
    room-button.ml-16(
      @room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)"
      @browse="$router.push(`/${$event}/`)" 
      :key="currentRoom.pub"
      )
    .flex-auto
    ui-dark
    qr-share
    gun-tools


    user-icon(
      :size="40"
      @user="$router.push(`/users/${$event}`)" @room="$router.push(`/rooms/${$event}`)"
      @post="$router.push(`/posts/${$event}`)"
      @chat="$router.push(`/private/${$event}`)"
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
