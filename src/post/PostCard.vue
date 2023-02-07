<script setup>
import { useColor, usePost } from '#composables'
import { computed, ref, watchEffect } from 'vue'

const colorLight = useColor('light')
const colorDeep = useColor('deep')

defineEmits(['user'])

const props = defineProps({
  hash: { type: String, default: '' },
  authors: { type: Object, default: () => ({}) },
  tag: { type: [String, Boolean], default: '' },
  back: Boolean,
  actions: { type: Boolean, default: true }
})

const { post } = usePost({ hash: props.hash })

</script>

<template lang="pug">
.card(
  :style="{ backgroundImage: `url(${post?.cover || post?.raw})`, backgroundColor: colorDeep.hex(hash) }"
  )
  .p-0(
    style="flex: 12 1 120px" 
    :style="{ paddingTop: post?.cover || post?.raw ? '18em' : '0' }"
    )
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-2xl.bg-light-100.backdrop-blur-sm.backdrop-filter.shadow-md(
    style="flex: 14 1 620px"
  )
    .p-0(
      v-if="post?.icon" 
      style="flex: 1 1 40px" 
      )
      img.w-20.max-h-20.rounded-full.m-2(
        :src="post.icon" 
        width="40px"
        )
    .flex.flex-col.p-2.overflow-hidden(style="flex: 10 1 280px")
      .px-2
        .flex.items-center
          .text-xl.font-bold.my-2(v-if="post?.title") {{ post.title }}
          .flex-1
          post-link(:hash="hash")
        .statement(v-if="post?.statement") {{ post.statement }}
      .flex.items-center.flex-wrap.items-center.mt-2.gap-2
        .i-la-youtube.mx-1(v-if="post?.youtube")
        .i-mdi-text-long.mx-1(v-if="post?.text")
        ui-link(
          v-if="post?.link" 
          :url="post?.link"
          )

        slot
    .flex.gap-1.rounded-xl.p-1.bg-dark-50.bg-opacity-20.flex-wrap.items-center(
      v-if="actions" 
      style="flex: 1 1 130px"
      )
      post-action-react(
        :authors="authors" 
        :hash="hash" 
        :tag="tag" 
        :back="back"
        @user="$emit('user', $event)" 
        )
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