<script setup>
import { ref } from 'vue'
import { useFeed, useColor } from '@composables';


const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])

const colorLight = useColor('light')

const add = ref(false)
const { posts, timestamps, downloadPosts, uploadPosts, publishPost, uploadPost, banPost } = useFeed(props.tag)

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400.max-w-170.mx-auto(:style="{ backgroundColor: colorLight.hex(tag) }")
  .flex.flex-wrap.items-center.p-2.text-xl
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 1 " @click="$emit('close')") # {{ tag }}
    transition(name="fade")
      .flex(style="flex: 1 1 " v-if="!$slots?.default?.()?.[0]?.props")
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

  ui-modal(:open="add" @close="add = false")
    post-form(@submit="publishPost($event); add = false")
  .flex.flex-col
    transition-group(name="fade")
      slot
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