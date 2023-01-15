<script setup>
import { useProjects, addProject, newProject, currentRoom } from '#composables';

const props = defineProps({
  pub: { type: String, default: currentRoom?.pub }
})

const { candidates } = useProjects(props.pub)

defineEmits(['open'])

</script>

<template lang="pug">
.flex.flex-col 
  .p-2.flex.flex-col.gap-2
    input.p-2.rounded-xl.shadow(
      v-model="newProject.title" 
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
    button.button(
      v-if="newProject.title" 
      key="button" 
      @click="addProject()"
      ) Add Project {{ newProject.title }}
</template>