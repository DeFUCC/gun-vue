<script setup>
import { usePost } from '#composables'
import { computed, ref, watchEffect } from 'vue'



defineEmits(['user'])

const props = defineProps({
  hash: { type: String, default: '' },
  authors: { type: Object, default: () => ({}) },
  tag: { type: String, default: '' },
  back: Boolean,
  actions: { type: Boolean, default: true }
})

const { post } = usePost({ hash: props.hash })

</script>

<template lang="pug">
.line(
  :style="{ backgroundColor: 'green' }"
  )
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-lg.bg-light-100.bg-opacity-90.backdrop-blur-sm.backdrop-filter.shadow-md.hover-bg-opacity-20.transition-all
    .p-0(
      v-if="post?.icon" 
      style="flex: 1 1" 
      )
      img.w-10.max-h-10.rounded-full.m-2(:src="post.icon")
    .flex.flex-col.p-1.overflow-hidden(style="flex: 10 1 180px")
      .px-2
        .flex.flex-wrap.items-center.gap-2
          .font-bold.my-2(v-if="post?.title || post?.statement") {{ post.title || post.statement.slice(0, 64) }}
          .i-la-youtube(v-if="post?.youtube")
          .i-mdi-text-long(v-if="post?.text")
          .i-la-link(
            v-if="post?.link" 
            :url="post?.link"
            )

</template>


<style lang="postcss" scoped>
.line {
  @apply transition duration-300ms ease-out min-w-280px shadow-sm m-2 rounded-xl cursor-pointer flex flex-wrap items-end bg-fixed bg-center;
  filter: grayscale(10%) brightness(95%);
}

.line:hover {
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