<script setup>
import { color, ms } from '@composables'

const emit = defineEmits(['upvote'])

const props = defineProps({
  post: { type: [Object, String], default: { text: 'empty' } },
  timestamp: { type: Number, default: 0 },
  ban: { type: Number, default: 0 },
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
.shadow-md.m-1.rounded-lg.cursor-pointer.flex.flex-wrap.items-center.relative(:style="{ backgroundColor: color.light.hex(hash) }")
  .flex.flex-col.p-2.overflow-hidden(style="flex: 1 0 60%")
    .text-lg.font-bold.truncate {{ title }}
    .text-md.truncate(v-if="post.description") {{ post.description }}
    .text-md.truncate.overflow-hidden(v-if="!post.description && post.text") {{ post.text }}
  .flex-1
  .flex(style="flex: 1 1 2%")
    button.button.items-center(@click.stop.prevent="$emit('upvote')")
      .p-0.mr-1 {{ ms(Date.now() - timestamp) }}
      la-thumbs-up
    button.button.items-center(@click.stop.prevent="$emit('downvote')")
      .p-0.mr-1(v-if="ban > 0") {{ ms(Date.now() - ban) }}
      la-thumbs-down
    slot
</template>
