<script setup>
import { useColor } from '@composables';
import { usePost } from '@composables';
import markdown from 'markdown-it'
import externalLinks from 'markdown-it-external-links'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close'])

const colorLight = useColor('light')

const post = usePost(props.tag, props.hash)

const md = new markdown({
  linkify: true,
  typographer: true,
})

md.use(externalLinks, {
  externalTarget: '_blank'
})

</script>

<template lang='pug'>
.rounded-2xl.flex.flex-col.max-w-160.mx-auto.w-full(:style="{ backgroundColor: colorLight.hex(hash) }")
  .flex.flex-wrap.items-center.w-full.px-4.py-2.sticky.top-0.shadow-xl(:style="{ backgroundColor: colorLight.hex(hash) }")
    .hover_underline.text-md.cursor-pointer.font-bold.flex(@click="$emit('close')") 
      .p-0 #
      .ml-1 {{ tag }}
    .ml-1 / {{ post?.data?.title }} 

    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    button( @click="$emit('close')") 
      la-times
  img(v-if="post?.data?.cover" :src="post?.data?.cover")
  .flex.flex-wrap.items-center.mt-6
    img.w-20.h-20.rounded-full.m-2(v-if="post?.data?.icon" :src="post?.data?.icon")
    .px-8.pb-2
      .text-2xl.font-bold(v-if="post?.data?.title") {{ post?.data?.title }}
      .my-2(v-if="post?.data?.description") {{ post?.data?.description }} 
  .flex.flex-col.p-4.h-full.max-w-120(v-if="!post.empty")
    embed-youtube.mb-6.shadow-xl(v-if="post?.data?.youtube" :video="post?.data?.youtube")
    .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.px-4.py-6.leading-relaxed(v-if="post?.data.content" v-html="md.render(post?.data?.content)") 
  .flex.bg-dark-100.bg-opacity-50.p-4
    post-action-star(:tag="tag" :hash="hash")
    button.button.items-center(@click="post.download()")
      la-markdown.ml-1
      .font-bold.ml-2.mr-1 Download
    
</template>
