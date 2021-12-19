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
    transition-group(name="fade")
      tag-label.tag(
        v-for="(result,r) in tags.results" :key="r"
        @click="$emit('tag', result.item?.tag); search = ''"
        :style="{ opacity: 1 - result.score }"
        :tag="result.item?.tag"
        ) 
      .tag.new(
        key="new"
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