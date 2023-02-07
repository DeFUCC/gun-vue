<script setup>
import { ref, computed, nextTick } from 'vue'
// import SimpleMDE from 'simplemde'
// import 'simplemde/dist/simplemde.min.css'
import { uploadText, parseMd } from '#composables'

const emit = defineEmits(['update:text', 'frontmatter', 'close'])

const props = defineProps({
  text: { type: String, default: '' }
})

let simplemde

const add = ref(false)

const text = computed({
  get() {
    return props.text
  },
  set(value) {
    emit('update:text', value)
  }
})

nextTick(() => {
  if (!simplemde) {
    // simplemde = new SimpleMDE({
    //   element: document.getElementById("myMD"),
    // });
    // simplemde.value(text.value)
    // simplemde.codemirror.on("change", function () {
    //   text.value = simplemde.value()
    // });
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
.flex.flex-col
  .flex.flex-col.text-left
    textarea#myMD(
      ref="md"  
      v-model="text"
      placeholder="Main text content (with **markdown** support)"
      )
  .flex.flex-wrap.bg-dark-100.p-4
    button.button.m-1(@click="$emit('close')")
      .i-la-check
      .ml-2 Save
    label.m-1.button.cursor-pointer.flex.items-center(for="import-post")
      .i-la-markdown
      .ml-2 Load
    input#import-post.hidden(
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