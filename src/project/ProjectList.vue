<script setup>
import { useProjects, currentRoom } from '#composables';
import { ProjectCard } from '#components'
import ProjectForm from './ProjectForm.vue';
import { computed } from 'vue';

const projects = computed(() => useProjects(currentRoom?.pub))

defineEmits(['open'])
</script>

<template lang="pug">
.flex.flex-col 
  .p-2.flex.flex-col.gap-2
    input.p-2.rounded-xl.shadow.dark-bg-dark-400(
      v-model="projects.search.value" 
      placeholder="Start typing a project title"
      )
  .flex.flex-wrap.gap-4.p-2
    transition-group(name="list")
      project-card(
        v-for="(proj, path) in projects.candidates.value" 
        :key="path"
        :project="proj?.item"
        :path="proj?.item?.path"
        :style="{ opacity: 1 - proj?.score }"
        @click="$emit('open', proj?.item?.path)"
        )
  .p-2.flex.flex-col.gap-2
    project-form(:title="projects.search.value" v-if="projects.search.value" @added="projects.search.value=''")
</template>