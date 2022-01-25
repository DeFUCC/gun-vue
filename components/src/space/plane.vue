<script setup>
import { useSpace, useUser, useColor } from '@composables'
import { ref, watchEffect } from 'vue'


const props = defineProps({
  pad: { type: Number, default: 50 },
  name: { type: String, default: 'public' }
})
defineEmits(['user'])

const { user } = useUser()

const colorDeep = useColor('deep')

const { space, plane, width, height, guests, area, join } = useSpace({
  TIMEOUT: 10000,
  spaceName: props.name
})

const selected = ref();

const enter = ref(false)

</script>

<template lang='pug'>
.flex.flex-col.items-center.relative

  ui-layer(:open="!!selected" @close="selected = null" :offset="'20vh'")
    account-home(:pub="selected")

  ui-layer(:open="!space.joined && user.is" :back="false" :offset="'20vh'")
    .text-2xl.p-8.top-8vh.cursor-pointer.bg-light-700(v-if="user.is" @click="join()") Click here to join the space

  ui-layer(:open="enter && !user.is" @close="enter = false" :offset="'20vh'")
    user-home(@browse="$router.push(`/users/${$event}`)" @close="enter = false")


  svg.h-80vh.w-98vw(
    ref="plane"
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
    g.pointer
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
    g.arrows
      space-arrow(
        v-for="(link, key) in space.links"
        :link="link" 
        :key="key")

    g.guests
      space-guest.cursor-pointer.transition-all.ease-out.duration-600(
        v-for="guest in guests" :key="guest" 
        v-bind="guest"
        @click="selected = guest.pub"
        :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
      )
        
</template>