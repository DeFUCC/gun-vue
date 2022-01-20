<script setup>


</script>

<template lang="pug">
nav-bar
.p-0.flex-1
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
.flex.flex-col.items-center.bg-dark-100.p-4.bg-opacity-30
  util-tools
</template>

<style lang="postcss">
html {
  scroll-behavior: smooth;
  hyphens: auto;
}
body {
  @apply bg-light-400 dark_bg-dark-100;
}
#app {
  @apply min-h-100vh flex flex-col;
}
</style>
