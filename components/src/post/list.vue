<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])
import { useTagPosts, uploadText } from '@composables';
const add = ref(false)
const { posts, addPost, exportPosts, loadPosts } = useTagPosts(toRef(props, 'tag'))
</script>

<template lang='pug'>
.m-4.shadow-lg.p-4
  .flex.items-center.p-2
    router-link(class="hover:underline" to="/tags/") Tags /
    .text-xl.ml-2.font-bold # {{ tag }}
    button.button(@click="exportPosts()")
      la-file-download
    label.button(for="yaml-input")
      la-file-upload
    input#yaml-input.hidden(
      tabindex="-1"
      type="file",
      accept="text/yaml",
      ref="file"
      @change="loadPosts"
    )
    .flex-1
    .button.cursor-pointer(@click="$emit('close')")
      la-times
  .flex.flex-wrap

    post-card(v-for="(item, hash) in posts" :key="hash" :hash="hash" :post="item" @click="emit('browse', hash)")
    button.button(@click="add = !add")
      la-plus(v-if="!add")
      la-times(v-else)
  post-form(v-if="add" @submit="addPost($event)")
</template>

<style scoped>
</style>