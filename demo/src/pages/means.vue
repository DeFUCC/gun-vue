<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  p MEANS ROOT
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>