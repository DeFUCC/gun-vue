<script setup>
const props = defineProps({
  room: { type: String, default: '' }
})
</script>

<template lang='pug'>
room-page( 
  style="flex: 1 1 200px"
  :pub="room"
  ) 
</template>