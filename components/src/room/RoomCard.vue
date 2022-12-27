<script setup>
import {
  useRoom,
  useBackground,
  currentRoom,
  useRoomLogo
} from '#composables'
import {
  computed
} from 'vue';
const props = defineProps({
  pub: {
    type: String,
    default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk'
  },
  authors: {
    type: Object,
    default: () => { }
  },

})

const {
  room
} = useRoom(props.pub)

const bg = computed(() => useBackground({
  pub: props.pub,
  size: 400
}))

const {
  logo
} = useRoomLogo(props.pub)
</script>

<template lang="pug">
.rounded-xl.shadow-md.text-sm.bg-cover.cursor-pointer.hover-shadow-lg.transition.duration-300ms.filter.brightness-95.hover-brightness-100.flex.flex-wrap.overflow-hidden(
  :style="{ ...bg, border: room.pub == currentRoom.pub ? '2px solid currentColor' : '' }"
) 
  .p-4.font-bold.text-xl.flex.flex-wrap.items-center.flex.w-full
    img.h-24.rounded-xl.mr-2(
      v-if="logo" 
      :src="logo"
      )
    .text-lg {{ room.profile.name }}
    .flex-1
    account-avatar.m-2(
      v-for="(enc, host) in room.hosts"
      :key="host" 
      :pub="host" 
      :size="40"
      )
  .bg-light-200.bg-opacity-40.backdrop-filter.backdrop-blur-md.flex.flex-wrap.relative.flex.gap-2.items-center(
    style="flex: 1 1 140px"
  )
    slot
</template>
