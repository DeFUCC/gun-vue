<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useColor, loadFromHash, usePost, useMd } from '@composables';

const md = useMd()

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close', 'browse'])

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
</script>

<template lang='pug'>
.rounded-2xl.flex.flex-col.mx-auto.items-stretch.justify-center.w-full.overscroll-contain.bg-light-200
  .z-30.flex.flex-wrap.items-center.w-full.px-4.py-2.sticky.top-0.shadow-xl.filter.grayscale-70.hover_grayscale-0.transition.duration-400ms(:style="{ backgroundColor: colorDeep }")  
    .hover_underline.text-md.cursor-pointer.font-bold.flex(@click="$emit('close')") 
      .p-0 #
      .ml-1.break-all {{ tag }}
    .ml-1.break-all / {{ post?.data?.title }} 
    .opacity-30.ml-4 {{ post?.lastUpdated }}
    .flex-1
    button.p-2( @click="$emit('close')") 
      la-times

  .flex.px-2.w-full.flex-wrap(:style="{ backgroundColor: colorDeep + '20' }")
    util-share
    button.button.m-2.flex.items-center(@click="post.download()")
      la-file-download(v-if="!post.downloading")
      la-redo-alt.animate-spin(v-else)
      .ml-2 Download
    .flex-1 
    post-action-star.text-xl(:tag="tag" :hash="hash")
    post-action-update(:hash="hash" :tag="tag")
    post-action-ban(:hash="hash" :tag="tag")

  .flex.flex-wrap.items-stretch
    .p-0(style="flex: 4 1 300px" v-if="cover")
      img.sticky.top-5vh(:src="cover")

    .flex-1.z-20.flex.flex-wrap(style="flex: 10 1 300px")
      .flex.flex-wrap.items-start.w-full.justify-start.my-4.z-25.rounded-xl.m-2.backdrop-filter.backdrop-blur-md(
        style="flex: 1 1 240px" 
        :style="{ backgroundColor: colorLight + '99' }" 
        v-if="icon || post?.data?.title || post?.data?.statement"
        )
        .p-2.sticky.top-8vh.w-full.flex.flex-wrap.items-center
          img.w-20.h-20.rounded-full.m-2(
            style="flex:0 1 40px"
            v-if="icon" 
            :src="icon" 
            :style="{ borderColor: colorDeep }"
            )
          .text-2xl.font-bold.m-2(
            style="flex:1 1 120px"
            v-if="post?.data?.title"
            ) {{ post?.data?.title }}
          .m-2(v-if="post?.data?.statement") {{ post?.data?.statement }} 
          ui-link(:url="post.data?.link" v-if="post.data?.link")

      .my-4.mx-2.z-20.max-w-90vw(
        style="flex: 100 1 320px" 
        v-if="post?.data?.youtube || post?.data?.content"
        )
        embed-youtube.mb-6.shadow-xl.flex-1(
          v-if="post?.data?.youtube" 
          :video="post?.data?.youtube"
          )
        .text-md.markdown-body.bg-light-200.rounded-2xl.m-1.px-4.py-4.leading-relaxed.max-w-55ch(
          v-if="post?.data.content" 
          v-html="md.render(post?.data?.content)")
      .mt-2.mb-4.z-20.mx-4(style="flex: 1 1 400px") 

        post-list(:tag="hash" :header="false" @browse="$emit('browse', $event)")

</template>
