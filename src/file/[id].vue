<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})


</script>

<template lang='pug'>
torrent-download(:id="id")
</template>