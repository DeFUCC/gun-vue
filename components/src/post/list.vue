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
.shadow-lg.p-4.rounded-2xl.bg-light-400
  .flex.flex-wrap.items-center.p-2
    .text-xl.ml-2.font-bold # {{ tag }}
    .flex-1
    button.button(@click="add = !add")
      transition(name="fade")
        .flex.items-center(v-if="!add")
          la-plus
          .ml-1 Add post
        .flex.items-center(v-else)
          la-times
          .ml- Cancel

    router-link(class="hover:underline button cursor-pointer" to="/feeds/")  
      la-angle-up
  post-form(v-if="add" @submit="addPost(tag, $event); add = false")
  .flex.flex-col
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
  .px-4.mt-4.flex.justify-center
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
</template>

<style scoped>
</style>