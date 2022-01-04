<script setup>
import { useSpace, user, color } from '@composables'
import { getArrow } from 'curved-arrows'
import { useElementBounding } from '@vueuse/core'

const props = defineProps({
  width: { type: Number, default: 1000 },
  height: { type: Number, default: 1000 },
  pad: { type: Number, default: 50 },
})
defineEmits(['user'])

const { space, area, join } = useSpace()

const selected = ref();
const svg = ref()

const { x, y, top, right, bottom, left, width, height } = useElementBounding(svg)

watchEffect(() => {
  console.log(width.value, height.value)
})

const arrowHeadSize = 8

const arrows = computed(() => {
  const arr = []
  space.links.forEach(link => {
    let arrow = getArrow(
      link.from.x * width.value,
      link.from.y * height.value,
      link.to.x * width.value,
      link.to.y * height.value,
      {
        padEnd: 24,
      }
    )
    const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae] = arrow
    arr.push({ link, sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae })
  })
  return arr
})
</script>

<template lang='pug'>
.flex.flex-col.items-center.relative.h-100vh(ref="svg")
  transition-group(name="fade")
    .absolute.top-0.left-0.bottom-0.right-0.bg-dark-100.bg-opacity-40(key="back" v-if="selected" @click="selected = null") 
    .absolute.bg-light-200.top-4.break-all.p-4.shadow-xl.flex.flex-col.items-center.rounded-2xl(key="modal" v-if="selected")
      account-avatar.cursor-pointer(:pub="selected" :size="160" @click="$emit('user', selected)")
      account-mate(:pub="selected")
      account-profile(:pub="selected")
  svg.h-full(
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
    g.arrows(v-for="a in arrows" :key="a" opacity="0.8")
      path(
        :d="`M ${a.sx} ${a.sy} C ${a.c1x} ${a.c1y}, ${a.c2x} ${a.c2y}, ${a.ex} ${a.ey}`"
        :stroke="color.deep.hex(a.link.user)"
        stroke-width="2"
        fill="none"
        stroke-dasharray="6"
        stroke-linecap="round"
      )
      polygon(
        :points="`0,${-arrowHeadSize} ${arrowHeadSize * 2},0, 0,${arrowHeadSize}`"
        :transform="`translate(${a.ex}, ${a.ey}) rotate(${a.ae})`"
        :fill="color.deep.hex(a.link.user)"
      )
    line(
      v-if="space.my?.pos"
      :stroke="user.color"
      stroke-width="4"
      stroke-linecap="round"
      :x1="space.my.mouse.x * width"
      :y1="space.my.mouse.y * height"
      :x2="space.my.pos.x * width"
      :y2="space.my.pos.y * height"
      stroke-dasharray="1 32"
    )
    g.mouse(:transform="`translate(${space.my.mouse.x * width} ${space.my.mouse.y * height})`")
      circle(
        style="filter:url(#shadowButton)"
        :fill="user.color"
        r="8"
      )
    g.guests
      g.guest.cursor-pointer(v-for="guest in space.guests" :key="guest" )
        space-guest.transition-all.ease-out.duration-600(
          v-bind="guest"
          @click="selected = guest.pub"
          :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
        )
        
</template>