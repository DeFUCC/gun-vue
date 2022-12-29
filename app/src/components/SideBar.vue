<script setup>
import routes from '../pages/routes'
</script>

<template lang="pug">
.flex.flex-col.gap-1.px-1.pt-18.shadow-lg.z-30.overflow-x-scroll.overflow-y-visible.transition.bg-light-900.min-w-12(
style="flex: 0 0 auto"
  )
  router-link.flex.items-center.px-3.py-3.link(
    v-for="(link, l) in routes" 
    :key="link" 
    :to="l" ) 
    .i-ph-house-simple(v-if="link == 'Home'")
    .i-ph-hands-clapping(v-if="link == 'Space'")
    .i-ph-newspaper(v-if="link == 'Posts'")
    .i-ph-house(v-if="link == 'Hubs'")
    .i-la-broadcast-tower(v-if="link == 'Topics'")
    .i-ph-users(v-if="link == 'Users'")
    .i-ph-books(v-if="link == 'Dictionary'")
    .i-la-sun(v-if="link == 'Gifts'")
    .i-la-toolbox(v-if="link == 'Projects'")

    .ml-2.hidden.transition.sm-block.text-sm {{ link }}
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-light-300;
}

.link {
  @apply p-2 text-xl rounded-xl cursor-pointer flex items-center transition;
}

.link:hover {
  @apply bg-light-600;
}
</style>
