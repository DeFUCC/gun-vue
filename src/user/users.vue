<script setup lang="ts">

</script>

<template lang="pug">
.flex.items-center.relative.flex-col
  .text-lg USERS
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      component(:is="Component")
</template>