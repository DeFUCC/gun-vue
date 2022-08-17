<script setup>
import { currentRoom, useBackground, useColor } from '#composables';
import { useRoute } from "vue-router"

import routes from '../pages/routes'

const route = useRoute()

const color = useColor('light')
</script>

<template lang='pug'>
.flex.flex-col.gap-1.px-1.pt-18.shadow-lg.z-30.overflow-x-scroll.overflow-y-visible.transition.bg-light-900.min-w-12(
style="flex: 0 0 auto"
  )
  router-link.flex.items-center.px-3.py-3.link(
    v-for="(link, l) in routes" :key="link" 
    :to="l" ) 
    ph-house-simple(v-if="link == 'Home'")
    ph-hands-clapping(v-if="link == 'Space'")
    ph-newspaper(v-if="link == 'Posts'")
    ph-house(v-if="link == 'Hubs'")
    la-broadcast-tower(v-if="link == 'Topics'")
    ph-users(v-if="link == 'Users'")
    ph-books(v-if="link == 'Dictionary'")
    la-sun(v-if="link == 'Gifts'")
    la-toolbox(v-if="link == 'Projects'")

    .ml-2.hidden.transition.sm_block.text-sm {{ link }}
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 text-xl rounded-xl cursor-pointer flex items-center transition;

  &:hover {
    @apply bg-light-600;
  }
}
</style>
