<script setup>
import { useColor, gun } from '@composables';
import { useFeed } from '@composables/useFeed.js'

const props = defineProps({
  tag: { type: String, default: 'tag' },
  host: { type: String, default: '' }
})
const emit = defineEmits(['close', 'browse'])

const colorLight = useColor('light')
const colorDeep = useColor('deep')

const { posts, timestamps, downloadPosts, downloading, uploadPosts } = useFeed(props.tag, { host: props.host })

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.bg-light-400.mx-auto(:style="{ backgroundColor: colorLight.hex(tag) }")
  .flex.flex-wrap.items-center.p-2.text-xl.sticky.z-100.top-0.shadow-lg(:style="{ backgroundColor: colorLight.hex(tag) }")
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 100px " @click="$emit('close')") # {{ tag }}
    button.button.items-center.mr-2(title="Download feed" @click="downloadPosts()")
      la-file-download(v-if="!downloading")
      la-redo-alt.animate-spin(v-else)
    label.button.cursor-pointer.items-center(title="Upload feed" for="import-feed")
      la-file-upload
    input#import-feed.hidden(
      tabindex="-1"
      type="file",
      accept=".zip",
      ref="file"
      multiple
      @change="uploadPosts($event.target.files)"
    )
    account-badge(:pub="host" v-if="host")
      .text-xs.mr-2.mt-1px Host
    button.ml-8.button.cursor-pointer(@click="$emit('close')")
      la-times
  .flex.justify-center.text-xl.py-2.bg-dark-50.bg-opacity-40(style="flex: 1 1 10px")
    post-form(:tag="tag")

  .flex.flex-wrap
    transition-group(name="list")
      post-card(
        :style="{ order: Date.now() - timestamps[hash].toFixed() }"
        style="flex: 1 1 220px"
        v-for="(item, hash) in posts" 
        :key="hash" 
        :hash="hash"
        :tag="tag"
        :post="item" 
        :host="host"
        @click="emit('browse', hash)"
        )
    
</template>

<style scoped>
</style>