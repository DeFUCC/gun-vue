<script setup>
import { watchEffect } from 'vue';
import { useNewProject } from './useProject';
import { ref, computed } from 'vue';
import { genUUID } from '../gun/useGun';

const props = defineProps({
  title: { type: String, default: '' },
  source: { type: String, default: '' },
  required: { type: Array, default: ['id', 'title'] }
})

const emit = defineEmits(['added'])

const open = ref(false)

const { newProject, addProject } = useNewProject()

watchEffect(() => {
  newProject.title = props.title
  newProject.source = props.source
})

const formComplete = computed(() => {
  return props.required.reduce((a, f) => {
    return a && !!newProject?.[f]
  }, true)
})
</script>

<template lang='pug'>
.p-2
  .flex.flex-col.gap-2.max-w-16em(v-if="open")
    .grid.gap-2.items-center(style="grid-template-columns:  auto 1fr;")
      h3 ID: 
      .p-2.flex.items-center.cursor-pointer.gap-1(@click="newProject.id = genUUID(6)")
        pre {{ newProject.id }}
        .flex-1
        .i-la-sync
      h3 Title:
      input(type="text" v-model="newProject.title")
    pre.text-xs.overflow-scroll {{ newProject }}
    button.button(@click="addProject(()=>$emit('added'))" v-if="formComplete") ADD PROJECT {{ formComplete }}

  button.button.text-lg(@click="open=true" v-if="!open") Add a new project

</template>