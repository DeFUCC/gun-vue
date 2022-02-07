<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      component(:is="Component")
</template> 