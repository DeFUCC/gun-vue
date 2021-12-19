<script setup>
import { color } from '@composables'

const props = defineProps({
  post: { type: [Object, String], default: { text: 'empty' } },
  hash: { type: String, default: '' }
})

const title = computed(() => {
  if (typeof props.post == 'string') {
    return props.post
  } else {
    return props.post?.title
  }
})


</script>

<template lang='pug'>
.p-2.shadow-md.m-1.rounded-lg.cursor-pointer.flex.items-center(:style="{ backgroundColor: color.light.hex(hash) }")
  .flex.flex-col.p-2.max-w-64
    .text-lg.font-bold.truncate {{ title }}
    .text-md.truncate.overflow-hidden(v-if="post.description") {{ post.description }}
    .text-md.truncate.overflow-hidden(v-if="!post.description && post.text") {{ post.text }}
  .p-0.hidden
    .text-8px {{ post }}
</template>
