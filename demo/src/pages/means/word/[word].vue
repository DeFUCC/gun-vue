<script setup>
const props = defineProps({
  word: String
})
</script>

<template lang='pug'>
.flex.flex-col
  p word {{ word }} page
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>