
<script setup>
import {
  useUser,
  useProject,
  useMd,
  useProjectGifts
} from '#composables';
import {
  toRef,
  ref,
  computed,
  watch
} from 'vue'

const emit = defineEmits(['gift', 'user'])

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
})

const {
  user
} = useUser()

const md = useMd()

const {
  project,
  updateField,
  updateCover
} = useProject(props.path)

const editable = computed(() => props.path.includes(user.pub))

const editing = ref(false)

const text = ref(project.text)

watch(() => project.text, (t) => {
  text.value = t
})
</script>
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.flex.flex-col
  .p-2.relative(:style="{ background: `url(${project.cover}) center`, backgroundColor: project.color, paddingTop: project.cover || project.color ? '120px' : '' }")

    input.absolute.top-4.right-4(
      v-if="editable" 
      type="color" 
      :value="project.color" 
      @input="updateField('color', $event.target.value)"
      )

    form-picture(
      v-if="editable" 
      @update="updateCover($event)"
      )

    form-title(
      :text="project.title" 
      :editable="editable" 
      @update="updateField('title', $event)")

    //- account-badge.absolute.bottom-4.right-4(
      :pub="path.slice(-87)" 
      @click="$emit('user', path.slice(-87))")

  .flex.flex-col.gap-2.m-2.bg-light-200.p-2.rounded-xl.shadow.relative
    .i-la-pen.cursor-pointer.text-2xl.absolute.top-2.right-2.z-2(
      v-if="editable" 
      @click="editing = !editing"
      )
    .p-2.markdown-body(
      v-if="!editing || !editable" 
      v-html="md.render(text || '')")
    textarea(
      v-else 
      v-model="text" 
      @update:model-value="updateField('text', $event)")


  project-funding(
    :path="path" 
    :enabled="project.funding" 
    @enable="updateField('funding', true)"
    @gift="$emit('gift', $event)"
    )
</template>
