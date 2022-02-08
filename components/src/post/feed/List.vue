<script setup>
import { useTagList, useColor } from '@composables'
import { ref, onMounted } from 'vue'

defineEmits(['tag'])

const colorLight = useColor('light')
const colorDeep = useColor('dark')

const { search, slug, tags, addTag } = useTagList()

</script>

<template lang="pug">
.flex.flex-col
  .relative
    input.w-full.p-2.rounded-xl.shadow-inner.text-lg(v-model="search" placeholder="Search for a feed" ref="input")
    .absolute.right-6.top-2 {{ tags.results.length }}/{{ tags.count }}
  .flex.flex-wrap.absolute.top-30.bg-light-300.left-2.right-2.p-2.rounded-2xl.shadow-xl.z-1000(v-if="search")
    transition-group(name="fade")
      .tag.flex.font-bold.border-1.border-dark-300(key="new" v-if="search && tags.minScore > 0.00001" @click="addTag(search)")
        .p-1 {{ slug }}
        .flex-1
        .p-1 +
      post-feed-label.tag(v-for="(result, r) in tags.results" :key="r" @click="$emit('tag', result.item?.tag); search = ''" :style="{ opacity: 1 - result.score }" :showEmpty="true" :tag="result.item?.tag" :hash="result.item.hash")
  //- .flex.flex-wrap.mt-8
  //-   transition-group(name="fade")
  //-     .flex.items-center.justify-center.text-center.p-2.m-2px.rounded-sm.font-bold.capitalize.cursor-pointer.hover_shadow-lg.transition.duration-300ms(style="flex: 1 1 140px" :style="{ backgroundColor: colorLight.hex(tag.hash || 0), color: colorDeep.hex(tag.hash) }" v-for="(tag, r) in tags.all" :key="r" @click="$emit('tag', tag.tag); search = ''") {{ tag.tag }} 
</template> 

<style lang="postcss" scoped>
.tag {
  @apply cursor-pointer flex-grow bg-light-700 rounded-md shadow-md m-1 py-2 px-2 hover_(bg-light-200);
  &.new {
    @apply bg-dark-100 text-white;
  }
}
</style>