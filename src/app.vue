<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, watchEffect, computed, ref, onMounted } from "vue";
import { currentRoom, useUser, rootRoom, useBackground, setPeer, relay, selectedUser, safeHash, selectedRoom } from "#composables";
import { useStorage } from '@vueuse/core'

import config from '../gun.config.json'

import GunSettings from "./gun/GunSettings.vue";
import UiLayer from "./ui/UiLayer.vue";
import AccountHome from "./account/AccountHome.vue";
import UserHome from "./user/UserHome.vue";
import QrShare from "./qr/QrShare.vue";
import RoomCard from "./room/RoomCard.vue";
import RoomProfile from "./room/RoomProfile.vue";
import AuthLogin from "./auth/AuthLogin.vue";
import AccountBadge from "./account/AccountBadge.vue";
import RoomButton from "./room/RoomButton.vue";
import AuthPanel from "./auth/AuthPanel.vue";

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

const disclaimer = ref(false)

const approval = useStorage('approved-experimental', false)

onMounted(() => {
  setTimeout(() => {
    if (!user?.is && !approval.value) {
      disclaimer.value = true
    }
  }, 100)
})

</script>

<template lang="pug">
.app-container
  .flex.flex-col.z-400#titlebars.Top
    .flex.flex-wrap.items-center.z-40.p-1.gap-2.bg-light-100.dark-bg-dark-200.shadow-xl.w-full.bg-cover( 
      data-tauri-drag-region="true"
      :style="{ ...bg }"
      )
      RoomButton(
        :key="currentRoom.pub"
        :panel="false"
        @click="$router.push('/')"
        )
      .flex-auto
      .justify-center.flex.gap-2
        button.button(@click="openShare = !openShare" :class="{ 'router-link-active': openShare }")
          .i-ion-share-outline
        button.button(@click="showSettings = !showSettings" :class="{ 'router-link-active': showSettings }")
          .i-la-cog
      AccountBadge.cursor-pointer(
        :size="42"
        :showName="true"
        :border="2" 
        :pub="user.pub" 
        :key="user.pub"
        @click="user.auth = true"
        )
  UiLayer(@close="selectedRoom = null" :open="!!selectedRoom")
    RoomProfile(:pub="selectedRoom" :key="selectedRoom" @browse="$router.push($event); selectedRoom = null")

  UiLayer(@close="selectedUser.pub = ''" :open="!!selectedUser.pub")
    AccountHome(:pub="selectedUser.pub" @chat="$router.push(`/messages/${$event}`); selectedUser.pub = null" :key="selectedUser.pub")

  UiLayer(:open="user.auth" @close="user.auth = false")
    AuthLogin(v-if="!user.is")
    AuthPanel(
      v-else
      @home="router.push('/my'); user.auth = false"
      )

  UiLayer(:open="openShare" @close="openShare = false")
    QrShare(:key="route.path" )

  UiLayer(:open="showSettings" @close="showSettings = false")
    GunSettings(:key="route.path")

  UiLayer(:open="disclaimer" @close="disclaimer = false")
    .p-4.flex.flex-col.gap-4.max-w-55ch.max-h-70svh
      img.w-30.absolute(src="/media/gun-vue-logo.svg")
      h1.text-2xl.mt-8.ml-20  Gun-Vue: Demo App

      .text-2xl ⚠️ Experimental Technology Playground

      p Gun-Vue is an experimental demonstration platform under active development. All features are provided "as is" without any warranties. The platform may experience technical issues, functionality changes, or data loss at any time. This demo is intended solely for testing peer-to-peer connectivity and decentralized data sharing concepts.

      p Your account security relies entirely on cryptographic keypairs generated and stored on your device. Gun-Vue developers do not have access to, control over, or ability to recover any keypairs, encrypted data, or user content. By using this demo, you acknowledge and accept full responsibility for managing your keypairs and any associated risks.

      p All content shared through this demo is public, unmoderated, and transmitted directly between connected peers. Gun-Vue developers are not responsible for and have no control over user-generated content, relay server operations, or peer interactions. This software is provided under the MIT license, and its developers explicitly disclaim any liability for how others may use or misuse this technology.

      button.sticky.bottom-4.text-center.button.mt-4(
        data-umami-event="Agree and proceed"
        @click="approval = true; disclaimer = false") 
        .mx-auto Agree and proceed


  .grid.Main
    router-view(v-slot="{ Component }")
      transition(name="fade", mode="out-in")
        keep-alive(:exclude="['space']" :max="10")
          component(:is="Component")

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
