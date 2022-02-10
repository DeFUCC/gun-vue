<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  room-list.p-8(@browse="$router.push(`/rooms/${$event}`)" )
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      component(:is="Component")
</template> 