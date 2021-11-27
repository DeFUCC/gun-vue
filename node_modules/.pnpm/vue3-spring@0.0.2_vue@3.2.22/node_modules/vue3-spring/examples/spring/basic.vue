<template>
  <div class="circle" :style="{ transform: `translateX(${circlePosition}px)` }"></div>
  <input type="number" v-model.number="positionX" min="0" max="1000" />
</template>

<script>
import { ref } from 'vue';
import { spring } from 'vue3-spring';

export default {
  name: 'App',
  setup() {
    const positionX = ref(100);

    const circlePosition = spring(positionX);

    return {
      circlePosition,
      positionX,
    };
  },
};
</script>

<style>
.circle {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: bottom right;

  border-radius: 100px;
  width: 100px;
  height: 100px;
  background: #642afb;
}
</style>
