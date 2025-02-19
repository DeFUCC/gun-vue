<script setup>
import { useRoom, useColor, currentRoom, useBackground, useRoomLogo, favRoom } from '#composables';
import { ref, computed } from 'vue'
import { UiPanel, RoomPage } from '../components'

defineEmits(['room', 'rooms', 'browse'])

const props = defineProps({
  pub: { type: String, default: () => currentRoom.pub },
  panel: { type: Boolean, default: true }
})

const open = ref(false)

const current = computed(() => useRoom(props.pub))

const colorDeep = useColor('deep')

const bg = computed(() => useBackground({
  pub: props.pub,
  size: 200,
  attachment: 'local'
}))

const { logo } = useRoomLogo(props.pub)

</script>

<template lang="pug">
.px-0.flex.gap-2(:style="{ ...bg }" )
  button.rounded-xl.flex.items-center.gap-2.hover-contrast-120.flex-auto.bg-dark-400.bg-op-30.backdrop-blur(
    @click="open = true; $emit('browse', '')"
    )
    img.h-12.rounded-xl(
      v-if="logo" 
      :src="logo"
      )
    .font-bold.ml-1(v-if="current?.room?.profile?.name") {{ current?.room.profile.name.substring(0, 15) }}
  button.button(@click="favRoom(pub)")
    .i-la-star(v-if="!current?.room?.isFavourite")
    .i-la-star-solid(v-else)
  ui-panel.break-all(
    v-if="panel"
    :open="open" 
    :close-button="false" 
    @close="open = false"
    )
    room-page(
      :key="pub" 
      @room="$emit('room', $event)" 
      @rooms="$emit('rooms')"
      @browse="$emit('browse', $event); open = false" 
      )
      

</template>
