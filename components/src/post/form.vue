<script setup>
import { reactive, ref, onMounted, watch, computed, nextTick } from 'vue'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

import { usePictureUpload, addPost, useColor, uploadText, parseMd } from '@composables'

const props = defineProps({
  tag: { type: String, default: 'null' }
})

const colorDeep = useColor('deep')

const addColor = computed(() => {
  return colorDeep.hex(props.tag)
})

let simplemde
onMounted(() => {
  simplemde = new SimpleMDE({
    element: document.getElementById("myMD"),
  });
  title?.value?.focus()
})

const post = ref({})
const title = ref()

const add = reactive({
  form: false,
  youtube: false,
  content: false,
})

const hasContent = computed(() => {
  return post.value.title || post.value.description || post.value.content || post.value.cover
})

function submit() {
  const contents = { ...post.value, content: simplemde.value() }
  addPost(props.tag, contents)
  reset()
}

const { state, handleChange } = usePictureUpload({
  picSize: 800,
  preserveRatio: true
})

watch(() => state.output, file => {
  if (file?.content) {
    post.value.cover = file.content
  }
})

const youtube = ref()

watch(youtube, link => {
  if (link) {
    post.value.youtube = youtubeLinkParser(link)
    add.youtube = false
  } else {
    post.value.youtube = null
    youtube.value = null
    add.youtube = false
  }

})

function youtubeLinkParser(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
}

function importPost(event) {
  uploadText(event, (file) => {
    let { frontmatter, content } = parseMd(file);
    post.value = { ...post.value, ...frontmatter }
    if (content) {
      add.content = true
      nextTick(() => {
        simplemde.value(content)
      })

    }
  });
}

function reset() {
  add.form = false
  post.value = {}
  simplemde.value('')
  youtube.value = null
}


const { state: iconState, handleChange: handleIcon } = usePictureUpload({
  picSize: 400,
})

watch(() => iconState.output, file => {
  if (file?.content) {
    post.value.icon = file.content
  }
})
</script>

<template lang='pug'>
.flex.flex-col
  button.text-xl.plus.transition.rounded-xl.bg-light-800.shadow-lg.p-2.m-2.flex.items-center.justify-center.flex-1(@click="add.form = !add.form" v-if="!hasContent")
    transition(name="fade" mode="out-in")
      la-plus(v-if="!add.form")
      la-times(v-else)
    .font-bold.ml-2 Add
  .flex.justify-center.text-xl(v-if="hasContent")
    button.plus.button.flex-1.justify-center( type="submit" @click="submit()")
      la-check
      .font-bold.ml-2 Submit
    button.plus.button.items-center.justify-center(@click="add.form = !add.form")
      la-pen(v-if="!add.form")
      la-eye-slash(v-else)
    button.button.text-xl( @click="reset()")
      la-trash-alt
  .flex.relative.my-4(v-if="add.form && post.cover")
    button.button.absolute.text-2xl.right-2.opacity-60.hover_opacity-100
      la-trash-alt(@click="post.cover = null")
    img( :src="post.cover")
  .flex.relative.max-w-100px.items-center.justify-center(v-if="post.icon")
    button.button.absolute.text-3xl.opacity-10.hover_opacity-100
      la-trash-alt(@click="post.icon = null")
    img.rounded-full(:src="post.icon")
  transition(name="fade")
    form.flex.flex-col.p-2.shadow-xl.m-1.rounded-2xl.mb-6(action="javascript:void(0);" v-show="add.form")

      input.font-bold.text-xl(v-model="post.title" placeholder="Title" autofocus ref="title")
      input(v-model="post.description" placeholder="Description")

      .flex.flex-wrap.text-xl
        label.button.cursor-pointer(for="icon_upload" :class="{ active: post.icon }")
          la-info-circle
        input#icon_upload.hidden(type="file" @change="handleIcon" accept="image/*")
        label.button.cursor-pointer(for="image_upload" :class="{ active: post.cover }")
          la-image
        input#image_upload.hidden(type="file" @change="handleChange" accept="image/*")
        button.button(@click="add.youtube = !add.youtube" :class="{ active: post.youtube }")
          la-youtube
        input(v-if="add.youtube" v-model="youtube" placeholder="Paste a Youtube video link")
        button.button(@click="add.content = !add.content" :class="{ active: add.content }")
          mdi-text-long
        label.button.cursor-pointer.flex.items-center(for="import-post")
          la-markdown
        input#import-post.hidden(
          tabindex="-1"
          type="file",
          accept="text/markdown",
          ref="file"
          @change="importPost($event)"
        )
      .flex.flex-col.my-6.shadow-xl
        embed-youtube(v-if="post.youtube" :video="post.youtube")
      .flex.flex-col(v-show="add.content")
        textarea#myMD(ref="md"  placeholder="Main text content (with **markdown** support)")

</template>

<style lang="postcss" scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
button:disabled {
  @apply opacity-40;
}
.active {
  background-color: v-bind(addColor);
}

.plus:hover {
  background-color: v-bind(addColor);
}
</style>