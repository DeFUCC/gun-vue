<script setup>
import { useSpace, user, color } from '@composables'

const props = defineProps({
  width: { type: Number, default: 1000 },
  height: { type: Number, default: 1000 },
  pad: { type: Number, default: 50 },
})
defineEmits(['user'])

const { space, area, join } = useSpace()

const selected = ref();
</script>

<template lang='pug'>
.flex.flex-col.items-center.relative
  transition-group(name="fade")
    .absolute.top-0.left-0.bottom-0.right-0.bg-dark-100.bg-opacity-40(key="back" v-if="selected" @click="selected = null") 
    .absolute.bg-light-200.top-4.break-all.p-4.shadow-xl.flex.flex-col.items-center.rounded-2xl(key="modal" v-if="selected")
      account-avatar.cursor-pointer(:pub="selected" :size="160" @click="$emit('user', selected)")
      account-mate(:pub="selected")
      account-profile(:pub="selected")
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
    line(
      v-if="space.my?.pos"
      :stroke="user.color"
      stroke-width="4"
      :x1="space.my.mouse.x * width"
      :y1="space.my.mouse.y * height"
      :x2="space.my.pos.x * width"
      :y2="space.my.pos.y * height"
    )
    g.mouse(:transform="`translate(${space.my.mouse.x * width} ${space.my.mouse.y * height})`")
      circle(
        style="filter:url(#shadowButton)"
        :fill="user.color"
        r="8"
      )
    g.links
      g.link(v-for="link in space.links" :key="link")
        line(
          :stroke="color.deep.hex(link.user)"
          stroke-width="6"
          stroke-opacity="0.4"
          stroke-linecap="round"
          :x1="link.from?.x * width"
          :y1="link.from?.y * height"
          :x2="link.to?.x * width"
          :y2="link.to?.y * height"
        )
    g.guests
      g.guest.cursor-pointer(v-for="guest in space.guests" :key="guest" )
        space-guest.transition-all.ease-out.duration-600(
          v-bind="guest"
          @click="selected = guest.pub"
          :style="{ transform: `translate(${guest?.pos?.x * width}px, ${guest?.pos?.y * height}px)` }"
        )
        
</template>