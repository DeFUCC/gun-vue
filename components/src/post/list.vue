<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])

import { useFeed, color } from '@composables';

const add = ref(false)
const { posts, timestamps, downloadPosts, uploadPosts, publishPost, uploadPost, banPost } = useFeed(toRef(props, 'tag'))



</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400(:style="{ backgroundColor: color.light.hex(tag) }")
  .flex.flex-wrap.items-center.p-2.text-xl
    .text-xl.ml-2.font-bold # {{ tag }}
    .flex.justify-center
      button.button.items-center(title="Download feed" @click="downloadPosts()")
        la-file-download
      label.button.cursor-pointer.flex.items-center(title="Upload feed" for="import-feed")
        la-file-upload
    .flex-1
    label.button.cursor-pointer.flex.items-center(for="import-post")
      la-markdown
    button.button(@click="add = !add")
      transition(name="fade")
        .flex.items-center(title="Add post" v-if="!add")
          la-plus
        .flex.items-center(v-else)
          la-times


  post-form.absolute.top-20.z-300.left-2.right-2.bg-light-300.shadow-xl.m-2(v-if="add" @submit="publishPost($event); add = false")
  .flex.flex-col.overflow-y-scroll.overflow-x-hidden.fixed.bottom-5.top-25vh.left-3.right-3.w-96wv
    transition-group(name="list")
      post-card.max-w-40em(
        :style="{ order: Date.now() - timestamps[hash].toFixed() }"
        style="flex: 1 1 200px"
        v-for="(item, hash) in posts" :key="hash" 
        :hash="hash"
        :tag="tag"
        :timestamp="timestamps[hash]"
        :post="item" 
        @click="emit('browse', hash)"
        @upvote="publishPost(item)"
        @downvote="banPost(item)"
        )
    input#import-feed.hidden(
      tabindex="-1"
      type="file",
      accept="text/markdown",
      ref="file"
      @change="uploadPosts($event)"
    )
    input#import-post.hidden(
      tabindex="-1"
      type="file",
      accept="text/markdown",
      ref="file"
      @change="uploadPost($event)"
    )
</template>

<style scoped>
</style>