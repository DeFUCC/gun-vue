<script setup>
const props = defineProps({
  room: { type: String, default: '' }
})
</script>

<template lang='pug'>
p {{ room }}
</template>