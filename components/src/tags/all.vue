<script setup>
import { useTags } from '@composables'

const { search, slug, tags, addTag } = useTags()

const emit = defineEmits(['tag'])

</script>

<template lang='pug'>
.flex.flex-col
  .p-2.relative
    input.w-full.p-4.rounded-xl.shadow-inner.text-lg(v-model="search" placeholder="Search for a tag")
    .absolute.right-8.top-6 {{ tags.results.length }}/{{ tags.count }}
  .flex.flex-wrap
    .tag(
      v-for="result in tags.results" :key="result"
      @click="$emit('tag', result.item?.tag)"
      :style="{ opacity: 1 - result.score }" 
      ) {{ result.item?.tag }} 
    .tag.new(
      v-if="search && tags.minScore > 0.00001"
      @click="addTag(search)"
    ) {{ slug }} +
</template> 

<style scoped>
.tag {
  @apply cursor-pointer rounded-xl shadow-md py-2 px-4;
  &.new {
    @apply bg-dark-100 text-white;
  }
}
</style>