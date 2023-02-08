<script setup lang="ts">
import { watch } from "vue";
import { useDrag, usePinch } from "@vueuse/gesture";
import { useDraw, useSpace, useUser, useColor, useRoom, selectedUser, safeHash } from "../composables";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useDebounceFn, useThrottleFn } from "@vueuse/core";

const props = defineProps({
  pad: {
    type: Number,
    default: 50,
  },
  coord: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["user", "enter", "leave", "chat", "update:coord"]);

const { user } = useUser();

const colorDeep = useColor("deep");

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

const paper = ref();

const { drauu, draw, loadCanvas } = useDraw();

onMounted(() => {
  drauu.mount(paper.value, paper.value.parentElement);
  loadCanvas();
});

onBeforeUnmount(() => {
  drauu.unmount();
});

</script>
<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex flex-col items-center">
    <div class="text-2xl p-8 top-15vh cursor-pointer absolute rounded-3xl shadow-xl border-4"
      v-if="!space.joined && user.is" :style="{ borderColor: user.color }" @click="join();">Click anywhere to join the
      space</div><space-draw class="z-500"></space-draw><svg
      class="h-full w-full z-200 bg-dark-100 bg-opacity-5 cursor-pointer touch-none" ref="plane"
      xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" font-family="Commissioner , sans-serif"
      text-anchor="middle" dominant-baseline="middle"
      :viewBox="`${-pad + pos[0] - width / 2} ${-pad + pos[1] - height / 2} ${width * zoom + 2 * pad} ${height * zoom + 2 * pad}`"
      @click="!user.is ? user.auth = true : null; ">
      <defs>
        <filter id="shadowButton" x="-50%" height="200%" width="300%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2225"></feDropShadow>
        </filter>
      </defs>
      <defs>
        <clipPath id="mask" clipPathUnits="objectBoundingBox">
          <circle r=".5" cx=".5" cy=".5"></circle>
        </clipPath>
      </defs><text class="text-xs" text-anchor="end"
        :transform="`translate(${pos[0] + width / 2 - 10} ${pos[1] - height / 2 + 20})`">{{ pos }}</text>
      <g class="opacity-90" v-for="guest in guests" :key="guest.draw" v-html="guest.draw"></g><svg class="opacity-70"
        ref="paper" :x="pos[0] - width / 2 - pad" :y="pos[1] - height / 2 - pad"
        :viewBox="`${-pad + pos[0] - width / 2} ${-pad + pos[1] - height / 2} ${width + 2 * pad} ${height + 2 * pad}`"
        :class="{ 'pointer-events-none': !draw.enabled, 'touch-none': draw.enabled }"></svg>
      <rect ref="area" :x="pos[0] - width / 2" :y="pos[1] - height / 2" rx="12" :width="width" :height="height"
        fill="none" stroke="#3333" stroke-width="1"></rect>
      <g class="link">
        <line :x1="pos[0]" :x2="space.my.mouse.x" :y1="pos[1]" :y2="space.my.mouse.y" :stroke="user.color"
          stroke-dasharray="6"></line>
      </g>
      <g class="pointer" :transform="`translate(${pos[0]} ${pos[1]})`">
        <g class="mouse">
          <circle style="filter:url(#shadowButton)" :fill="user.color" r="8"></circle>
        </g>
      </g>
      <g class="arrows"><space-arrow v-for="(link, key) in links" :key="key" :link="link"
          @user="selectedUser.pub = $event"></space-arrow></g>
      <g class="guests"><space-guest class="cursor-pointer transition-all ease-out duration-600" v-for="guest in guests"
          :key="guest" v-bind="guest" :style="{ transform: `translate(${guest?.pos?.x}px, ${guest?.pos?.y}px)` }"
          @click="selectedUser.pub = guest.pub"></space-guest></g>
    </svg><ui-layer class="z-4000" :open="!!selectedUser.pub" @close="selectedUser.pub = null"><account-home
        class="max-w-600px" :key="selectedUser.pub" :pub="selectedUser.pub" @user="$emit('user', $event)"
        @post="$emit('post', safeHash($event))" @chat="$emit('chat', selectedUser.pub)"
        @close="selectedUser.pub = null"></account-home></ui-layer>
  </div>
</template>
