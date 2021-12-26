<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])
import { useTagPosts, exportFeed, importFeed, addPost, color } from '@composables';
const add = ref(false)
const { posts, timestamps } = useTagPosts(toRef(props, 'tag'))
</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400.overflow-x-hidden.fixed.top-16vh.h-82vh(:style="{ backgroundColor: color.light.hex(tag) }")
  .flex.flex-wrap.items-center.p-2
    .text-xl.ml-2.font-bold # {{ tag }}
    .flex.justify-center
      button.button.flex.items-center(@click="exportFeed(tag, posts)")
        la-file-download
        .ml-1 Export 
      label.button.cursor-pointer.flex.items-center(for="md-input")
        la-file-upload
        .ml-1 Import
    .flex-1
    button.button(@click="add = !add")
      transition(name="fade")
        .flex.items-center(v-if="!add")
          la-plus
          .ml-1 Add post
        .flex.items-center(v-else)
          la-times
          .ml- Cancel


  post-form.absolute.top-20.z-300(v-if="add" @submit="addPost(tag, $event); add = false")
  .flex.flex-col.overflow-y-scroll.fixed.bottom-5.top-60.left-3.right-3
    transition-group(name="list")
      post-card(
        :style="{ order: Date.now() - timestamps[hash].toFixed() }"
        v-for="(item, hash) in posts" :key="hash" 
        :hash="hash" 
        :timestamp="timestamps[hash]"
        :post="item" 
        @click="emit('browse', hash)"
        @upvote="addPost(tag, item)"
        )
    input#md-input.hidden(
      tabindex="-1"
      type="file",
      accept="text/markdown",
      ref="file"
      @change="importFeed(tag, $event)"
    )
</template>

<style scoped>
</style>