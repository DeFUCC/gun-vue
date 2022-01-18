<script setup>
import { ref } from 'vue'
import { useColor } from '@composables';
import { useFeed } from '@composables/useFeed.js'


const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])

const colorLight = useColor('light')

const { posts, timestamps, downloadPosts, uploadPosts, publishPost, uploadPost, banPost } = useFeed(props.tag)

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400.max-w-170.mx-auto(:style="{ backgroundColor: colorLight.hex(tag) }")
  .flex.flex-wrap.items-center.p-2.text-xl
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 1 " @click="$emit('close')") # {{ tag }}

  post-form(:tag="tag")
  .flex.flex-col
    transition-group(name="fade")
      post-card(
        :style="{ order: Date.now() - timestamps[hash].toFixed() }"
        style="flex: 1 1"
        v-for="(item, hash) in posts" :key="hash" 
        :hash="hash"
        :tag="tag"
        :timestamp="timestamps[hash]"
        :post="item" 
        @click="emit('browse', hash)"
        @upvote="publishPost(item)"
        @downvote="banPost(item)"
        )
  .flex.bg-dark-500.bg-opacity-40.p-4
    .flex.justify-center
      button.button.items-center(title="Download feed" @click="downloadPosts()")
        la-file-download
        .ml-2 Download
      label.button.cursor-pointer.flex.items-center(title="Upload feed" for="import-feed")
        la-file-upload
        .ml-2 Upload
      input#import-feed.hidden(
        tabindex="-1"
        type="file",
        accept="text/markdown",
        ref="file"
        @change="uploadPosts($event)"
      )
</template>

<style scoped>
</style>