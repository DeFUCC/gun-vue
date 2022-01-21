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

const title = computed(() => {
  if (typeof props.post == 'string') {
    return props.post
  } else {
    return props.post?.title
  }
})

const icon = ref()
const cover = ref()

watchEffect(async () => {
  icon.value = await loadFromHash('icons', props.post?.icon)
  cover.value = await loadFromHash('covers', props.post?.cover)
})


</script>

<template lang='pug'>
.shadow-md.m-1.rounded-lg.cursor-pointer.flex.flex-wrap.items-center.bg-cover.bg-center(:style="{ backgroundImage: `url(${cover || post?.base64})`, backgroundColor: colorLight.hex(hash), paddingTop: cover || post?.base64 ? '100px' : '5px' }") 
  .flex.flex-wrap.items-center.w-full.backdrop-blur-md.rounded-lg.m-1(:style="{ backgroundColor: colorLight.hex(hash) }")

    img.w-20.max-h-20.rounded-full.m-2(v-if="icon" :src="icon")
    .flex.flex-col.p-2.overflow-hidden(style="flex: 1 0 50%")

      .text-lg.font-bold.truncate {{ title }}
      .text-md.truncate(v-if="post.description") {{ post.description }}
      .text-md.truncate.overflow-hidden(v-if="!post.description && post.text") {{ post.text }}
    .flex-1
    .flex.bg-light-900.rounded-xl(style="flex: 1 1 2%")
      post-action-star(:hash="hash" :tag="tag")
      post-action-update(:hash="hash" :tag="tag")
      post-action-ban(:hash="hash" :tag="tag" :host="host")
</template>
