<script setup>

</script>

<template lang="pug">
.flex.flex-col
  torrent-upload
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")
  
  
</template>