<template>
  <div
    class="circle"
    :style="{ transform: `translate(${circle1.x}px, ${circle1.y}px)` }"
  ></div>
  <div
    class="circle"
    :style="{ transform: `translate(${circle2.x}px, ${circle2.y}px)` }"
  ></div>
  <div
    class="circle"
    :style="{ transform: `translate(${circle3.x}px, ${circle3.y}px)` }"
  ></div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { spring } from 'vue3-spring';

export default {
  name: 'App',
  setup() {
    const mouse = reactive({ x: 0, y: 0 });

    const circle1 = spring(mouse);
    const circle2 = spring(mouse, {
      damping: 10,
      stiffness: 120,
      mass: 2,
    });
    const circle3 = spring(mouse, {
      damping: 3,
      stiffness: 170,
      mass: 2,
    });

    onMounted(() => {
      let lastKnownPosition = 0;
      let ticking = false;
      document.addEventListener('mousemove', (event) => {
        lastKnownPosition = { x: event.clientX, y: event.clientY };

        if (!ticking) {
          window.requestAnimationFrame(() => {
            mouse.x = lastKnownPosition.x;
            mouse.y = lastKnownPosition.y;
            ticking = false;
          });
          ticking = true;
        }
      });
    });

    return {
      circle1,
      circle2,
      circle3,
    };
  },
};
</script>

<style>
.circle {
  position: absolute;
  top: 0;
  left: 0;
  margin: -50px;
  transform-origin: bottom right;

  border-radius: 100px;
  width: 100px;
  height: 100px;
  opacity: 0.6;
}
.circle:nth-child(1) {
  background: #642afb;
}
.circle:nth-child(2) {
  background: red;
}
.circle:nth-child(3) {
  background: green;
}
</style>
