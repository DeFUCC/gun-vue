<script setup lang="ts">
import { selectedUser, useUser, useAvatar } from '../composables';
import { computed } from 'vue'
import { SpaceStatus } from './components';
const props = defineProps(
  {
    pub: { type: String, default: '' },
    status: { type: String, default: '' },
    pos: { type: Object, default: () => ({ x: 0, y: 0 }) },
    mouse: { type: Object, default: () => ({ x: 0, y: 0 }) },
    pulse: { type: Number, default: 0 },
    size: { type: Number, default: 100 }
  })

const { user } = useUser()
defineEmits(['updateStatus'])

const TIMEOUT = 10000

const age = computed(() => Date.now() - Number(props.pulse))

const isOffline = computed(() => age.value > TIMEOUT)


const color = computed(() => 'green')

const { avatar, blink } = useAvatar(() => props.pub, () => props.size)

// const shadow = computed(() => calculateShadow(props.pos, props.mouse))

// var calculateShadow = function (pos, mouse) {
//   const angle = getMouseAngle(mouse, pos);
//   const size = getMouseSize(mouse, pos);
//   var steps = Math.floor(size / 2);
//   var x = 0;
//   var y = 0;
//   var blur = 0.7;
//   var u = 2; // is better than 1
//   const shadows = []
//   for (let i = 0; i < steps; i++) {
//     x += u * Math.cos(angle);
//     y += u * Math.sin(angle);
//     shadows.push({
//       x, y, blur: blur * i
//     })
//   }
//   return shadows;
// };

// var getMouseAngle = function (mouse, pos) {
//   const { x, y } = mouse
//   var cx = pos.x
//   var cy = pos.y
//   var m = (y - cy) / (x - cx);
//   var angle = Math.atan(m);
//   if ((x - cx) > 0) angle += Math.PI;
//   return angle;
// };

// var getMouseSize = function (mouse, pos) {
//   const { x, y } = mouse
//   var cx = pos.x
//   var cy = pos.y
//   var dist = Math.sqrt(Math.pow((x - cx) * 10, 2) + Math.pow((y - cy) * 10, 2));
//   return dist;
// };


</script>

<template lang="pug">
g.guest(
  :opacity="isOffline ? 0.1 : 1"
)
  SpaceStatus.opacity-20.hover-opacity-90.transition.font-mono(
    :content="status"
    @update="$emit('updateStatus', $event)"
    :editable="user.pub == pub"
    :max-row-length="30"
    :line-height="22"
    )
  g.avatar(
    @click='selectedUser.pub = pub'
    )
    circle.transition.duration-1000.ease-out(
      :style="{ filter: `url(#shadowButton)` }"
      :r="26"
      :fill="color"
      stroke-width="8"
      stroke-opacity="0.5"
      :stroke="blink ? color : 'transparent'"
    )

    image(
      :xlink:href="avatar" 
      x="-25" 
      y="-25" 
      height="50" 
      width="50" 
      clip-path="url(#mask)"
      )
</template>