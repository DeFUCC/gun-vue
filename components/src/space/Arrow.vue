<script setup>
import { ref, watchEffect } from 'vue'
import { useColor } from '@composables'
import { useDraggable } from '@vueuse/core'

const props = defineProps({
  link: Object,
  head: { type: Number, default: 6 },
  randomness: { type: Number, default: 0.1 }
})

const colorDeep = useColor('deep')
</script>

<template lang='pug'>
g.arrow(opacity="0.5" ref="handle")
  line(
    :x1="link.arrow.sx"
    :y1="link.arrow.sy"
    :x2="link.arrow.c1x"
    :y2="link.arrow.c1y"
    :stroke="colorDeep.hex(link.mate)"
    stroke-width="1"
  )

  path(
    :d="`M ${link.arrow.sx} ${link.arrow.sy} C ${link.arrow.c1x} ${link.arrow.c1y}, ${link.arrow.c2x} ${link.arrow.c2y}, ${link.arrow.ex} ${link.arrow.ey}`"
    :stroke="colorDeep.hex(link.user)"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
  )
  polygon(
    :points="`0,${-head} ${head * 2},0, 0,${head}`"
    :transform="`translate(${link.arrow.ex}, ${link.arrow.ey}) rotate(${link.arrow.ae})`"
    :fill="colorDeep.hex(link.user)"
  )
  g.handle
    circle.cursor-pointer(
      :cx="link.arrow.c1x"
      :cy="link.arrow.c1y"
      :r="18"

      :fill="colorDeep.hex(link.mate)"
    )
    text.text-2xl.pointer-events-none(
      :transform="`translate(${link.arrow.c1x}, ${link.arrow.c1y}) rotate(${0})`"
    ) {{ link.emoji }}
</template>