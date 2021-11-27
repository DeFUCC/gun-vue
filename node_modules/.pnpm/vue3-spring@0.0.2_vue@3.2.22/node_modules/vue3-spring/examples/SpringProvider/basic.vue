<template>
  <spring-provider v-slot="{ value: circlePosition }" :to="positionX">
    <div class="circle" :style="{ transform: `translateX(${circlePosition}px)` }"></div>
  </spring-provider>

  <input type="number" v-model.number="positionX" />
</template>

<script>
import { SpringProvider } from 'vue3-spring';

export default {
  name: 'App',
  components: { SpringProvider },
  data: () => ({ positionX: 100 }),
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
