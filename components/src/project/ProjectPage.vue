<script setup>
import { useUser, useProject, useMd, useProjectGifts } from '#composables';
import { toRef, ref, computed, watchEffect } from 'vue'
import InkMde from 'ink-mde/vue'

const emit = defineEmits(['gift', 'user'])

const props = defineProps({
  path: { type: String, default: '' },
})

const { user } = useUser()

const md = useMd()

const { project, updateField, updateCover } = useProject(props.path)

const editable = computed(() => props.path.includes(user.pub))

const editing = ref(false)

const text = ref('')

watchEffect(() => {
  text.value = project.text
})




</script>

<template lang='pug'>
.flex.flex-col
  .p-2.relative(:style="{ background: `url(${project.cover}) center`, backgroundColor: project.color }")

    input.absolute.top-4.right-4(
      type="color" 
      :value="project.color" 
      @input="updateField('color', $event.target.value)" 
      v-if="editable"
      )

    form-picture(@update="updateCover($event)" v-if="editable")


    form-title(
      :text="project.title" 
      :editable="editable" 
      @update="updateField('title', $event)")

    account-badge.absolute.bottom-4.right-4(:pub="path.slice(-87)" @click="$emit('user', path.slice(-87))")

  .flex.flex-col.gap-2.m-2.bg-light-200.p-2.rounded-xl.shadow.relative
    la-pen.cursor-pointer.text-2xl.absolute.top-2.right-2.z-2(@click="editing = !editing" v-if="editable")
    .p-2.markdown-body(v-html="md.render(text || '')" v-if="!editing || !editable")
    InkMde(v-else :modelValue="text" @update:modelValue="updateField('text', $event)")

  project-funding(
    :path="path" 
    :enabled="project.funding" 
    @enable="updateField('funding', true)"
    @gift="$emit('gift', $event)"
    )
</template>