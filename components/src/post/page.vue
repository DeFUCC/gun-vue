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
.rounded-2xl.overflow-hidden.flex.flex-col(:style="{ backgroundColor: color.light.hex(hash) }")
  .flex.flex-wrap.items-center.w-full.z-204.pl-4(:style="{ backgroundColor: color.light.hex(hash) }")
    div(class="hover:underline text-md cursor-pointer" @click="$emit('close')") # {{ tag }}
    .ml-1 / {{ post.data?.title }} 
    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    button.button(@click="post.download()")
      la-markdown
  .flex.flex-col.p-4.h-full.absolute.break-all.overscroll-y-contain.overflow-y-scroll.overflow-x-hidden(v-if="!post.empty")
    .p-4.mt-4
      .text-2xl.font-bold(v-if="post.data.title") {{ post.data.title }}
      .my-2(v-if="post.data.description") {{ post.data.description }} 
    embed-youtube(v-if="post.data.youtube" :video="post.data.youtube")
    .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.p-2.leading-relaxed.max-w-65ch(v-if="post.data.content" v-html="md.render(post.data.content)") 
    
</template>

<style>
</style>