<script setup>
import { useColor } from '@composables';
import { useTagPost } from '@composables';
import markdown from 'markdown-it'
import externalLinks from 'markdown-it-external-links'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close'])

const colorLight = useColor('light')

const post = useTagPost(props.tag, props.hash)

const md = new markdown({
  linkify: true,
  typographer: true,
})

md.use(externalLinks, {
  externalTarget: '_blank'
})

</script>

<template lang='pug'>
.rounded-2xl.flex.flex-col.max-w-160.mx-auto(:style="{ backgroundColor: colorLight.hex(hash) }")
  .flex.flex-wrap.items-center.w-full.pl-4(:style="{ backgroundColor: colorLight.hex(hash) }")
    div(class="hover:underline text-md cursor-pointer" @click="$emit('close')") # {{ tag }}
    .ml-1 / {{ post?.data?.title }} 
    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    button.button(@click="post.download()")
      la-markdown
  .px-8.pb-2
    .text-2xl.font-bold(v-if="post?.data?.title") {{ post?.data?.title }}
    .my-2(v-if="post?.data?.description") {{ post?.data?.description }} 
  .flex.flex-col.p-4.h-full(v-if="!post.empty")
    img(v-if="post?.data?.picture" :src="post?.data?.picture")
    embed-youtube(v-if="post?.data?.youtube" :video="post?.data?.youtube")
    .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.p-2.leading-relaxed.max-w-120(v-if="post?.data.content" v-html="md.render(post?.data?.content)") 
    
</template>
