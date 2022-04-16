<script setup>



</script>

<template lang='pug'>
.flex.flex-wrap.gap-2
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component(:is="Component" )
</template>