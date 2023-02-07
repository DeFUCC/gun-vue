<script setup>
const props = defineProps({
  state: {
    type: [String, Boolean],
    default: ''
  }
})
</script>

<template lang="pug">
.py-1.rounded-lg.flex.justify-center.text-center.text-sm
  .i-la-check(v-if="state === true")
  .i-la-times(v-else-if="state === false")
  .p-0(v-else) {{ state }}
</template>