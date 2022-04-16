<script setup>
import { useDictAuthors } from '@composables'
const authors = useDictAuthors()

defineEmits(['author'])
</script>

<template lang='pug'>
.p-4
  .text-xl Dictionary authors
  .flex.flex-wrap 
    .p-2(
      @click="$emit('author', author)"
      v-for="(words, author) in authors" :key="author"
    )
      account-badge(:pub="author")
        .pr-2.font-bold {{ Object.keys(words).length }}
</template>