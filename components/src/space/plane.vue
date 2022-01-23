<script setup>
import { useSpace, useUser, useColor } from '@composables'
import { getArrow } from 'curved-arrows'
import { useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'

const props = defineProps({
  pad: { type: Number, default: 50 },
})
defineEmits(['user'])

const { user } = useUser()

const colorDeep = useColor('deep')

const TIMEOUT = 30000

const { space, guests, area, join } = useSpace()

const selected = ref();
const plane = ref()
const enter = ref(false)

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
        padStart: 24,
      }
    )
    const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae, as] = arrow
    arr.push({
      emoji: link.emoji,
      link, sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae, as,
      d: `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`
    })
  })
  return arr
})
</script>

<template lang='pug'>
.flex.flex-col.items-center.relative.h-70vh(ref="plane")
  .flex.flex-col.items-center(v-show="enter")

    ui-layer.flex.flex-col.items-center(:open="!!selected" @close="selected = null")
      .p-4.flex.flex-wrap
        //- account-home.min-w-320px(:pub="selected")
        .p-0
          account-avatar.cursor-pointer(:pub="selected" :size="160" @click="$emit('user', selected)")
          account-profile(:pub="selected")
        .p-0
          account-mate(:pub="selected")

          button.button.text-xl(@click="$emit('user', selected)") Go to profile
    ui-layer.flex.flex-col.items-center(:open="!space.joined && user.is" @close="join()")
      .text-2xl.p-4(v-if="user.is") Click here to join the space

    ui-layer.flex.flex-col.items-center(:open="enter && !user.is" @close="enter = false")
      user-home(@browse="$router.push(`/users/${$event}`)" @close="enter = false")


  svg(
    style="cursor:none;"
    @click="join(); enter = true"
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
    g.arrows(v-for="(arrow, n) in arrows" :key="arrow" opacity="0.8")
      path(
        :d="arrow.d"
        :stroke="colorDeep.hex(arrow.link.user)"
        stroke-width="1"
        fill="none"
        stroke-linecap="round"
      )
      polygon(
        :points="`0,${-arrowHeadSize} ${arrowHeadSize * 2},0, 0,${arrowHeadSize}`"
        :transform="`translate(${arrow.ex}, ${arrow.ey}) rotate(${arrow.ae})`"
        :fill="colorDeep.hex(arrow.link.user)"
      )
      text.text-2xl(
        :transform="`translate(${arrow.sx}, ${arrow.sy}) rotate(${0})`"
      ) {{ arrow.emoji }}
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
      g.guest.cursor-pointer(v-for="guest in guests" :key="guest" )
        space-guest.transition-all.ease-out.duration-600(
          v-if="guest.hasPos"
          v-bind="guest"
          @click="selected = guest.pub"
          :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
        )
        
</template>