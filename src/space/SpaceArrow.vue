<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'

const emit = defineEmits(['user'])

const props = defineProps({
  link: { type: Object, default: () => ({}) },
  head: { type: Number, default: 6 },
  randomness: { type: Number, default: 0.1 }
})

</script>

<template lang="pug">
g.arrow(ref="handle")
  line(
    :x1="link.arrow.sx"
    :y1="link.arrow.sy"
    :x2="link.arrow.c1x"
    :y2="link.arrow.c1y"
    stroke="green"
    stroke-width="1"
    )

  path(
    :d="`M ${link.arrow.sx} ${link.arrow.sy} C ${link.arrow.c1x} ${link.arrow.c1y}, ${link.arrow.c2x} ${link.arrow.c2y}, ${link.arrow.ex} ${link.arrow.ey}`"
    stroke="green"
    stroke-width="2"
    fill="none"
    stroke-linecap="round"
    )
  polygon(
    :points="`0,${-head} ${head * 2},0, 0,${head}`"
    :transform="`translate(${link.arrow.ex}, ${link.arrow.ey}) rotate(${link.arrow.ae})`"
    fill="green"
    )
  g.handle
    circle.cursor-pointer(
      :cx="link.arrow.c1x"
      :cy="link.arrow.c1y"
      stroke-width="2"
      :r="18"
      stroke="green"
      fill="green"
      @click.prevent.stop="$emit('user', link.mate)"
      )
    text.text-2xl.pointer-events-none(
      :transform="`translate(${link.arrow.c1x}, ${link.arrow.c1y}) rotate(${0})`"
      ) {{ link.emoji }}
</template>

<style lang="postcss" scoped>
.arrow {
  opacity: 0.5;
  transition: all 200ms ease-in;
}

.arrow:hover {
  opacity: 1;
}
</style>