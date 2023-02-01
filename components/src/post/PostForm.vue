<script setup>
import {
  reactive,
  ref,
  onMounted,
  watch,
  computed
} from 'vue'

import {
  addPost,
  useColor
} from '#composables'

const props = defineProps({
  tag: {
    type: String,
    default: ' '
  }
})

const emit = defineEmits(['close'])

const colorDeep = useColor('deep')

const addColor = computed(() => {
  return colorDeep.hex(props.tag)
})

const titleInput = ref()

onMounted(() => {
  titleInput.value?.focus()
})

const postData = ref({})

const add = reactive({
  form: false,
  youtube: false,
  text: false,
})

const hasContent = computed(() => {
  return postData.value.title || postData.value.statement || postData.value.text || postData.value.cover
})

function submit() {
  if (!hasContent.value) return
  const contents = {
    ...postData.value
  }
  addPost(props.tag, contents)
  reset()
}

function reset() {
  add.form = false
  postData.value = {}
  emit('close')
}
</script>

<template lang="pug">
form.w-full.flex.flex-col.p-2.shadow-xl.m-1.rounded-2xl(action="javascript:void(0);")
  input.font-bold.text-xl(
    v-if="add.title" 
    ref="titleInput" 
    v-model="postData.title" 
    placeholder="Title"
    autofocus
    )
  textarea.text-1rem.leading-relaxed(
    v-model="postData.statement" 
    placeholder="Short text statement"
    @keyup.enter.ctrl="submit()"
    )
  .flex.flex-wrap.z-100
    button.button.m-1(
      :class="{ active: postData.title }" 
      title="Add a heading"
      @click="add.title = !add.title"
      ) H1

    form-picture(
      field="icon" 
      :options="{ picSize: 400, preserveRatio: false }" 
      @update="postData.icon = $event"
      )
      .i-la-info-circle
    form-picture(@update="postData.cover = $event")
    form-link(@update="postData.link = $event")
    form-youtube(@update="postData.youtube = $event")
    button.m-1.button(
      :class="{ active: postData.text }" 
      @click="add.text = true"
      )
      .i-mdi-text-long
    .flex-1
    .flex.justify-center.flex-1
      button.plus.button.flex-1.justify-center.m-1(
        :disabled="!hasContent" 
        type="submit" 
        @click="submit()"
        )
        .i-la-check
        .font-bold.ml-2 Submit
      button.m-1.button.text-xl( @click="reset()")
        .i-la-trash-alt
  ui-layer(
    :open="add.youtube" 
    :offset="'22vh'" 
    @close="add.youtube = false"
    )

  ui-layer(
    :open="add.text" 
    :offset="'22vh'" 
    @close="add.text = false"
    )
    form-text(
      v-model:text="postData.text" 
      @close="add.text = false"
      )
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
