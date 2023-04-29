<script setup>
import { watchEffect } from 'vue';
import { useNewProject } from './useProject';

const props = defineProps({
  title: { type: String, default: 'Project0' }
})

const emit = defineEmits(['added'])

const { newProject, addProject } = useNewProject()

watchEffect(() => {
  newProject.title = props.title
})
</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-2.max-w-16em
  .text-lg Add a new project {{ newProject.id }}

  .grid.gap-2.items-center(style="grid-template-columns:  auto 1fr;")
    h3 ID: 
    .font-bold {{ newProject.id }}
    h3 Title:
    input(type="text" v-model="newProject.title")

  button.button(@click="addProject(()=>$emit('added'))") ADD PROJECT
  pre.text-xs {{ newProject }}
</template>