<script setup>
import { useNewProject } from '#composables';

const { project, addProject } = useNewProject()
</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-2
  .font-bold New project
  input.p-2(v-model="project.title" placeholder="Project title")
  button.button(@click="addProject()") Add Project
</template>