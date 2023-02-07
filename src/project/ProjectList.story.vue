<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const ProjectList = defineAsyncComponent(() => import('./ProjectList.vue'))

const state = reactive({

})



</script>

<template lang="pug">
Story(
  title="Project/List" 
  icon="la:tools"
  )
  Variant(title="Round")
    ProjectList(v-bind="state")

  template(#controls)
    .p-4.flex.flex-col.gap-4

</template>