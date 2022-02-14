<script setup>
import { usePosts, useUser } from '@composables'
import { ref, computed } from 'vue'

const { user } = useUser()

const props = defineProps({
  tag: { type: String, default: 'posts' },
  header: { type: Boolean, default: true }
})
const emit = defineEmits(['close', 'browse', 'user'])

const { posts, backlinks, countPosts, countBacklinks, downloadPosts, downloading, uploadPosts } = usePosts(props.tag)

const add = ref()

function countAuthors(authors) {
  let count = 0
  for (let author in authors) {
    if (authors[author]) {
      count++
    }
  }
  return count
}

const openBacklinks = ref(false)
const showHidden = ref(false)


</script>

<template lang='pug'>
.flex.flex-col.z-10
  .shadow-lg.rounded-2xl.overflow-hidden.bg-light-400.mx-auto.overscroll-contain
    .flex.flex-wrap.items-center.p-2.text-xl.sticky.z-100.top-0.shadow-lg.bg-light-900(v-if="header")
      .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 100px " @click="$emit('close')") # {{ tag }} 
      .flex-1
      .p-2.font-bold.mx-2 {{ countPosts }}
    .p-2.flex.flex-wrap.z-300.text-sm.items-center.bg-light-700
      slot
      util-share(v-if="header")
      .flex.flex-wrap.flex-1(v-if="user.pub")
        button.button.p-4.transition.shadow-lg.m-2.flex.items-center.justify-center(title="Download feed" @click="downloadPosts()" v-if="countPosts > 0")
          la-file-download(v-if="!downloading")
          la-redo-alt.animate-spin(v-else)
          .ml-2.mr-1 Download
        button.button.p-4.transition.shadow-lg.m-2.flex.items-center.justify-center(@click="showHidden = !showHidden")
          la-eye(v-if="showHidden")
          la-eye-slash(v-else)
          .ml-2 Hidden
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
    .flex.flex-wrap
      transition-group(name="list")
        post-card.max-w-640px(
          style="flex: 1 1 220px"
          v-show="tag != hash && (countAuthors(authors) > 0 || showHidden)"
          :style="{ order: -countAuthors(authors), opacity: countAuthors(authors) > 0 ? 1 : 0.3 }"
          v-for="(authors, hash) in posts" 
          :key="hash" 
          :hash="hash"
          :tag="tag"
          :authors="authors"
          @click="emit('browse', hash)"
          )
  .text-lg.w-full.text-lg.font-bold.mt-4.mb-2.flex.items-center.p-2.bg-light-600.shadow-lg.rounded-2xl.cursor-pointer(v-if="countBacklinks > 0" @click="openBacklinks = !openBacklinks") 
    .p-2 Backlinks 
    .flex-1
    la-angle-down(v-if="!openBacklinks")
    la-angle-up(v-else)
    .p-2 {{ countBacklinks }}
  transition(name="fade")
    .flex.flex-wrap.flex-1(v-if="openBacklinks && countBacklinks > 0")
      transition-group(name="list")
        post-card(
          style="flex: 1 1 220px"
          :style="{ order: -countAuthors(authors) }"
          v-for="(authors, hash) in backlinks" 
          :key="hash" 
          :hash="hash"
          :tag="tag"
          :authors="authors"
          :back="true"
          @user="$emit('user', $event)"
          @click="emit('browse', hash)"
          )
</template>

