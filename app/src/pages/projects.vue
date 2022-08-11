<script setup>
import { countProjects } from '#composables';

const count = countProjects()

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative
  router-link.py-2.px-4.flex.bg-dark-100.bg-opacity-10(to="/projects/") 
    .font-bold.text-xl PROJECTS
    .flex-1
    .text-lg {{ count }}
  router-view(v-slot="{ Component }")
    keep-alive
      transition(name="fade" mode="out-in")
        component(:is="Component" )
</template>