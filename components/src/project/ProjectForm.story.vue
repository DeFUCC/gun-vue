<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const ProjectForm = defineAsyncComponent(() => import('./ProjectForm.vue'))

const state = reactive({
  hash: "123",
})



</script>

<template lang="pug">
Story(title="Project/Form" icon="la:question")
  Variant(title="Round")
    ProjectForm(v-bind="state")

  template(#controls)
    .p-4.flex.flex-col.gap-4

</template>