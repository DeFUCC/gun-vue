<script setup>
import { useColor, gunAvatar } from '@composables';
import { computed } from 'vue'
const props = defineProps(
  {
    pub: { type: String, default: '' },
    pos: { type: Object, default: { x: 0, y: 0 } },
    pulse: { type: Number, default: 0 },
    blink: { type: Boolean, default: false }
  })
const age = computed(() => Date.now() - Number(props.pulse))

const TIMEOUT = 10000

const colorDeep = useColor()
const color = computed(() => colorDeep.hex(props.pub))
</script>

<template lang='pug'>
g.guest(
  :opacity="age > TIMEOUT ? 0.1 : 1"
)
  circle.transition.duration-1000.ease-out(
    style="filter:url(#shadowButton)"
    :r="26"
    :fill="color"
    stroke-width="8"
    stroke-opacity="0.5"
    :stroke="blink ? color : 'transparent'"
  )
  image(:xlink:href="gunAvatar(pub, 100)" x="-25" y="-25" height="50" width="50" clip-path="url(#mask)")
</template>