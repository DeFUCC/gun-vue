<script setup>
import { ref, watch } from 'vue'
const link = ref()

const emit = defineEmits(['update:id']);

const props = defineProps({
  id: { type: String }
})

watch(link, lnk => {
  if (lnk) {
    emit('update:id', youtubeLinkParser(lnk))
  } else {
    emit('update:id', null)
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

</script>

<template lang='pug'>
.p-4.text-lg
  .flex.items-center.mb-2
    la-youtube
    .text-xl.ml-2.font-bold Add a youtube video
  input.p-4.my-4.w-full.border-1.border-dark-300(v-model="link" autofocus placeholder="Paste a Youtube video link")
  embed-youtube.min-w-80vw.mt-2(v-if="id" :video="id")
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