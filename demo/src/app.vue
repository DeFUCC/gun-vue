<script setup>

</script>

<template lang="pug">
nav-bar
.content
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<style>
</style>
