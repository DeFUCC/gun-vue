<script setup lang="ts">

</script>

<template lang="pug">
.flex.items-stretch.relative.flex-col.w-full
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      component(:is="Component")
</template>