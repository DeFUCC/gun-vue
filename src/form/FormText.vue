<script setup>
import { ref, computed, nextTick } from 'vue'
import { uploadText, parseMd } from '#composables'

const emit = defineEmits(['update:text', 'frontmatter', 'close'])

const props = defineProps({
  text: { type: String, default: '' }
})


const add = ref(false)

const text = computed({
  get() {
    return props.text
  },
  set(value) {
    emit('update:text', value)
  }
})



function importPostFile(event) {
  uploadText(event.target?.files, (file) => {
    let { frontmatter, content } = parseMd(file);
    emit('frontmatter', frontmatter)
    if (content) {
      add.value = true
      nextTick(() => {
        // simplemde.value(content)
      })
    }
  });
}
</script>

<template lang="pug">
.flex.flex-col.items-stretch.w-full.p-4.gap-4
  textarea#myMD.dark-bg-dark-800.p-4.min-h-40vh.w-90vw.max-w-55ch(
    ref="md"  
    v-model="text"
    placeholder="Main text content (with **markdown** support)"
    )
  .flex.flex-wrap.bg-dark-100.p-4.rounded-xl
    button.button.m-1(@click="$emit('close')")
      .i-la-check
      .ml-2 Save
    label.m-1.button.cursor-pointer.flex.items-center(for="import-post")
      .i-la-markdown
      .ml-2 Load
    input#import-post.hidden.dark-bg-dark-200(
      ref="file"
      tabindex="-1",
      type="file",
      accept="text/markdown"
      @change="importPostFile($event)"
    )
    .flex-1
    button.button.m-1(@click="text = ''")
      .i-la-trash
      .ml-2 Reset
</template>

<style lang="postcss" scoped>
.active {
  @apply bg-fuchsia-500;
}
</style>