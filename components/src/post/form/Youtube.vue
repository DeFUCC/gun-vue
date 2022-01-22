<script setup>
import { reactive, ref, onMounted, watch, computed, nextTick } from 'vue'
const add = ref()
const youtube = ref()
const id = ref()

const emit = defineEmits(['update']);

watch(youtube, link => {
  if (link) {
    id.value = youtubeLinkParser(link)

  } else {
    id.value = null
  }
  emit('update', id.value)
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

</script>

<template lang='pug'>
.flex.flex-wrap
  button.button.m-1(@click="add = !add" :class="{ active: id }")
    la-youtube
  ui-modal(:open="add" @close="add = false")
    .text-lg Add a youtube video
    input.text-sm.p-4.my-4(v-if="add" v-model="youtube" placeholder="Paste a Youtube video link")
    embed-youtube.min-w-60vw(v-if="id" :video="id")
</template>

<style lang="postcss" scoped>
input,
textarea {
  @apply p-2 rounded-xl m-1;
}
.active {
  @apply bg-fuchsia-500;
}
</style>