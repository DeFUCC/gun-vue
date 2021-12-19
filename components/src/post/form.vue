<script setup>
const post = ref({})
defineEmits(['submit'])

</script>

<template lang='pug'>
form.flex.flex-col.p-2.mt-8.border-1.rounded-2xl.bg-light-700(action="javascript:void(0);")
  input(v-model="post.title" placeholder="Title")
  input(v-model="post.description" placeholder="Description")
  textarea(v-model="post.text" placeholder="Main text content (with **markdown** support)")
  button.button(type="submit" @click="$emit('submit', post); post = {}") Submit
</template>

<style scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
.active {
  @apply bg-light-100 shadow-lg;
}
</style>