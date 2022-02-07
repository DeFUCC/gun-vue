<script setup>
import { gunAvatar, enterRoom, submitRoom, useUser, useRoomProfile } from '@composables'
import { computed } from 'vue';
const props = defineProps({
  pub: { type: String },
  authors: { type: Object, default: {} }
})

const { user } = useUser()

const profile = useRoomProfile(props.pub)

const bg = computed(() => {
  return { backgroundImage: `url(${gunAvatar({ pub: props.pub, draw: 'squares', reflect: false, size: 600 })})` }
})
</script>

<template lang='pug'>
.rounded-xl.shadow-md.text-sm.bg-cover.cursor-pointer.hover_shadow-lg.transition.duration-300ms.filter.brightness-95.hover_brightness-100.flex.flex-wrap(
  :style="{ ...bg }"
) 
  .p-4.font-bold.text-xl {{ profile.name }}
  .p-4.bg-light-200.bg-opacity-40.backdrop-filter.backdrop-blur-md.flex.flex-wrap.relative.flex.gap-2.items-center(
    style="flex: 1 1 140px"
  )
    button.button(@click.stop.prevent="submitRoom(pub)" v-if="user.pub")
      la-heart-solid(v-if="authors[user.pub]")
      la-heart(v-else)
    transition-group(name="fade")
      account-badge.rounded-full.shadow-md(
        v-for="(status, author) in authors" :key="author"
        :pub="author" :showName="false" v-show="status"
        ) {{ status !== true ? status : '' }}
</template>