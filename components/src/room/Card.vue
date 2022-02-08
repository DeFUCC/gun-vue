<script setup>
import { gunAvatar, enterRoom, submitRoom, useUser, useRoomProfile, useBackground } from '@composables'
import { computed } from 'vue';
const props = defineProps({
  pub: { type: String },
  authors: { type: Object, default: {} },

})



const { user } = useUser()

const profile = useRoomProfile(props.pub)


</script>

<template lang='pug'>
.rounded-xl.shadow-md.text-sm.bg-cover.cursor-pointer.hover_shadow-lg.transition.duration-300ms.filter.brightness-95.hover_brightness-100.flex.flex-wrap(
  :style="{ ...useBackground(pub, 400) }"
) 
  .p-4.font-bold.text-xl {{ profile.name }}
  .bg-light-200.bg-opacity-40.backdrop-filter.backdrop-blur-md.flex.flex-wrap.relative.flex.gap-2.items-center(
    style="flex: 1 1 140px"
  )
    slot
</template>