<script setup>

</script>

<template lang='pug'>
.flex.justify-center
  router-link.button(to="/log/")
    la-info-circle
  router-link.button(to="/graph/")
    mdi-graph-outline
  button.button
    relay-icon
</template>