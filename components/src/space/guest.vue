<script setup>
import { color, gunAvatar } from "@composables";
const props = defineProps({
  guest: { type: Object, default: { pub: '', pos: { x: 0, y: 0 }, pulse: 0, blick: false } }
})
</script>

<template lang='pug'>
g.guest(
  :transform="`translate(${guest?.pos?.x * 1000} ${guest?.pos?.y * 1000})`"
  :data-pulse="guest.pulse"
)

  circle.transition-all.duration-700.ease-out(
    style="filter:url(#shadowButton)"
    :r="26"
    :fill="color.deep.hex(guest.pub)"
    stroke-width="8"
    stroke-opacity="0.5"
    :stroke="guest.blink ? color.deep.hex(guest.pub) : 'transparent'"
  )
  image(:xlink:href="gunAvatar(guest.pub, 100)" x="-25" y="-25" height="50" width="50" clip-path="url(#mask)")
</template>