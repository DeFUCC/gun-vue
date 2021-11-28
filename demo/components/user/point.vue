<script setup>
import { userAvatar } from '@gun-vue/components'

const props = defineProps({
  pub: String,
  pulse: Number,
  x: Number,
  y: Number,
})

const emit = defineEmits(['remove'])

import Ola from 'ola'

const pos = Ola({ x: props.x, y: props.y, pulse: props.pulse }, 1000);
const player = reactive({
  x: pos.x,
  y: pos.y,
  size: Date.now() - pos.pulse
})

watchEffect(() => {
  pos.set({ x: props.x, y: props.y })
})

setInterval(() => {
  if (pos.x != props.x || pos.y != props.y) {
    player.x = pos.x
    player.y = pos.y
  }
  pos.pulse = props.pulse
  player.size = (150 / (Date.now() / 10000 - pos.pulse / 10000)).toFixed()
  if (player.size < 30) { emit('remove') }
}, 10);

</script>

<template lang='pug'>
.m-1.flex.absolute.pointer-events-none.opacity-80(:style="{ transform: 'translate(-50%,-50%)', left: player.x * 100 + '%', top: player.y * 100 + '%' }")
  .w-40px.transition-all.duration-100.ease(:style="{ transform: `scale(${player.size / 500})` }" v-if="player.size > 100")
    user-avatar.rounded-full(:pub="pub" :size="100")
</template>