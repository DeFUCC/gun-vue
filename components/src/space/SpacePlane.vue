<script setup>
import { watch } from 'vue'
import { useSpace, useUser, useColor, useRoom, selectedUser } from '#composables'
import { useDrag, usePinch } from '@vueuse/gesture'
import { useDraw } from '#composables'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  pad: { type: Number, default: 50 },
})
const emit = defineEmits(['user', 'enter', 'leave'])

const { user } = useUser()

const colorDeep = useColor('deep')

const { space, plane, position: pos, links, width, height, guests, guestCount, area, join, place } = useSpace({
  TIMEOUT: 10000,
})

watch(guestCount, (next, prev) => {

  if (next > prev) {
    emit('enter')
  } else {
    emit('leave')
  }
})

useDrag(e => {
  if (draw.ing) return
  const [x, y] = e.delta
  pos[0] -= x
  pos[1] -= y
}, {
  domTarget: plane,
})

const paper = ref()

const { drauu, draw, loadCanvas } = useDraw()

onMounted(() => {
  drauu.mount(paper.value, paper.value.parentElement)
  loadCanvas()
})

onBeforeUnmount(() => {
  drauu.unmount()
})

</script>

<template lang='pug'>
.flex.flex-col.items-center.relative
  .text-2xl.p-8.top-15vh.cursor-pointer.absolute.rounded-3xl.shadow-xl.border-4(
    v-if="!space.joined && user.is" 
    @click="join()"
    :style="{ borderColor: user.color }"
    ) Click here to join the space
  button.fixed.bottom-4.right-4.text-xl.z-1000(
    @click="draw.enabled = !draw.enabled"
    :class="{ active: draw.enabled }"
    v-tooltip.top="'Draw on the screen'"
    )
    carbon-pen
  draw-controls.z-2000
  svg.h-full.w-full.z-200.bg-dark-100.bg-opacity-5.cursor-pointer(
    ref="plane"
    @dblclick="place({ x: 0, y: 0 })"
    @click="place({ x: pos[0], y: pos[1] }); !user.is ? user.auth = true : null"
    version="1.1",
    baseProfile="full",
    :viewBox="`${-pad + pos[0] - width / 2} ${-pad + pos[1] - height / 2} ${width + 2 * pad} ${height + 2 * pad}`",
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

    text.text-xs(text-anchor="end" :transform="`translate(${pos[0] + width / 2 - 10} ${pos[1] - height / 2 + 20})`") {{ pos }}

    g.opacity-40(v-for="guest in guests" :key="guest" v-html="guest.draw")
    svg(ref="paper" :class="{ 'pointer-events-none': !draw.enabled, 'touch-none': draw.enabled }")

    rect(
      ref="area"
      :x="pos[0] - width / 2"
      :y="pos[1] - height / 2"
      rx="12"
      :width="width"
      :height="height"
      fill="none"
      stroke="#3333"
      stroke-width="1"
      )
    g.link
      line(
        :x1="pos[0]" :x2="space.my.mouse.x" 
        :y1="pos[1]" :y2="space.my.mouse.y" 
        :stroke="user.color"
        stroke-dasharray="6"
        )
    g.pointer(:transform="`translate(${pos[0]} ${pos[1]})`")
      g.mouse()
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
        @click="selectedUser.pub = guest.pub"
        :style="{ transform: `translate(${guest?.pos?.x}px, ${guest?.pos?.y}px)` }"
        )

</template>