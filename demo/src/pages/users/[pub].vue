<script setup>
const props = defineProps({
  pub: { type: String, default: '' }
})
</script>

<template lang='pug'>
.flex.flex-col
  p {{ pub }}
</template>