<script setup>
import { useUser, useProject, updateProjectField, useMd } from '#composables';
import { toRef, ref, computed, watchEffect } from 'vue'
import Ink from 'ink-mde/vue'

const props = defineProps({
  path: { type: String, default: '' },
})

const { user } = useUser()

const md = useMd()

const { project } = useProject(toRef(props, 'path'))

const editable = computed(() => props.path.includes(user.pub))

const text = ref('')

watchEffect(() => {
  text.value = project.value.text
})



</script>

<template lang='pug'>
.flex.flex-col
  .p-2.relative(:style="{ background: `url(${project.cover}) center`, backgroundColor: project.color }")

    input.absolute.top-4.right-4(
      type="color" 
      :value="project.color" 
      @input="updateProjectField(path.slice(0, -88), 'color', $event.target.value)" 
      v-if="editable"
      )

    form-picture(@update="updateProjectField(path.slice(0, -88), 'cover', $event)" v-if="editable")

    form-title(
      :text="project.title" 
      :editable="editable" 
      @update="updateProjectField(props.path.slice(0, -88), 'title', $event)")

    account-badge.absolute.bottom-4.right-4(:pub="path.slice(-87)")
  .flex.flex-col.gap-2.m-2.bg-light-200.p-2.rounded-xl.shadow
    .p-2.markdown-body(v-html="md.render(text || '')" v-if="!editable")
    Ink(v-else :modelValue="text" @update:modelValue="updateProjectField(path.slice(0, -88), 'text', $event)")

  pre.p-4.my-4.text-xs.overflow-scroll {{ project }}
</template>