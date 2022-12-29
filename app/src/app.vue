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
.app-container
  side-bar.Side
  nav-bar.Top
  .grid.Main.overflow-y-scroll.max-h-full
    router-view(v-slot="{ Component }")
      transition(
        name="fade" 
        mode="out-in")
        keep-alive
          component(:is="Component")
  nav-footer.Footer(v-if="$route.path == '/'")
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
  overscroll-behavior-y: none;
}

body {
  @apply bg-light-500 dark-bg-dark-200;
  overscroll-behavior-y: none;
  touch-action: pan-x pan-y;
}

#app {
  @apply min-h-100vh max-h-100vh flex;
}

.app-container {
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: fit-content(20%) auto auto;
  grid-template-rows: 0.1fr auto auto;
  gap: 0px 0px;
  grid-template-areas:
    "Side Top Top"
    "Side Main Main"
    "Side Footer Footer";
}

.Main {
  grid-area: Main;
}

.Footer {
  grid-area: Footer;
}

.Side {
  grid-area: Side;
}

.Top {
  grid-area: Top;
}
</style>
