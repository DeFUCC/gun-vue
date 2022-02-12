<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect } from "vue";
import { currentRoom, rootRoom } from "@composables";


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

</script>

<template lang="pug">
nav-bar
.p-0.flex-1
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      component(:is="Component")
.flex.flex-col.items-center.bg-dark-100.p-4.bg-opacity-30.sticky.bottom-0
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
