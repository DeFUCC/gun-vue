<script setup>

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative.p-4
  h2.text-xl.font-bold PROJECTS
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" )
</template>