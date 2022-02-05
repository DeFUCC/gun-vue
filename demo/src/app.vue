<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect } from "vue";
import { useRoom, rootRoom } from "@composables";
const { room } = useRoom()

const router = useRouter()
const route = useRoute();
watchEffect(() => {
  if (route.query?.room) {
    room.pub = route.query.room
  }
});

watch(() => room.pub, (pub) => {
  if (pub == rootRoom) {
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
    transition(name="fade")
      component(:is="Component")
.flex.flex-col.items-center.bg-dark-100.p-4.bg-opacity-30
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
