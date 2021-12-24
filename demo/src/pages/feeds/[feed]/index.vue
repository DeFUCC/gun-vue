<script setup>
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
</script>

<template lang='pug'>
.flex.flex-col
  router-view
</template>

<style scoped>
</style>