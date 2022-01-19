<script setup>
import { useColor } from '@composables';
import { useFeed } from '@composables/useFeed.js'


const props = defineProps({
  tag: { type: String, default: 'tag' },
  host: { type: String, default: '' }
})
const emit = defineEmits(['close', 'browse'])

const colorLight = useColor('light')

const { posts, timestamps, downloadPosts, uploadPosts } = useFeed(props.tag, { host: props.host })

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400.max-w-170.mx-auto(:style="{ backgroundColor: colorLight.hex(tag) }")
  .flex.flex-wrap.items-center.p-2.text-xl.sticky.top-0.z-600.shadow-lg(:style="{ backgroundColor: colorLight.hex(tag) }")
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 1 " @click="$emit('close')") # {{ tag }}
    .flex-1
    account-badge(:pub="host" v-if="host")
      .text-xs.mr-2.mt-1px Host
    la-times.cursor-pointer(@click="$emit('close')")
  post-form(:tag="tag")
  .flex.flex-col
    transition-group(name="fade")
      post-card(
        :style="{ order: Date.now() - timestamps[hash].toFixed() }"
        style="flex: 1 1"
        v-for="(item, hash) in posts" :key="hash" 
        :hash="hash"
        :tag="tag"
        :post="item" 
        :host="host"
        @click="emit('browse', hash)"
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
        accept=".zip",
        ref="file"
        multiple
        @change="uploadPosts($event.target.files)"
      )
</template>

<style scoped>
</style>