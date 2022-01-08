<script setup>
import { color, ms, useBanned } from '@composables'

const emit = defineEmits(['upvote', 'downvote'])

const props = defineProps({
  post: { type: [Object, String], default: { text: 'empty' } },
  timestamp: { type: Number, default: 0 },
  ban: { type: Number, default: 0 },
  hash: { type: String, default: '' },
  tag: { type: String, default: '' },
})

const title = computed(() => {
  if (typeof props.post == 'string') {
    return props.post
  } else {
    return props.post?.title
  }
})

const banned = useBanned(props.hash)
</script>

<template lang='pug'>
.shadow-md.m-1.rounded-lg.cursor-pointer.flex.flex-wrap.items-center.relative(:style="{ backgroundColor: color.light.hex(hash) }")
  .flex.flex-col.p-2.overflow-hidden(style="flex: 1 0 60%")
    .text-lg.font-bold.truncate {{ title }}
    .text-md.truncate(v-if="post.description") {{ post.description }}
    .text-md.truncate.overflow-hidden(v-if="!post.description && post.text") {{ post.text }}
  .flex-1
  .flex(style="flex: 1 1 2%")
    post-star(:hash="hash" :tag="tag")
    button.button.items-center(@click.stop.prevent="$emit('upvote')")
      .p-0.mr-1.text-sm {{ ms(Date.now() - timestamp) }}
      mdi-watering-can-outline
    button.button.items-center(@click.stop.prevent="$emit('downvote')" :style="{ color: banned ? 'red' : 'inherit' }")
      .p-0.mr-1(v-if="ban > 0") {{ ms(Date.now() - ban) }}
      la-trash-alt
    slot
</template>
