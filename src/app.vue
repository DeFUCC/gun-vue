<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed, ref } from "vue";
import { currentRoom, useUser, rootRoom, useBackground, setPeer, relay } from "#composables";

import config from '../gun.config.json'
import GunSettings from "./gun/GunSettings.vue";
import UiLayer from "./ui/UiLayer.vue";


const router = useRouter()
const route = useRoute();


const { user } = useUser()

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



const openShare = ref(false)

const showSettings = ref(false)


</script>

<template lang="pug">
.app-container

  .flex.flex-col.z-400#titlebars.Top
    .flex.flex-wrap.items-center.z-40.p-1.gap-2.bg-light-100.dark-bg-dark-200.shadow-xl.w-full.bg-cover( 
      data-tauri-drag-region="true"
      :style="{ ...bg }"
      )
      room-button(
        @room="$router.push(`/rooms/${$event}`)" @rooms="$router.push(`/rooms/`)"
        @browse="$router.push(`/${$event}/`)" 
        :key="currentRoom.pub"
        :panel="false"
        )
      .flex-auto
      .justify-center.flex.gap-2
        button.button(@click="openShare = !openShare" :class="{ 'router-link-active': openShare }")
          .i-ion-share-outline
        button.button(@click="showSettings = !showSettings" :class="{ 'router-link-active': showSettings }")
          .i-la-cog
      account-badge.cursor-pointer(
        :size="42"
        :showName="true"
        :border="2" 
        :pub="user.pub" 
        :key="user.pub"
        @click="$router.push('/user/')"
        )

  UiLayer(:open="openShare" @close="openShare = false")
    qr-share(:key="route.path" )

  .grid.Main
    router-view(v-slot="{ Component }")
      transition(name="fade", mode="out-in")
        keep-alive(:exclude="['space']" :max="10")
          component(:is="Component")

  UiLayer(:open="showSettings" @close="showSettings = false")
    GunSettings(:key="route.path")

</template>


<style lang="postcss">
.app-container {
  display: grid;
  width: 100%;
  max-height: 100svh;
  overflow: hidden;
  overscroll-behavior-y: none;
  grid-template-columns: fit-content(20%) auto auto;
  grid-template-rows: 0.1fr 10fr auto;
  gap: 0px 0px;
  grid-template-areas:
    "Top Top Top"
    "Main Main Main"
}

/* Add thin scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.Main {
  grid-area: Main;
  overflow-y: auto;
  overscroll-behavior-y: none;
  scrollbar-width: thin;
  /* For Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  /* For Firefox */
}

.Footer {
  grid-area: Footer;
}

.Bottom {
  grid-area: Bottom;
}

.Top {
  grid-area: Top;
}

/* .router-link-active {
  @apply bg-light-100 dark-bg-dark-900;
} */

.Bottom a {
  @apply op-80 hover-op-100 flex-1 flex flex-col items-center justify-center p-4 text-xl rounded cursor-pointer transition gap-1
}

.Bottom a span {
  @apply text-xs op-60 transition;
}

.Bottom a:hover span {
  @apply op-100;
}


.Bottom a:hover {
  @apply bg-light-600 dark-bg-dark-900;
}
</style>
