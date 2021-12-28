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

const { post, download } = useTagPost(toRef(props, 'tag'), toRef(props, 'hash'))

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
      button.button(@click="download()")
        la-markdown
  .flex.flex-col.px-4(v-if="!post.empty")
    .p-4
      .text-2xl.font-bold(v-if="post.data.title") {{ post.data.title }}
      .my-2(v-if="post.data.description") {{ post.data.description }} 
    embed-youtube(v-if="post.data.youtube" :video="post.data.youtube")
    .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.p-2.leading-relaxed.max-w-65ch.breal-all(v-if="post.data.content" v-html="md.render(post.data.content)") 
    
</template>

<style>
</style>