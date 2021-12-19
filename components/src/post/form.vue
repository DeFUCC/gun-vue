<script setup>
const post = ref({})
defineEmits(['submit'])

const add = reactive({
  youtube: false,
  text: false,
})

</script>

<template lang='pug'>
form.flex.flex-col.p-2.mt-8.border-1.rounded-2xl.bg-light-700(action="javascript:void(0);")
  input(v-model="post.title" placeholder="Title")
  input(v-model="post.description" placeholder="Description")

  .flex.flex-wrap
    button.button(@click="add.text = !add.text" :class="{ active: add.text }")
      mdi-text-long
    button.button(@click="add.youtube = !add.youtube" :class="{ active: add.youtube }")
      la-youtube  

  input(v-if="add.youtube" v-model="post.youtube" placeholder="Youtube video ID")
  textarea(v-if="add.text" v-model="post.text" placeholder="Main text content (with **markdown** support)")

  button.button(:disabled="!post.title && !post.description && !post.text" type="submit" @click="$emit('submit', post); post = {}") Submit
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