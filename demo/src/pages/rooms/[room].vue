<script setup>
const props = defineProps({
  room: { type: String, default: '' }
})
</script>

<template lang='pug'>
room-card( 
  style="flex: 1 1 200px"
  :pub="room"
  @click="$emit('browse', pub)"
  ) 
</template>