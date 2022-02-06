<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  room-page
  room-list.p-8
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 