<script setup>
import { useColor, gun } from '@composables';
import { useFeed } from '@composables/useFeed.js'
import { ref, computed } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'tag' },
  host: { type: String, default: '' },
  header: { type: Boolean, default: true }
})
const emit = defineEmits(['close', 'browse'])

const { posts, timestamps, count, downloadPosts, downloading, uploadPosts } = useFeed(props.tag, { host: props.host })

const add = ref()

const colorDeep = computed(() => useColor('deep').hex(props.tag))
const colorLight = computed(() => useColor('light').hex(props.tag))

</script>

<template lang='pug'>
.shadow-lg.rounded-2xl.overflow-hidden.bg-light-400.mx-auto.overscroll-contain(:style="{ backgroundColor: colorLight }")
  .flex.flex-wrap.items-center.p-2.text-xl.sticky.z-100.top-0.shadow-lg(v-if="header" :style="{ backgroundColor: colorDeep }")
    .text-xl.ml-2.font-bold.cursor-pointer(style="flex: 1 100px " @click="$emit('close')") # {{ tag }}
    account-badge(:pub="host" v-if="host")
      .text-xs.mr-2.mt-1px Host
    button.ml-8.button.cursor-pointer(@click="$emit('close')")
      la-times
  .p-2.flex.flex-wrap.z-300.text-sm.items-center(:style="{ backgroundColor: colorDeep + '33' }")
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

<style lang="postcss" scoped>
.add {
  @apply border-4;
  border-color: v-bind(colorDeep);
}
.add:hover {
  background-color: v-bind(colorDeep);
}
</style>