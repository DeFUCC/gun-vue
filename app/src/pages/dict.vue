<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  .flex.w-full.items-center
    router-link.flex-1.p-2.bg-light-900(to="/dict/") Dictionary
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component(:is="Component" )
</template>