
<script setup>
import { useUser, useProject, useMd } from '#composables';
import { toRef, ref, computed, watch } from 'vue'
import { FormPicture, FormTitle, ProjectFunding, ProjectForm } from '../components'
import { useDebounceFn } from '@vueuse/core'


const emit = defineEmits(['gift', 'user'])

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
})

const { user } = useUser()

const md = useMd()

const { project, updateField, updateCover } = useProject(props.path)

const editable = computed(() => props.path.includes(user.pub))

const editing = ref(false)

const content = ref(project.content)

watch(() => project.content, (t) => {
  content.value = t
})

const debouncedUpdate = useDebounceFn(updateField, 1000)

</script>
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.flex.flex-col.max-w-65ch
  .p-2.relative(:style="{ background: `url(${project.cover}) center`, backgroundColor: project?.color, paddingTop: project?.cover || project?.color ? '220px' : '60px' }")
    form-picture.absolute.top-2(
      v-if="editable" 
      @update="updateCover($event)"
      )
    input.absolute.top-4.right-4(
      v-if="editable" 
      type="color" 
      :value="project?.color" 
      @input="updateField('color', $event.target.value)"
      )
    .rounded.p-2.bg-light-100.bg-opacity-80.dark-bg-dark-300.dark-bg-opacity-60.flex.items-center
      .flex.flex-col
        .flex.items-center.gap-2
          .capitalize.font-mono.text-xs {{ project?.type }} 
          .px-2.px-1.bg-light-300.dark-bg-dark-300.rounded-lg.font-mono.text-xs {{ project?.id }} 
          .px-2.px-1.bg-light-700.dark-bg-dark-700.rounded-lg.font-mono.text-xs.mr-auto {{ project?.status }}
        form-title.text-2xl.font-bold(
          :text="project?.title" 
          :editable="editable" 
          @update="updateField('title', $event)")
        form-title.text-md(
          :text="project?.description" 
          :editable="editable" 
          @update="updateField('description', $event)")
      .flex-1
      account-badge(
        :pub="path.slice(-87)" 
        @click="$emit('user', path.slice(-87))")

  .flex.flex-col.gap-2.px-4.bg-light-200.dark-bg-dark-400.relative
    .i-la-pen.cursor-pointer.text-2xl.absolute.top-2.right-2.z-2(
      v-if="editable" 
      @click="editing = !editing"
      )
    .p-2.text-base.prose.prose-truegray.dark-prose-light.dark-bg-dark-400(
      v-if="!editing || !editable" 
      v-html="md.render(content || '')")
    textarea.dark-bg-dark-400(
      v-else 
      v-model="content" 
      @update:model-value="debouncedUpdate('content', $event)")
    pre.text-xs.max-w-full.overflow-scroll {{ Object.keys(project) }}

  project-funding(
    :path="path" 
    :enabled="!!project.funding" 
    @enable="updateField('funding', 'true')"
    @gift="$emit('gift', $event)"
    )
  project-form(:source="path")
    
</template>
