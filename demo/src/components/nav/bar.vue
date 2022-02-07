<script setup>
import { routes } from '../../pages/routes'
import { reactive } from 'vue'

import { useUser, room, gunAvatar } from '@composables';

const { user } = useUser()

</script>

<template lang="pug">
router-link.fixed.top-0.left-0.z-1000(to="/")
  img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
.min-h-8vh.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md.z-400.sticky.w-full.border-b-2.bg-cover(
  :style="{ borderColor: user.color, backgroundImage: `url(${gunAvatar({ pub: room.pub, draw: 'squares', reflect: false, size: 1200 })})` }"

  )
  .w-24
  router-link.p-2.rounded-xl.cursor-pointer(
    v-for="(link, l) in routes" :key="link" 
    :to="l" 
    ) {{ link }}
  .flex-1
  room-icon
  user-icon(@browse="$router.push(`/users/${$event}`)")
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}
</style>

