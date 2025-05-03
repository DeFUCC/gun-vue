<script setup lang="ts">
import { activeFile, selectedUser, useRooms, useUser } from '#composables';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { UiLayer, AuthCredentials, AuthLogin, UserPanel, UserProfile, UserRooms, MessageList, FileList, } from '../components'
import { useStorage } from '@vueuse/core'
import RoomCard from '../room/RoomCard.vue';
import RoomButton from '../room/RoomButton.vue';
import FileShare from '../files/FileShare.vue';
import FileInfo from '../files/FileInfo.vue';

const emit = defineEmits(['room', 'close', 'chat', 'browse'])

const { user } = useUser()

function isSafe() {
  user.db.get('safe').get('saved').put(true)
}

const safe = ref(false)

let sub

watch(() => user.is, () => {
  if (sub) sub.off()
  user.db.get('safe').get('saved').on((s, _k, _, ev) => {
    sub = ev
    safe.value = s
  })
}, { immediate: true })

onBeforeUnmount(() => {
  sub?.off()
})

const showChats = useStorage('showChats', true)
const showRooms = useStorage('showRooms', true)

const starredRooms = computed(() => Object.entries(useRooms(user.pub)).filter(([k, v]) => v[user.pub]).map((([k]) => k)))

</script>

<template lang="pug">
.flex.flex-col.items-center.w-full.justify-stretch


  auth-login(v-if="!user.is")

  .flex.flex-wrap.w-full.gap-2.p-0(v-else)
    user-panel.z-1000(
      @browse="$emit('browse', $event); $emit('close')"
      )

    .flex.flex-col.items-start.bg-light-900.dark-bg-dark-500.p-2.rounded-xl.max-h-40vh.overflow-y-scroll.z-100(style="flex: 1 1 300px")
      user-profile
        button.button(
          @click="selectedUser.pub = user.pub"
          )  Public profile


    .flex.flex-col.items-stretch.bg-light-900.dark-bg-dark-500.p-2.rounded-xl.max-h-40vh.overflow-y-scroll(style="flex: 1 1 300px")
      button.z-100.bg-light-400.dark-bg-dark-700.rounded-xl.sticky.top-0.items-center.w-full.flex.p-2(@click="showChats = !showChats") 
        .font-bold.text-lg Messages
        .flex-1
        .i-la-angle-down(v-if="showChats")
        .i-la-angle-up(v-else)

      MessageList(@chat="$emit('chat', $event)" v-if="showChats")

    .flex.flex-wrap.items-stretch.bg-light-900.dark-bg-dark-500.p-2.rounded-xl.max-w-600px.max-h-40vh.overflow-y-scroll(style="flex: 1 1 300px" )
      FileInfo( :file="activeFile" v-if="activeFile" @close="activeFile = null")
      FileList.w-full(@file="activeFile = $event" v-else)
        FileShare

    .flex.flex-col.items-stretch.bg-light-900.dark-bg-dark-500.p-2.rounded-xl(style="flex: 1 1 200px")
      UserRooms(@browse="$emit('room', $event)")

      button.items-center.w-full.flex.px-2.pb-2(@click="showRooms = !showRooms") 
        .font-bold.text-lg Starred rooms
        .flex-1
        .i-la-angle-down(v-if="showRooms")
        .i-la-angle-up(v-else)
      transition(
        name="fade" 
        mode="out-in")
        .flex.flex-col.gap-4( v-if="showRooms" :key="user.pub")
          RoomButton(
            v-for="(r) in starredRooms"
            :key="r"
            :pub="r"
            @browse="$emit('room', r)"
            :panel="false"
            )
</template>