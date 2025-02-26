<script setup lang="ts">

</script>

<template lang="pug">
.flex.items-stretch.relative.flex-col.w-full
  router-link.p-2.bg-light-400.dark-bg-dark-500.sticky.top-0.text-lg.w-full(to="/users/") USERS
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      component(:is="Component")
</template>