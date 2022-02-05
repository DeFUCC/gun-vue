<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  p WORD INDEX
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>