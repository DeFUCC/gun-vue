<template>
  <spring-provider v-slot="circle1" :to="mouse">
    <div
      class="circle"
      :style="{ transform: `translate(${circle1.x}px, ${circle1.y}px)` }"
    ></div>
  </spring-provider>

  <spring-provider v-slot="circle2" :to="mouse" :damping="10" :stiffness="120" :mass="2">
    <div
      class="circle"
      :style="{ transform: `translate(${circle2.x}px, ${circle2.y}px)` }"
    ></div>
  </spring-provider>

  <spring-provider v-slot="circle3" :to="mouse" :damping="3" :stiffness="170" :mass="2">
    <div
      class="circle"
      :style="{ transform: `translate(${circle3.x}px, ${circle3.y}px)` }"
    ></div>
  </spring-provider>
</template>

<script>
import { SpringProvider } from 'vue3-spring';

export default {
  name: 'App',
  components: { SpringProvider },
  data: () => ({
    mouse: { x: 0, y: 0 },
  }),
  mounted() {
    let lastKnownPosition = 0;
    let ticking = false;
    document.addEventListener('mousemove', (event) => {
      lastKnownPosition = { x: event.clientX, y: event.clientY };

      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.mouse.x = lastKnownPosition.x;
          this.mouse.y = lastKnownPosition.y;
          ticking = false;
        });
        ticking = true;
      }
    });
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
