<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { currentRoom, rootRoom, useBackground } from "@composables";


const router = useRouter()
const route = useRoute();
watchEffect(() => {
  if (route.query?.room) {
    currentRoom.pub = route.query.room
  }
});

watch(() => currentRoom.pub, (pub) => {
  if (pub == rootRoom.pub) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { room: pub } })
  }
})

const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))

</script>

<template lang="pug">
.p-0.flex.flex-col(style="flex: 1000 1 100%" :style="{ ...bg }")
  nav-bar
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      component(:is="Component")
.flex.flex-col.items-end.fixed.bottom-2.left-2.z-10000
  util-tools
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
  overscroll-behavior-y: contain;
}
body {
  @apply bg-light-400 dark_bg-dark-100;
  overscroll-behavior-y: contain;
}
#app {
  @apply min-h-100vh flex flex-col;
}
</style>
