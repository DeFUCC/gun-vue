<script setup>
import { useColor, usePost } from '@composables'
import { computed, ref, watchEffect } from 'vue'

const colorLight = useColor('light')
const colorDeep = useColor('deep')

defineEmits(['upvote', 'downvote'])

const props = defineProps({
  hash: { type: String, default: '' },
  authors: Object,
  tag: String,
})

function countAuthors(authors) {
  let arr = []
  for (let author in authors) {
    if (authors[author]) {
      arr.push(author)
    }
  }
  return arr.length
}

const { post } = usePost({ hash: props.hash })

</script>

<template lang='pug'>
.card(
  :style="{ backgroundImage: `url(${post?.cover || post?.raw})`, backgroundColor: colorDeep.hex(hash), paddingTop: post?.cover || post?.raw ? '140px' : '5px', opacity: countAuthors(authors) > 0 ? 1 : 0.1 }"
  ) 
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-xl.bg-light-100.bg-opacity-90.backdrop-blur-sm.backdrop-filter.shadow-md
    .p-0(style="flex: 1 1 40px" v-if="post?.icon" )
      img.w-20.max-h-20.rounded-full.m-2(:src="post.icon" width="40px")
    .flex.flex-col.p-2.overflow-hidden(style="flex: 10 1 180px")
      .px-2
        .text-xl.font-bold(v-if="post?.title") {{ post.title }}
        .statement(v-if="post?.statement") {{ post.statement }}
      .flex.items-center.flex-wrap.items-center
        la-youtube.mx-1(v-if="post?.youtube")
        mdi-text-long.mx-1(v-if="post?.text")
        ui-link(:url="post?.link" v-if="post?.link")
        slot
    .flex-1.text-xs
    .flex.rounded-xl.p-1.bg-dark-100.bg-opacity-20(style="flex: 1 1 180px")
      post-action-like(:authors="authors" :hash="hash" :tag="tag")

      //- post-action-update(:hash="hash" )
      //- post-action-ban(:hash="hash")
      //- post-action-comment(:hash="hash")
      //- post-action-star(:hash="hash" )
</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out min-w-280px shadow-sm m-2 p-1 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center;
  filter: grayscale(10%) brightness(95%);
}
.card:hover {
  @apply shadow-md;
  filter: grayscale(0%) brightness(100%);
}
.statement {
  @apply max-h-24 overflow-ellipsis overflow-clip;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>