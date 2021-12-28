<script setup>
</script>

<template lang="pug">
nav-bar

.p-0
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
util-tools.fixed.bottom-2
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
