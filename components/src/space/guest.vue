<script setup>
import { color, gunAvatar } from "@composables";
const props = defineProps(
  {
    pub: { type: String, default: '' },
    pos: { type: Object, default: { x: 0, y: 0 } },
    pulse: { type: Number, default: 0 },
    blink: { type: Boolean, default: false }
  })
const age = computed(() => Date.now() - Number(props.pulse))
</script>

<template lang='pug'>
g.guest(
  :opacity="age > 5000 ? 0.1 : 1"
)
  circle.transition-all.duration-1000.ease-out(
    style="filter:url(#shadowButton)"
    :r="26"
    :fill="color.deep.hex(pub)"
    stroke-width="8"
    stroke-opacity="0.5"
    :stroke="blink ? color.deep.hex(pub) : 'transparent'"
  )
  image(:xlink:href="gunAvatar(pub, 100)" x="-25" y="-25" height="50" width="50" clip-path="url(#mask)")
</template>