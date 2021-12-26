<script setup>
const post = ref({})
const title = ref()
defineEmits(['submit'])

const add = reactive({
  youtube: false,
  content: false,
})

onMounted(() => {
  title.value.focus()
})

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
  textarea(v-if="add.content" v-model="post.content" placeholder="Main text content (with **markdown** support)")

  button.button(:disabled="!post.title && !post.description && !post.content" type="submit" @click="$emit('submit', post); post = {}") Submit
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