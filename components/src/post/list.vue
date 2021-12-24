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
  .flex.items-center.p-2
    router-link(class="hover:underline" to="/feeds/") Tags /
    .text-xl.ml-2.font-bold # {{ tag }}
    button.button(@click="add = !add")
      la-plus(v-if="!add")
      la-times(v-else)
    button.button(@click="exportFeed(tag, posts)")
      la-file-download
    label.button.cursor-pointer(for="md-input")
      la-file-upload
    input#md-input.hidden(
      tabindex="-1"
      type="file",
      accept="text/markdown",
      ref="file"
      @change="importFeed(tag, $event)"
    )
    .flex-1
    .button.cursor-pointer(@click="$emit('close')")
      la-times
  post-form(v-if="add" @submit="addPost(tag, $event)")
  .flex.flex-wrap
    post-card(
      :style="{ order: Date.now() - timestamps[hash].toFixed() }"
      v-for="(item, hash) in posts" :key="hash" 
      :hash="hash" 
      :timestamp="timestamps[hash]"
      :post="item" 
      @click="emit('browse', hash)"
      )
  
</template>

<style scoped>
</style>