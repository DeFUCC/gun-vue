<script setup>
import { watch } from 'vue'
import { useSpace, useUser, useColor, useRoom, selectedUser, draw } from '@composables'

const props = defineProps({
  pad: { type: Number, default: 50 },
})
const emit = defineEmits(['user', 'enter', 'leave'])

const { user } = useUser()

const colorDeep = useColor('deep')

const { space, plane, links, width, height, guests, guestCount, area, join, place } = useSpace({
  TIMEOUT: 10000,
})

watch(guestCount, (next, prev) => {

  if (next > prev) {
    emit('enter')
  } else {
    emit('leave')
  }
})


</script>

<template lang='pug'>
.flex.flex-col.items-center.relative
  .text-2xl.p-8.top-15vh.cursor-pointer.absolute.rounded-3xl.shadow-xl.border-4(
    v-if="!space.joined && user.is" 
    @click="join()"
    :style="{ borderColor: user.color }"
    ) Click here to join the space
  button.fixed.bottom-2.right-2.text-xl.z-1000(
    @click="draw.enabled = !draw.enabled"
    :class="{ active: draw.enabled }"
    v-tooltip.top="'Draw on the screen'"
    )
    carbon-pen
  draw-controls.z-2000
  draw-paper

  svg.max-h-78vh.w-98vw.z-200(
    ref="plane"
    style="cursor:none;"
    @click="place(); !user.is ? user.auth = true : null"
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
      :x="0"
      :y="0"
      rx="12"
      :width="width"
      :height="height"
      fill="none"
      stroke="#3333"
      stroke-width="1"
      )
    g.pointer
      line(
        v-if="space.my?.pos"
        :stroke="user.color"
        stroke-width="2"
        stroke-linecap="round"
        :x1="space.my.mouse.x * width || 0"
        :y1="space.my.mouse.y * height || 0"
        :x2="space.my.pos.x * width || 0"
        :y2="space.my.pos.y * height || 0"
        stroke-dasharray="4 16"
      )
      g.mouse(:transform="`translate(${space.my.mouse.x * width || 0} ${space.my.mouse.y * height || 0})`")
        circle(
          style="filter:url(#shadowButton)"
          :fill="user.color"
          r="8"
        )
    g.arrows
      space-arrow(
        v-for="(link, key) in links"
        :link="link" 
        :key="key"
        @user="selectedUser.pub = $event"
        )

    g.guests
      space-guest.cursor-pointer.transition-all.ease-out.duration-600(
        v-for="guest in guests" :key="guest" 
        v-bind="guest"
        :mouse="space.my.mouse"
        @click="selectedUser.pub = guest.pub"
        :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
      )
  draw-layer.opacity-40(v-for="guest in guests" :key="guest" :content="guest.draw")
</template>