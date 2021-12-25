<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])
import { useTagPosts, exportFeed, importFeed, addPost } from '@composables';
const add = ref(false)
const { posts, timestamps } = useTagPosts(toRef(props, 'tag'))
</script>

<template lang='pug'>
.m-4.shadow-lg.p-4
  .flex.flex-wrap.items-center.p-2
    router-link(class="hover:underline" to="/feeds/")  
      la-stream.text-2xl
    .text-xl.ml-2.font-bold # {{ tag }}
    button.button(@click="add = !add")
      transition(name="fade")
        .flex.items-center(v-if="!add")
          la-plus
          .ml-1 Add post
        .flex.items-center(v-else)
          la-times
          .ml- Cancel
    .flex-1
    .px-4.flex
      button.button.flex.items-center(@click="exportFeed(tag, posts)")
        la-file-download
        .ml-1 Export
      label.button.cursor-pointer.flex.items-center(for="md-input")
        la-file-upload
        .ml-1 Import
      input#md-input.hidden(
        tabindex="-1"
        type="file",
        accept="text/markdown",
        ref="file"
        @change="importFeed(tag, $event)"
      )
    .button.cursor-pointer(@click="$emit('close')")
      la-times
  post-form(v-if="add" @submit="addPost(tag, $event); add = false")
  .flex.flex-wrap
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
  
</template>

<style scoped>
</style>