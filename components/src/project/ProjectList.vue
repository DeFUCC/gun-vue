<script setup>
import { useProjects } from '#composables';

const { projects } = useProjects()
</script>

<template lang='pug'>
.flex.flex-col
  .text-lg.font-bold PROJECT LIST
  .flex.flex-wrap.gap-2.p-2
    .p-4.shadow-lg.bg-light-100.rounded-xl(v-for="project in projects" :key="project") {{ project }}
</template>