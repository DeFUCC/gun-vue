<script setup>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

let simplemde
onMounted(() => {
  simplemde = new SimpleMDE({
    element: document.getElementById("myMD"),
  });
  title.value.focus()
})

const post = ref({})
const title = ref()
const emit = defineEmits(['submit'])

const add = reactive({
  youtube: false,
  content: false,
})

function submit() {
  const contents = { ...post.value, content: simplemde.value() }
  emit('submit', contents)
  post.value = {}
  simplemde.value('')
}

</script>

<template lang='pug'>
form.flex.flex-col.p-2.border-1.rounded-2xl(action="javascript:void(0);")
  input(v-model="post.title" placeholder="Title" autofocus ref="title")
  input(v-model="post.description" placeholder="Description")

  .flex.flex-wrap
    button.button(@click="add.content = !add.content" :class="{ active: add.content }")
      mdi-text-long
    button.button(@click="add.youtube = !add.youtube" :class="{ active: add.youtube }")
      la-youtube  

  input(v-if="add.youtube" v-model="post.youtube" placeholder="Youtube video ID")
  .flex.flex-col(v-show="add.content")
    textarea#myMD(ref="md"  placeholder="Main text content (with **markdown** support)")

  button.button(:disabled="!post.title && !post.description && !post.content" type="submit" @click="submit()") Submit
</template>

<style scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
button:disabled {
  @apply opacity-40;
}
.active {
  @apply bg-light-900 shadow-lg;
}
</style>