<script setup>
const props = defineProps({
  room: { type: String, default: '' }
})
</script>

<template lang='pug'>
ui-layer(:open="true" @close="$router.push('/rooms/')")
  room-page( 
    style="flex: 1 1 200px"
    :pub="room"
    ) 
</template>