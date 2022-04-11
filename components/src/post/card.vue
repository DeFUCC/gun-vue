<script setup>
import { useColor, usePost } from '@composables'
import { computed, ref, watchEffect } from 'vue'

const colorLight = useColor('light')
const colorDeep = useColor('deep')

defineEmits(['user'])

const props = defineProps({
  hash: { type: String, default: '' },
  authors: Object,
  tag: [String, Boolean],
  back: Boolean,
  actions: { type: Boolean, default: true }
})

const { post } = usePost({ hash: props.hash })

</script>

<template lang='pug'>
.card(
  :style="{ backgroundImage: `url(${post?.cover || post?.raw})`, backgroundColor: colorDeep.hex(hash) }"
  )
  .p-0(style="flex: 12 1 120px" :style="{ paddingTop: post?.cover || post?.raw ? '18em' : '0' }")
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-2xl.bg-light-100.backdrop-blur-sm.backdrop-filter.shadow-md(
    style="flex: 14 1 200px"
  )
    .p-0(style="flex: 1 1 40px" v-if="post?.icon" )
      img.w-20.max-h-20.rounded-full.m-2(:src="post.icon" width="40px")
    .flex.flex-col.p-2.overflow-hidden(style="flex: 10 1 280px")
      .px-2
        .flex.flex-wrap.items-center
          .text-xl.font-bold.my-2(v-if="post?.title") {{ post.title }}
        .statement(v-if="post?.statement") {{ post.statement }}
      .flex.items-center.flex-wrap.items-center.mt-2.gap-2
        la-youtube.mx-1(v-if="post?.youtube")
        mdi-text-long.mx-1(v-if="post?.text")
        ui-link(:url="post?.link" v-if="post?.link")
        post-action-link.absolute.top-2.right-2(:hash="hash")
        slot
    .flex.gap-1.rounded-xl.p-1.bg-dark-50.bg-opacity-20.flex-wrap.items-center(style="flex: 1 1 130px" v-if="actions")
      post-action-react(:authors="authors" @user="$emit('user', $event)" :hash="hash" :tag="tag" :back="back")



      //- post-action-update(:hash="hash" )
      //- post-action-ban(:hash="hash" :tag="tag")

      //- post-action-star(:hash="hash" )
</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out min-w-280px p-1 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center;
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