<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { currentRoom, rootRoom, useBackground } from "#composables";


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
.p-0.flex.flex-col.h-100vh(style="flex: 1000 1 100%" )

  nav-bar(v-if="route.path != '/'")
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component.flex-auto.overflow-y-scroll(:is="Component")
nav-footer(v-if="$route.path == '/'")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
  overscroll-behavior-y: none;
}

body {
  @apply bg-light-600 dark_bg-dark-200;
  overscroll-behavior-y: none;
  touch-action: pan-x pan-y;
}

#app {
  @apply min-h-100vh max-h-100vh flex flex-col;
}
</style>
