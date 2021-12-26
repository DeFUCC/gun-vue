<script setup>
import { color } from '@composables';
import { useTagPost } from '@composables';
import markdown from 'markdown-it'
import externalLinks from 'markdown-it-external-links'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close'])

const post = useTagPost(toRef(props, 'tag'), toRef(props, 'hash'))

const md = new markdown({
  linkify: true,
  typographer: true,
})

md.use(externalLinks, {
  externalTarget: '_blank'
})

</script>

<template lang='pug'>
.pt-4
  .flex.items-center.px-4
    .flex.flex-wrap.items-center
      div(class="hover:underline text-md cursor-pointer" @click="$emit('close')") # {{ tag }}
      .opacity-30.ml-4 {{ post?.lastUpdated }}
      .flex-1
  .flex.flex-col.px-4(v-if="!post.empty")
    .p-4
      .text-2xl.font-bold(v-if="post.title") {{ post.title }}
      .my-2(v-if="post.description") {{ post.description }} 
    embed-youtube(v-if="post.youtube" :video="post.youtube")
    .text-md.markdown.bg-light-200.rounded-2xl.m-1.p-2.leading-relaxed.max-w-65ch.breal-all(v-if="post.content" v-html="md.render(post.content)") 
    
</template>

<style scoped>
a {
  @apply underline-current;
}
</style>