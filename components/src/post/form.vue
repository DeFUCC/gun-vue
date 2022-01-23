<script setup>
import { reactive, ref, onMounted, watch, computed } from 'vue'

import { addPost, useColor } from '@composables'

const props = defineProps({
  tag: { type: String, default: 'null' }
})

const emit = defineEmits(['close'])

const colorDeep = useColor('deep')

const addColor = computed(() => {
  return colorDeep.hex(props.tag)
})

const titleInput = ref()

onMounted(() => {
  titleInput?.value?.focus()
})

const postData = ref({})

const add = reactive({
  form: false,
  youtube: false,
  content: false,
})

const hasContent = computed(() => {
  return postData.value.title || postData.value.description || postData.value.content || postData.value.cover
})


function submit() {
  if (!hasContent.value) return
  const contents = { ...postData.value }
  addPost(props.tag, contents)
  reset()
}

function reset() {
  add.form = false
  postData.value = {}
  emit('close')
}

</script>

<template lang='pug'>
form.w-full.flex.flex-col.p-2.shadow-xl.m-1.rounded-2xl.mb-6(action="javascript:void(0);")
  input.font-bold.text-xl(v-model="postData.title" placeholder="Title" autofocus ref="titleInput")
  textarea.text-1rem.leading-relaxed(v-model="postData.description" placeholder="Description")
  .flex.flex-wrap.text-xl
    post-form-picture(@update="postData.icon = $event" field="icon" :options="{ picSize: 400, preserveRatio: false }")
      la-info-circle
    post-form-picture(@update="postData.cover = $event")
    post-form-link(@update="postData.link = $event")
    post-form-youtube(@update="postData.youtube = $event")
    post-form-text(@update="postData.content = $event")
  .flex.justify-center.text-xl.p-2
    button.plus.button.flex-1.justify-center( :disabled="!hasContent" type="submit" @click="submit()")
      la-check
      .font-bold.ml-2 Submit
    button.m-1.plus.button.items-center.justify-center(@click="add.form = !add.form")
      la-pen(v-if="!add.form")
      la-eye-slash(v-else)
    button.m-1.button.text-xl( @click="reset()")
      la-trash-alt

</template>

<style lang="postcss" scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
button:disabled {
  @apply opacity-40;
}
.active {
  background-color: v-bind(addColor);
}

.plus {
  transition: all 100ms ease-in;
  background-color: v-bind(addColor);
  filter: grayscale(50%) brightness(100%);
}
.plus:hover {
  filter: grayscale(0%) brightness(120%);
}
</style>