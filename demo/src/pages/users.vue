<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  router-link.px-8.py-2.bg-light-900.font-bold(to="/users/") Users
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 