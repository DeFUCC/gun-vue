<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed } from "vue";
import { currentRoom, useUser, rootRoom, useBackground, setPeer, relay } from "#composables";

import config from '../gun.config.json'

import NavBar from './app/NavBar.vue'
import SideBar from './app/SideBar.vue'
import NavFooter from './app/NavFooter.vue'

const router = useRouter()
const route = useRoute();
watchEffect(() => {
  if (route.query?.room) {
    currentRoom.pub = String(route.query.room)
  }
});

watch(() => route.fullPath, () => {
  let rel = route.query?.relay
  if ((rel && rel != relay.peer)) {
    setPeer(String(rel))
  }
  // if (!rel && relay.peer != config.relay) {
  //   setPeer(String(config.relay))
  // }
}, { immediate: true })

watch(() => relay.peer, peer => {
  if (peer == config.relay) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { relay: peer } })
  }
})

watch(() => currentRoom.pub, (pub) => {
  if (pub == rootRoom.pub) {
    router.push({ path: route.path, query: {} })
  } else {
    router.push({ path: route.path, query: { room: pub } })
  }
})

router.beforeEach((to, from) => {
  const { user } = useUser()

  if (to.meta.requiresAuth && !user.pub) {
    return {
      path: '/auth/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }

  if (!currentRoom.isRoot && !to.query?.room) {
    return { ...to, query: { ...to.query, room: currentRoom.pub, } }
  }

  if (relay.peer != config.relay && !to.query?.relay) {
    return { ...to, query: { ...to.query, relay: relay.peer } }
  }

  return true
});




const bg = computed(() => useBackground({ pub: currentRoom.pub, size: 1200, light: 0.8, overlay: 0.5 }))



</script>

<template lang="pug">
.app-container
  side-bar.Side
  nav-bar.Top
  .grid.Main.overflow-y-scroll.max-h-full
    router-view(v-slot="{ Component }")
      transition(name="fade", mode="out-in")
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
  @apply bg-light-500 dark-bg-dark-200 dark-text-light-200;
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
  grid-template-rows: 0.1fr 10fr auto;
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
