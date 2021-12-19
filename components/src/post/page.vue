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
.p-4.m-2.shadow-lg.rounded-2xl.bg-ligth-200(:style="{ backgroundColor: color.light.hex(hash) }")
  .flex.flex-wrap.items-center
    div(class="hover:underline text-md cursor-pointer" @click="$emit('close')") # {{ tag }}
    .text-lg.mx-2(v-if="post.title") /
    .text-lg.font-bold(v-if="post.title") {{ post.title }}
    .text-sm.ml-4(v-if="post.empty") Post not found
    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    button.button(@click="$emit('close')")
      la-times
  .flex.flex-col(v-if="!post.empty")
    .p-2(v-if="post.description") {{ post.description }} 
    embed-youtube(v-if="post.youtube" :video="post.youtube")
    .text-md.markdown.bg-light-200.rounded-2xl.m-1.p-2.leading-relaxed.max-w-65ch(v-if="post.text" v-html="md.render(post.text)") 
    
</template>

<style scoped>
a {
  @apply underline-current;
}
</style>