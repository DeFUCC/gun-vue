<script setup>
import { routes } from '../../pages/routes'

import { useUser } from '@composables';

const { user } = useUser()

const show = reactive({
  share: false
})
</script>

<template lang="pug">
router-link.fixed.top-0.left-0.z-1000(to="/")
  img.w-24.transition-all.duration-500.ease-in-out(src="/gun-vue-logo.svg")
.flex.flex-wrap.items-center.p-2.bg-light-900.shadow-md.z-400.sticky.w-full.pl-24.border-b-2(:style="{ borderColor: user.color }")
  router-link.p-2.rounded-xl.cursor-pointer(v-for="(link,l) in routes" :key="link" 
  :to="l" 
  :class="{ active: $route.path.includes(l) }") {{ link }}
  .flex-1
  ion-share-outline.mr-2(@click="show.share = !show.share")
  ui-modal(:open="show.share" @close="show.share = false")
    util-share
  user-icon
</template>

<style lang="postcss" scoped>
.active {
  @apply bg-light-300;
}
</style>

