<script setup>
const props = defineProps({
  blink: Boolean
})
</script>

<template lang='pug'>
.p-1.m-1.rounded-full.transition-all.duration-300.ease-in-out(
  :style="{ backgroundColor: blink ? 'white' : 'black' }"
)
</template>