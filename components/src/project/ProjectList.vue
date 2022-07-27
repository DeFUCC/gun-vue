<script setup>
import { useProjects, updateProject, newProject } from '#composables';
const { search, projects, candidates } = useProjects()

defineEmits(['open'])

</script>

<template lang='pug'>
.flex.flex-col
  .p-2.flex.flex-col.gap-2
    input.p-2.rounded-xl.shadow(v-model="newProject.title" placeholder="Start typing a project title")
  .flex.flex-wrap.gap-2.p-2
    transition-group(name="list")
      project-card(
        v-for="(proj, path) in candidates" 
        @click="$emit('open', proj.item.path)"
        :key="path"
        :project="proj.item"
        :path="proj.item.path"
        :style="{ opacity: 1 - proj.score }"
        )
  .p-2.flex.flex-col.gap-2
    button.button(@click="updateProject()" key="button" v-if="newProject.title") Add Project {{ newProject.title }}
</template>