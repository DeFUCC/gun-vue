<script setup>
const props = defineProps({
  pub: String
})
</script>

<template lang='pug'>
.flex.flex-col
  p author {{ pub }} page
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>