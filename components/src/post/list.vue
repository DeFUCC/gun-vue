<script setup>
import { usePosts } from '@composables'
import { ref, computed } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'posts' },
  header: { type: Boolean, default: true }
})
const emit = defineEmits(['close', 'browse'])

const { posts, count, downloadPosts, downloading, uploadPosts } = usePosts(props.tag)

const add = ref()

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.overflow-hidden.bg-light-400.mx-auto.overscroll-contain
  .flex.flex-wrap.items-center.p-2.text-xl.sticky.z-100.top-0.shadow-lg.bg-light-900(v-if="header")
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 100px " @click="$emit('close')") # {{ tag }} 
    .flex-1
    .p-2.font-bold.mx-2 {{ count }}
  .p-2.flex.flex-wrap.z-300.text-sm.items-center.bg-light-700
    slot
    util-share(v-if="header")
    button.button.p-4.transition.bg-light-800.shadow-lg.m-2.flex.items-center.justify-center(title="Download feed" @click="downloadPosts()" v-if="count > 0")
      la-file-download(v-if="!downloading")
      la-redo-alt.animate-spin(v-else)
      .ml-2.mr-1 Download
    .flex-1
    label.cursor-pointer.button.transition.bg-light-800.shadow-lg.m-2.flex.items-center.justify-center(title="Upload feed" for="import-feed")
      la-file-upload
      .ml-2.mr-1 Upload
    button.add.button.transition.bg-light-800.shadow-lg.m-2.flex.items-center.justify-center(@click="add = !add")
      transition(name="fade" mode="out-in")
        la-plus(v-if="!add")
        la-times(v-else)
      .ml-2.mr-1 Add
    input#import-feed.hidden(
      tabindex="-1"
      type="file",
      accept=".zip",
      ref="file"
      multiple
      @change="uploadPosts($event.target.files)"
    )
  transition(name="fade")
    post-form(:tag="tag" v-if="add" @close="add = false")
  .flex.flex-wrap(v-if="count > 0") 
    transition-group(name="list")
      post-card(
        style="flex: 1 1 220px"
        v-for="(authors, hash) in posts" 
        :key="hash" 
        :hash="hash"
        :tag="tag"
        :authors="authors"
        @click="emit('browse', hash)"
        )

</template>

