<script setup>
import { reactive, ref, onMounted, watch, computed, nextTick } from 'vue'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { uploadText, parseMd } from '@composables'

const emit = defineEmits(['update', 'frontmatter'])

let simplemde

const add = ref(false)
const text = ref('')

watch(add, value => {
  if (value) {
    nextTick(() => {
      if (!simplemde) {
        simplemde = new SimpleMDE({
          element: document.getElementById("myMD"),
        });
        simplemde.value(text.value)
        simplemde.codemirror.on("change", function () {
          text.value = simplemde.value()
        });
      }
    })
  } else {
    simplemde.toTextArea();
    simplemde = null;
  }
})

watch(text, value => emit('update', value))

function importPostFile(event) {
  uploadText(event, (file) => {
    let { frontmatter, content } = parseMd(file);
    emit('frontmatter', frontmatter)
    if (content) {
      add.value = true
      nextTick(() => {
        simplemde.value(content)
      })

    }
  });
}
</script>

<template lang='pug'>
.flex
  button.button(@click="add = true" :class="{ active: text }")
    mdi-text-long
  ui-modal(:open="add" @close="add = false")
    .flex.flex-wrap
      button.button(@click="add = false")
        la-check

      label.button.cursor-pointer.flex.items-center(for="import-post")
        la-markdown
      input#import-post.hidden(
        tabindex="-1"
        type="file",
        accept="text/markdown",
        ref="file"
        @change="importPostFile($event)"
      )
      .flex-1
      button.button(@click="add = false; text = ''")
        la-trash
    .flex.flex-col(v-show="add")
      textarea#myMD(ref="md" @change="update" placeholder="Main text content (with **markdown** support)")
</template>

<style lang="postcss" scoped>
.active {
  @apply bg-fuchsia-500;
}
</style>