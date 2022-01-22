<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useColor, loadFromHash, usePost } from '@composables';
import markdown from 'markdown-it'
import externalLinks from 'markdown-it-external-links'

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close'])

const colorLight = computed(() => useColor('light').hex(props.hash))
const colorDeep = computed(() => useColor('deep').hex(props.hash))

const post = usePost(props.tag, props.hash)


const icon = ref()
const cover = ref()

watchEffect(async () => {
  const d = { ...post.data }
  icon.value = await loadFromHash('icons', d?.icon)
  cover.value = await loadFromHash('covers', d?.cover || d?.base64)
})


const md = new markdown({
  linkify: true,
  typographer: true,
})

md.use(externalLinks, {
  externalTarget: '_blank'
})

</script>

<template lang='pug'>
.rounded-2xl.flex.flex-col.mx-auto.items-stretch.justify-center.w-full(:style="{ backgroundColor: colorLight }")
  .z-30.flex.flex-wrap.items-center.w-full.px-4.py-2.sticky.top-0.shadow-xl.filter.grayscale-70.hover_grayscale-0.transition.duration-400ms(:style="{ backgroundColor: colorDeep }")  
    .hover_underline.text-md.cursor-pointer.font-bold.flex(@click="$emit('close')") 
      .p-0 #
      .ml-1 {{ tag }}
    .ml-1 / {{ post?.data?.title }} 
    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    .flex.items-center.mr-4
      post-action-star(:tag="tag" :hash="hash")
      button.button.items-center.text-xl(@click="post.download()")
        la-file-download(v-if="!post.downloading")
        la-redo-alt.animate-spin(v-else)
    button.button( @click="$emit('close')") 
      la-times
  .flex.flex-wrap
    .p-0(style="flex: 5 0 220px" v-if="cover")
      img.sticky.top-6vh(:src="cover")
    .flex-1.z-20.flex.flex-wrap(style="flex: 10 1 300px")
      .flex.flex-wrap.items-start.w-full.justify-start.my-4.z-25.rounded-xl.m-2(style="flex: 1 1 240px; backdrop-filter: blur(10px);" :style="{ backgroundColor: colorLight + '99' }" v-if="icon || post?.data?.title || post?.data?.description")
        .px-8.pb-2.sticky.top-8vh.w-full
          img.w-20.h-20.rounded-full.my-4(v-if="icon" :src="icon" :style="{ borderColor: colorDeep }")
          .text-2xl.font-bold(v-if="post?.data?.title") {{ post?.data?.title }}
          .my-2(v-if="post?.data?.description") {{ post?.data?.description }} 

      .my-4.mx-2.z-20.max-w-90vw(style="flex: 100 1 320px" v-if="post?.data?.youtube || post?.data?.content")
        embed-youtube.mb-6.shadow-xl.flex-1(v-if="post?.data?.youtube" :video="post?.data?.youtube")
        .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.px-4.py-6.leading-relaxed.max-w-55ch(v-if="post?.data.content" v-html="md.render(post?.data?.content)") 

    
</template>
