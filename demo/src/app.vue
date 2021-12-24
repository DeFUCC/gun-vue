<script setup>

</script>

<template lang="pug">
nav-bar
util-tools.fixed.bottom-4.right-4
.content
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<style>
</style>
