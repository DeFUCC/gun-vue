<script setup>
</script>

<template lang="pug">
nav-bar
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>

<style>
</style>
