<script setup>
import { useProjects, currentRoom } from '#composables';
import { ProjectCard } from '#components'
import ProjectForm from './ProjectForm.vue';

const props = defineProps({
  pub: { type: String, default: currentRoom?.pub }
})

const { candidates, search } = useProjects(props.pub)

defineEmits(['open'])
</script>

<template lang="pug">
.flex.flex-col 
  .p-2.flex.flex-col.gap-2
    input.p-2.rounded-xl.shadow.dark-bg-dark-400(
      v-model="search" 
      placeholder="Start typing a project title"
      )
  .flex.flex-col.gap-4.p-2
    transition-group(name="list")
      project-card(
        v-for="(proj, path) in candidates" 
        :key="path"
        :project="proj.item"
        :path="proj.item.path"
        :style="{ opacity: 1 - proj.score }"
        @click="$emit('open', proj.item.path)"
        )
  .p-2.flex.flex-col.gap-2
    project-form(:title="search" v-if="search" @added="search=''")
</template>