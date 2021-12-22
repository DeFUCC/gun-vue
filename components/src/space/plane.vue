<script setup>
import { useSpace, account } from '@composables'

const props = defineProps({
  width: { type: Number, default: 1000 },
  height: { type: Number, default: 1000 },
  pad: { type: Number, default: 50 },
})

const { space, area, join } = useSpace()

</script>

<template lang='pug'>
.flex.flex-col.items-center
  svg(
    style="cursor:none;"
    @click="join()"
    version="1.1",
    baseProfile="full",
    :viewBox="`${-pad} ${-pad} ${width + 2 * pad} ${height + 2 * pad}`",
    xmlns="http://www.w3.org/2000/svg",
    font-family="Commissioner , sans-serif"
    text-anchor="middle",
    dominant-baseline="middle"
  )
    defs
      filter#shadowButton(x="-50%" height="200%" width="300%")
        feDropShadow(dx="0" dy="3" stdDeviation="3" flood-color="#2225")
    defs
      clipPath#mask(clipPathUnits="objectBoundingBox")
        circle(r=".5" cx=".5" cy=".5" )
    rect(
      ref="area"
      :x="pad"
      :y="pad"
      :width="width"
      :height="height"
      fill="none"
      stroke-width="0"
      )
    g.me(:transform="`translate(${space.my.mouse.x * width} ${space.my.mouse.y * height})`")
      circle(
        style="filter:url(#shadowButton)"
        :fill="account.color"
        r="8"
      )
    line(
      v-if="space.my?.pos"
      :stroke="account.color"
      stroke-width="4"
      :x1="space.my.mouse.x * width"
      :y1="space.my.mouse.y * height"
      :x2="space.my.pos.x * width"
      :y2="space.my.pos.y * height"
    )
    g.guests
      g.guest(v-for="guest in space.guests" :key="guest" )
        space-guest.transition-all.ease-out.duration-200(
          :guest="guest"
          :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
        )

        
</template>