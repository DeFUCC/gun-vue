<script setup>
import { useColor, loadFromHash } from '@composables'
import { computed, ref, watchEffect } from 'vue'

const colorLight = useColor('light')
const colorDeep = useColor('deep')

const emit = defineEmits(['upvote', 'downvote'])

const props = defineProps({
  post: { type: [Object, String], default: { text: 'empty' } },
  timestamp: { type: Number, default: 0 },
  hash: { type: String, default: '' },
  tag: { type: String, default: '' },
  host: { type: String, default: '' }
})

const text = computed(() => {
  if (typeof props.post == 'string') {
    return props.post
  } else {
    return props.post?.text
  }
})

const icon = ref()
const cover = ref()

watchEffect(async () => {
  const d = { ...props.post }
  icon.value = await loadFromHash('icons', d?.icon)
  cover.value = await loadFromHash('covers', d?.cover)
})



</script>

<template lang='pug'>
.card(:style="{ backgroundImage: `url(${cover || post?.base64})`, backgroundColor: colorDeep.hex(hash), paddingTop: cover || post?.base64 ? '140px' : '5px' }") 
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-xl.bg-light-100.bg-opacity-90.backdrop-blur-sm.backdrop-filter.shadow-md
    .p-0(style="flex: 1 1 40px" v-if="post.icon" )
      img.w-20.max-h-20.rounded-full.m-2(:src="icon" width="40px")
    .flex.flex-col.p-2.overflow-hidden(style="flex: 10 1 180px")
      .px-2
        .text-xl.font-bold(v-if="post?.title") {{ post.title }}
        .statement(v-if="post.statement") {{ post.statement }}
      .flex.items-center.flex-wrap.items-center
        la-youtube.mx-1(v-if="post.youtube")
        mdi-text-long.mx-1(v-if="post.content")
        ui-link(:url="post.link" v-if="post.link")
    .flex-1
    .flex.rounded-xl.p-1.bg-dark-100.bg-opacity-20(style="flex: 1 1")
      post-action-star(:hash="hash" :tag="tag")
      post-action-update(:hash="hash" :tag="tag")
      post-action-ban(:hash="hash" :tag="tag" :host="host")
</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out min-w-280px shadow-md m-2 p-1 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center;
  filter: grayscale(10%) brightness(95%);
}
.card:hover {
  @apply shadow-lg;
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