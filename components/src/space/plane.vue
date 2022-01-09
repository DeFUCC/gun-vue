<script setup>
import { useSpace, user, color } from '@composables'
import { getArrow } from 'curved-arrows'
import { useElementBounding } from '@vueuse/core'

const props = defineProps({
  pad: { type: Number, default: 50 },
})
defineEmits(['user'])

const TIMEOUT = 30000

const { space, area, join } = useSpace()

const selected = ref();
const plane = ref()

const { width, height } = useElementBounding(plane)

const arrowHeadSize = 6

const arrows = computed(() => {
  const arr = []
  Object.values(space.links).forEach(link => {
    if (link.presence > TIMEOUT) return
    let arrow = getArrow(
      link.from.x * width.value,
      link.from.y * height.value,
      link.to.x * width.value,
      link.to.y * height.value,
      {
        padEnd: 24,
        padStart: 18,
      }
    )
    const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae] = arrow
    arr.push({
      link, sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae,
      d: `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`
    })
  })
  return arr
})
</script>

<template lang='pug'>
.flex.flex-col.items-center.relative.h-100vh(ref="plane")

  ui-modal(:open="!!selected" @close="selected = null")
    account-avatar.cursor-pointer(:pub="selected" :size="160" @click="$emit('user', selected)")
    account-mate(:pub="selected")
    account-profile(:pub="selected")
  ui-modal(:open="!space.joined && user.is" @close="join()")
    .text-2xl.p-4(v-if="user.is") Click here to join the space
  ui-modal(:open="!user.is")
    user-home(@browse="$router.push(`/users/${$event}`)")


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
    g.arrows(v-for="(a,n) in arrows" :key="a" opacity="0.8")
      path(
        :d="a.d"
        :stroke="color.deep.hex(a.link.user)"
        stroke-width="1"
        fill="none"
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
      stroke-width="2"
      stroke-linecap="round"
      :x1="space.my.mouse.x * width"
      :y1="space.my.mouse.y * height"
      :x2="space.my.pos.x * width"
      :y2="space.my.pos.y * height"
      stroke-dasharray="4 16"
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
          v-if="guest.hasPos"
          v-bind="guest"
          @click="selected = guest.pub"
          :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
        )
        
</template>