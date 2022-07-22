<script setup>
const props = defineProps({
  path: { type: String }
})

</script>

<template lang='pug'>
project-page(:path="path" :key="path")
</template>