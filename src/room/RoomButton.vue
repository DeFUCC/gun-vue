<script setup>
import { useRoom, useColor, currentRoom, useBackground, useRoomLogo } from '#composables';
import { ref, computed } from 'vue'
import { UiPanel, RoomPage } from '../components'

defineEmits(['room', 'rooms', 'browse'])

const props = defineProps({
  pub: { type: String, default: () => currentRoom.pub },
  panel: { type: Boolean, default: true }
})

const open = ref(false)

const current = computed(() => useRoom(props.pub))

const bg = computed(() => useBackground({
  pub: props.pub,
  size: 200,
  attachment: 'local'
}))

const { logo } = useRoomLogo(props.pub)

</script>

<template lang="pug">
.px-0.flex.gap-2( )
  button.rounded-xl.flex.items-center.gap-2.hover-contrast-120.flex-auto.bg-dark-400.bg-op-30.backdrop-blur(
    :style="{ ...bg }"
    @click="open = true; $emit('browse', '')"
    )
    img.h-12.rounded-xl(
      v-if="logo" 
      :src="logo"
      )
    .font-bold.ml-1.mr-3(v-if="current?.room?.profile?.name") {{ current?.room.profile.name.substring(0, 15) }}      

</template>
