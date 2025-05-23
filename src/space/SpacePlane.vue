<script setup lang="ts">
import { watch } from "vue";
import { useDrag, usePinch, useWheel } from "@vueuse/gesture";
import {
  useDraw,
  useSpace,
  useUser,
  useRoom,
  selectedUser,
  safeHash,
} from "../composables";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from "vue";
import { useDebounceFn, useThrottleFn } from "@vueuse/core";
import { SpaceGuest, UiLayer, AccountHome, SpaceArrow } from "../components";

const props = defineProps({
  pad: { type: Number, default: 50 },
  coord: { type: String, default: "" },
});
const emit = defineEmits(["user", "enter", "leave", "chat", "post", "update:coord"]);

const { user } = useUser();

const {
  space,
  plane,
  pos,
  zoom,
  links,
  width,
  height,
  guests,
  guestCount,
  area,
  join,
  place,
  setStatus,
} = useSpace({
  TIMEOUT: 10000,
});

watch(guestCount, (next, prev) => {
  if (next > prev) {
    emit("enter");
  } else {
    emit("leave");
  }
});

const debouncedCoord = useDebounceFn((pos) => {
  place({
    x: pos[0],
    y: pos[1],
  });
  emit("update:coord", `${pos[0]},${pos[1]}`);
}, 200);

useDrag(
  (e) => {
    if (!(e.delta[0] && e.delta[1])) return;
    if (draw.ing) return;
    const [x, y] = e.delta;
    pos[0] -= x;
    pos[1] -= y;
    debouncedCoord(pos);
  },
  {
    domTarget: plane,
  }
);

// useWheel(e => {
//   console.log(zoom.value += e.direction[1] / 100)
// }, { domTarget: plane })

const paper = ref();

const { drauu, draw, loadCanvas } = useDraw();

onMounted(() => {
  drauu.mount(paper.value, paper.value.parentElement);
  loadCanvas();
});

onActivated(() => {
  console.log("activated");
});

onDeactivated(() => {
  console.log("deactivated");
});

onBeforeUnmount(() => {
  drauu.unmount();
});
</script>

<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.flex.flex-col.items-center

  .text-2xl.p-8.top-15vh.cursor-pointer.absolute.rounded-3xl.shadow-xl.border-4(v-if='!space.joined && user.is', :style='{ borderColor: user.color }', @click='join();')
    | Click anywhere to join the
    | space

  space-draw.z-500

  svg.h-full.w-full.z-200.bg-dark-100.bg-opacity-5.touch-none.cursor-grab.active-cursor-grabbing(ref='plane', 
  xmlns='http://www.w3.org/2000/svg', 
  version='1.1', 
  baseProfile='full', 
  font-family='Commissioner , sans-serif', 
  text-anchor='middle', 
  dominant-baseline='middle', 
  :viewBox="`${-pad + pos[0] - Number(width) / 2} ${-pad + pos[1] - Number(height) / 2} ${Number(width) * Number(zoom) + 2 * pad} ${Number(height) * Number(zoom) + 2 * pad}`",
  @click=" !user.is ? user.auth = true : null;")

    defs
      filter#shadowButton(x='-50%', height='200%', width='300%')
        feDropShadow(dx='0', dy='3', stdDeviation='3', flood-color='#2225')
      clipPath#mask(
        clipPathUnits='objectBoundingBox')
        circle(r='.5', cx='.5', cy='.5')

    text.text-xs(
      text-anchor='end', 
      fill="currentColor"
      :transform="`translate(${pos[0] + Number(width) / 2 - 10} ${pos[1] - Number(height) / 2 + 20})`"
      ) {{ pos }}

    g.opacity-90(
      v-for="guest in guests", :key="guest.draw", v-html="guest.draw")

    svg.opacity-70(
      ref="paper", 
      :x="pos[0] - Number(width) / 2 - pad", 
      :y="pos[1] - Number(height) / 2 - pad", 
      :viewBox="`${-pad + pos[0] - Number(width) / 2} ${-pad + pos[1] - Number(height) / 2} ${Number(width) + 2 * pad} ${Number(height) + 2 * pad}`", 
      :class="{ 'pointer-events-none': !draw.enabled, 'touch-none': draw.enabled }")

    rect(ref='area', 
    :x="pos[0] - Number(width) / 2", 
    :y="pos[1] - Number(height) / 2", 
    rx='12', 
    :width="Number(width)", 
    :height="Number(height)", 
    fill='none', stroke='#3333', stroke-width='1')

    g.link
      line(
      :x1="pos[0]"
      :x2="space.my.mouse.x",
      :y1="pos[1]",
      :y2="space.my.mouse.y", 
      :stroke="user.color", 
      stroke-dasharray="6")

    g.pointer(:transform="`translate(${pos[0]} ${pos[1]})`")
      g.mouse
        circle(style='filter:url(#shadowButton)', :fill="user.color", r='8')

    g.arrows
      space-arrow(v-for="(link, key) in links", :key="key", :link="link", @user="selectedUser.pub = $event")

    g.guests
      space-guest.cursor-pointer.transition-all.ease-out.duration-600(
        v-for='guest in guests', 
        :key="guest?.pub", 
        v-bind="guest", 
        :style="{ transform: `translate(${guest?.pos?.x}px, ${guest?.pos?.y}px)` }", 
        @updateStatus="setStatus($event)"
        )

</template>
