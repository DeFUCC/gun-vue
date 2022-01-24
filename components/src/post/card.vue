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
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-md.rounded-lg.mt-2(:style="{ backgroundColor: colorLight.hex(hash) }")
    img.w-20.max-h-20.rounded-full.m-2(v-if="post.icon" :src="icon")
    .flex.flex-col.p-2.overflow-hidden.flex-1(style="flex: 1 1 220px")
      .flex.items-center.my-2.flex-wrap
        .text-xl.font-bold {{ post?.title }}
        la-youtube.mx-1(v-if="post.youtube")
        mdi-text-long.mx-1(v-if="post.content")
        a.button.ml-2(v-if="post.link" @click.stop :title="post.link" :href="post.link" target="_blank")
          la-link.mx-1
      .text-md.mb-2(v-if="post.description") {{ post.description }}

      .text-md.truncate.overflow-hidden(v-if="text") {{ text }}
    .flex-1
    .flex.rounded-xl.p-1.text-xl(style="flex: 0 1")
      post-action-star(:hash="hash" :tag="tag")
      post-action-update(:hash="hash" :tag="tag")
      post-action-ban(:hash="hash" :tag="tag" :host="host")
</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out min-w-280px shadow-md m-3 p-2 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center;
  filter: grayscale(20%) brightness(90%);
}
.card:hover {
  @apply shadow-xl;
  filter: grayscale(0%) brightness(100%);
}
</style>