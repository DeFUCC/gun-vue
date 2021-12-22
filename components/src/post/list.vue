<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
const emit = defineEmits(['close', 'browse'])
import { useTagPosts } from '@composables';
const add = ref(false)
const { posts, addPost } = useTagPosts(toRef(props, 'tag'))
</script>

<template lang='pug'>
.m-4.shadow-lg.p-4
  .flex.items-center.p-2
    router-link(class="hover:underline" to="/tags/") Tags /
    .text-xl.ml-2.font-bold # {{ tag }}
    .flex-1
    .button.cursor-pointer(@click="$emit('close')")
      la-times
  .flex.flex-wrap
    post-card(v-for="(item, hash) in posts" :key="hash" :hash="hash" :post="item" @click="emit('browse', hash)")
    button.button(@click="add = !add")
      la-plus(v-if="!add")
      la-times(v-else)
  post-form(v-if="add" @submit="addPost($event)")
</template>

<style scoped>
</style>