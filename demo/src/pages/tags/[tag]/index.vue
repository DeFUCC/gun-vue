<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
</script>

<template lang='pug'>
.flex.flex-col
  router-view
</template>

<style scoped>
</style>